import { useEffect, useRef, useState } from 'react';

/**
 * 电磁波传播动画(design.md 四·2)。
 * 可调频率 / 振幅,实时看 E(红)与 B(蓝)同相振荡、彼此垂直、沿 x 以光速前进。
 * SVG 渲染,requestAnimationFrame 驱动相位;尊重 prefers-reduced-motion(退化为静态首帧 + 可手动调参)。
 */

const W = 720;
const H = 260;
const MID = H / 2;
const AXIS_LEN = W - 40;
const X0 = 20;

const POS = '#EF4444'; // E 电场 红
const NEG = '#3B82F6'; // B 磁场 蓝
const GOLD = '#F59E0B';
const AXIS = '#475569';

const prefersReduced = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 生成一条正弦路径:amp 振幅(px),waves 屏内波数,phase 相位 */
function sinePath(amp: number, waves: number, phase: number): string {
  const k = (waves * 2 * Math.PI) / AXIS_LEN;
  let d = '';
  for (let i = 0; i <= AXIS_LEN; i += 4) {
    const x = X0 + i;
    const y = MID - amp * Math.sin(k * i - phase);
    d += (i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
  }
  return d.trim();
}

export default function EMWaveApp() {
  const [freq, setFreq] = useState(3); // 屏内波数(代理「频率」)
  const [amp, setAmp] = useState(60); // 振幅 px
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(!prefersReduced());
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);

  /** 动画循环:相位随时间推进,实现波形向右传播 */
  useEffect(() => {
    if (!playing) return;
    const tick = (t: number) => {
      if (lastRef.current === 0) lastRef.current = t;
      const dt = (t - lastRef.current) / 1000;
      lastRef.current = t;
      // 相速度固定(类比光速 c 恒定),频率只改变波数密度
      setPhase((p) => (p + dt * 4) % (Math.PI * 2 * 1000));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastRef.current = 0;
    };
  }, [playing]);

  const ePath = sinePath(amp, freq, phase);
  const bPath = sinePath(amp * 0.6, freq, phase); // B 幅度按比例略小,仅视觉区分

  // 波长标注:相邻波峰间距
  const wavelengthPx = AXIS_LEN / freq;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-line bg-panel p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label={`可调电磁波动画:当前屏内 ${freq} 个波,振幅档位 ${amp}。电场 E(红)与磁场 B(蓝)同相、垂直,以光速向右传播。`}
        >
          {/* 传播轴 */}
          <line
            x1={X0}
            y1={MID}
            x2={X0 + AXIS_LEN}
            y2={MID}
            stroke={AXIS}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* B 磁场(蓝,画在底层)*/}
          <path d={bPath} fill="none" stroke={NEG} strokeWidth="2" opacity="0.85" />
          {/* E 电场(红,主线)*/}
          <path d={ePath} fill="none" stroke={POS} strokeWidth="2.6" />
          {/* 传播方向箭头 */}
          <polygon
            points={`${X0 + AXIS_LEN - 12},${MID - 6} ${X0 + AXIS_LEN},${MID} ${X0 + AXIS_LEN - 12},${MID + 6}`}
            fill={GOLD}
          />
          {/* 波长标尺 */}
          <line
            x1={X0}
            y1={H - 16}
            x2={X0 + wavelengthPx}
            y2={H - 16}
            stroke={GOLD}
            strokeWidth="1.5"
          />
          <text x={X0 + wavelengthPx / 2} y={H - 22} fill={GOLD} fontSize="11" textAnchor="middle">
            λ 波长
          </text>

          <text x={X0 + 2} y="22" fill={POS} fontSize="13" fontWeight="bold">E 电场</text>
          <text x={X0 + 2} y={H - 30} fill={NEG} fontSize="13" fontWeight="bold">B 磁场</text>
          <text x={X0 + AXIS_LEN - 96} y={MID - 12} fill={GOLD} fontSize="11">传播 → 光速 c</text>
        </svg>
      </div>

      {/* 控制面板 */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-text">频率(波长)</span>
            <span className="tabular-nums text-arc-gold">{freq} 个波</span>
          </div>
          <input
            type="range"
            min={1}
            max={9}
            step={1}
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
            className="w-full accent-[color:var(--color-arc-gold,#F59E0B)]"
            aria-label="调节频率,值越大波长越短"
          />
          <div className="mt-1 text-xs text-text-dim">频率越高 → 波长越短(从无线电波到可见光)。</div>
        </label>

        <label className="block">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-text">振幅(强度)</span>
            <span className="tabular-nums text-arc-gold">{amp}</span>
          </div>
          <input
            type="range"
            min={10}
            max={90}
            step={1}
            value={amp}
            onChange={(e) => setAmp(Number(e.target.value))}
            className="w-full accent-[color:var(--color-arc-gold,#F59E0B)]"
            aria-label="调节振幅,即波的强度"
          />
          <div className="mt-1 text-xs text-text-dim">振幅越大 → 波携带的能量越强。</div>
        </label>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
          className="rounded-full border border-line px-4 py-1.5 text-sm text-text-dim transition hover:text-text"
        >
          {playing ? '⏸ 暂停' : '▶ 播放'}
        </button>
        <span className="text-xs text-text-dim">
          注意:无论怎么调,E 与 B 始终<span className="text-text">同相、垂直、同速</span>——这正是麦克斯韦方程组的要求。
        </span>
      </div>
    </div>
  );
}
