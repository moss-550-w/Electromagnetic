import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 电场线可视化(design.md 四·1)。
 * 拖拽正电荷(红)/ 负电荷(蓝),实时重绘电场线。
 * 物理:多点电荷库仑场叠加 E(r)=Σ q_i (r-r_i)/|r-r_i|³;场线沿 E 方向积分追踪。
 * 逻辑与渲染分离,纯前端计算,移动端降级为不可拖拽的静态首帧亦能看图。
 */

interface Charge {
  id: number;
  x: number;
  y: number;
  /** +1 正电荷 / -1 负电荷 */
  q: 1 | -1;
}

const POS = '#EF4444'; // 正电红
const NEG = '#3B82F6'; // 负电蓝
const LINE = '#64748B'; // 磁石灰 → 场线
const GOLD = '#F59E0B';

const RADIUS = 16; // 电荷标记半径(px)
const LINES_PER_CHARGE = 16; // 每个正电荷发出的场线数
const STEP = 4; // 场线积分步长(px)
const MAX_STEPS = 600; // 单条场线最大步数

const initialCharges = (w: number, h: number): Charge[] => [
  { id: 1, x: w * 0.36, y: h * 0.5, q: 1 },
  { id: 2, x: w * 0.64, y: h * 0.5, q: -1 },
];

export default function FieldLines() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [size, setSize] = useState({ w: 720, h: 420 });
  const [charges, setCharges] = useState<Charge[]>(() => initialCharges(720, 420));
  const [showField, setShowField] = useState(true);
  const dragId = useRef<number | null>(null);
  const nextId = useRef(3);

  /** 容器自适应宽度(高度按 4:7 比例) */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = Math.max(320, el.clientWidth);
      const h = Math.round(w * 0.56);
      setSize({ w, h });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** 首次按尺寸重置默认电荷位置(仅当仍是初始两电荷时) */
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    setCharges(initialCharges(size.w, size.h));
  }, [size.w, size.h]);

  /** 计算 (x,y) 处合电场矢量 */
  const fieldAt = useCallback(
    (x: number, y: number): { ex: number; ey: number } => {
      let ex = 0;
      let ey = 0;
      for (const c of charges) {
        const dx = x - c.x;
        const dy = y - c.y;
        const r2 = dx * dx + dy * dy;
        const r = Math.sqrt(r2);
        if (r < 1) continue; // 避免奇点
        const f = c.q / (r2 * r); // q / r³,乘上 (dx,dy) 得 q(r-r_i)/r³
        ex += f * dx;
        ey += f * dy;
      }
      return { ex, ey };
    },
    [charges],
  );

  /** 追踪一条场线:从起点沿 ±E 方向积分,直到出界或撞上电荷 */
  const traceLine = useCallback(
    (sx: number, sy: number, dir: 1 | -1): Array<[number, number]> => {
      const pts: Array<[number, number]> = [[sx, sy]];
      let x = sx;
      let y = sy;
      for (let i = 0; i < MAX_STEPS; i++) {
        const { ex, ey } = fieldAt(x, y);
        const mag = Math.hypot(ex, ey);
        if (mag < 1e-9) break;
        x += (dir * ex * STEP) / mag;
        y += (dir * ey * STEP) / mag;
        if (x < -20 || x > size.w + 20 || y < -20 || y > size.h + 20) break;
        // 撞上任一电荷则收束
        const hit = charges.some((c) => Math.hypot(x - c.x, y - c.y) < RADIUS * 0.7);
        pts.push([x, y]);
        if (hit) break;
      }
      return pts;
    },
    [fieldAt, charges, size.w, size.h],
  );

  /** 重绘 */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.w, size.h);

    if (showField) {
      ctx.strokeStyle = LINE;
      ctx.lineWidth = 1.1;
      ctx.globalAlpha = 0.75;
      for (const c of charges) {
        if (c.q !== 1) continue; // 场线从正电荷出发(到负电荷或无穷远)
        for (let i = 0; i < LINES_PER_CHARGE; i++) {
          const ang = (i / LINES_PER_CHARGE) * Math.PI * 2;
          const sx = c.x + Math.cos(ang) * (RADIUS + 2);
          const sy = c.y + Math.sin(ang) * (RADIUS + 2);
          const pts = traceLine(sx, sy, 1);
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
          ctx.stroke();
        }
      }
      // 若场中只有负电荷(无正电荷可作起点),从负电荷反向追踪保证有图
      if (!charges.some((c) => c.q === 1)) {
        for (const c of charges) {
          for (let i = 0; i < LINES_PER_CHARGE; i++) {
            const ang = (i / LINES_PER_CHARGE) * Math.PI * 2;
            const sx = c.x + Math.cos(ang) * (RADIUS + 2);
            const sy = c.y + Math.sin(ang) * (RADIUS + 2);
            const pts = traceLine(sx, sy, -1);
            ctx.beginPath();
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }
  }, [charges, size, showField, traceLine]);

  /** 指针事件:拖拽电荷(支持鼠标与触摸,统一用 Pointer Events)*/
  const pointFromEvent = (e: React.PointerEvent): { x: number; y: number } => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent, id: number) => {
    e.preventDefault();
    dragId.current = id;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragId.current == null) return;
    const { x, y } = pointFromEvent(e);
    const cx = Math.max(RADIUS, Math.min(size.w - RADIUS, x));
    const cy = Math.max(RADIUS, Math.min(size.h - RADIUS, y));
    setCharges((prev) => prev.map((c) => (c.id === dragId.current ? { ...c, x: cx, y: cy } : c)));
  };

  const onPointerUp = () => {
    dragId.current = null;
  };

  const addCharge = (q: 1 | -1) => {
    setCharges((prev) => [
      ...prev,
      {
        id: nextId.current++,
        x: size.w * (0.3 + 0.4 * (prev.length % 2)),
        y: size.h * 0.3,
        q,
      },
    ]);
  };

  const reset = () => {
    nextId.current = 3;
    setCharges(initialCharges(size.w, size.h));
  };

  /** 键盘可达:方向键微调选中电荷 */
  const [focusId, setFocusId] = useState<number | null>(null);
  const onKey = (e: React.KeyboardEvent, id: number) => {
    const map: Record<string, [number, number]> = {
      ArrowUp: [0, -8],
      ArrowDown: [0, 8],
      ArrowLeft: [-8, 0],
      ArrowRight: [8, 0],
    };
    const d = map[e.key];
    if (!d) return;
    e.preventDefault();
    setCharges((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              x: Math.max(RADIUS, Math.min(size.w - RADIUS, c.x + d[0])),
              y: Math.max(RADIUS, Math.min(size.h - RADIUS, c.y + d[1])),
            }
          : c,
      ),
    );
  };

  return (
    <div>
      {/* 控制栏 */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => addCharge(1)}
          className="rounded-full border border-charge-pos/50 bg-charge-pos/10 px-3 py-1.5 text-sm font-semibold text-charge-pos transition hover:bg-charge-pos/20"
        >
          + 正电荷
        </button>
        <button
          onClick={() => addCharge(-1)}
          className="rounded-full border border-charge-neg/50 bg-charge-neg/10 px-3 py-1.5 text-sm font-semibold text-charge-neg transition hover:bg-charge-neg/20"
        >
          − 负电荷
        </button>
        <button
          onClick={() => setShowField((s) => !s)}
          aria-pressed={showField}
          className="rounded-full border border-line px-3 py-1.5 text-sm text-text-dim transition hover:text-text"
        >
          {showField ? '隐藏场线' : '显示场线'}
        </button>
        <button
          onClick={reset}
          className="rounded-full border border-line px-3 py-1.5 text-sm text-text-dim transition hover:text-text"
        >
          重置
        </button>
        <span className="ml-auto text-xs text-text-dim">拖动电荷,实时观察电场线变化</span>
      </div>

      {/* 画布 + 可拖拽电荷叠层 */}
      <div
        ref={wrapRef}
        className="relative w-full touch-none select-none overflow-hidden rounded-xl border border-line bg-panel"
        style={{ height: size.h }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <canvas
          ref={canvasRef}
          style={{ width: size.w, height: size.h }}
          role="img"
          aria-label={`电场线示意图,当前有 ${charges.filter((c) => c.q === 1).length} 个正电荷与 ${charges.filter((c) => c.q === -1).length} 个负电荷`}
        />
        {charges.map((c) => {
          const color = c.q === 1 ? POS : NEG;
          return (
            <button
              key={c.id}
              onPointerDown={(e) => onPointerDown(e, c.id)}
              onFocus={() => setFocusId(c.id)}
              onBlur={() => setFocusId(null)}
              onKeyDown={(e) => onKey(e, c.id)}
              aria-label={`${c.q === 1 ? '正' : '负'}电荷,可拖动或用方向键移动`}
              className="absolute grid place-items-center rounded-full font-bold text-white shadow-lg"
              style={{
                left: c.x - RADIUS,
                top: c.y - RADIUS,
                width: RADIUS * 2,
                height: RADIUS * 2,
                background: color,
                cursor: 'grab',
                outline: focusId === c.id ? `2px solid ${GOLD}` : 'none',
                outlineOffset: 2,
              }}
            >
              {c.q === 1 ? '+' : '−'}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-[13px] leading-6 text-text-dim">
        场线从<span className="text-charge-pos">正电荷</span>出发、终于
        <span className="text-charge-neg">负电荷</span>(或伸向无穷远),线越密的地方电场越强。
        这只是演示性简化模型,直观感受「场」即可。
      </p>
    </div>
  );
}
