import { useId, useRef, useState, type KeyboardEvent } from 'react';

/**
 * 可复用三层信息卡片(快速 / 详情 / 启示 + 红色「历史真相」标)。
 * 跨板块共用契约:props 只收三层文本,不耦合时间线数据 ——
 * 理论 / 工程 / 科学家板块传各自数据即可复用(CLAUDE.md 五节)。
 */

type Layer = 'quick' | 'detail' | 'insight';

export interface LayeredCardProps {
  quick: { year: string; person: string; title: string; truth: string };
  detail: string;
  insight: string;
  isKey?: boolean;
  /** 强调色(如 era.accent),仅做标识,不破坏金色纪律 */
  accent?: string;
  defaultLayer?: Layer;
}

const LAYERS: ReadonlyArray<{ key: Layer; label: string }> = [
  { key: 'quick', label: '快速' },
  { key: 'detail', label: '详情' },
  { key: 'insight', label: '启示' },
];

export default function LayeredCard({
  quick,
  detail,
  insight,
  isKey = false,
  accent = '#64748B',
  defaultLayer = 'quick',
}: LayeredCardProps) {
  const [layer, setLayer] = useState<Layer>(defaultLayer);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (idx + dir + LAYERS.length) % LAYERS.length;
    setLayer(LAYERS[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <article className="flex h-full flex-col gap-4 p-1" aria-label={`${quick.person}:${quick.title}`}>
      <header>
        <div className="text-xs font-bold tracking-wide" style={{ color: accent }}>
          {quick.year} · {quick.person}{isKey ? ' · ★ 关键节点' : ''}
        </div>
        <h3 className="mt-1 text-2xl font-bold leading-tight text-text">{quick.title}</h3>
      </header>

      {/* 第一层重点:历史真相,始终置顶,红色 */}
      <p className="rounded-lg border border-charge-pos/40 bg-charge-pos/10 px-3 py-2 text-sm leading-relaxed">
        <span className="font-semibold text-charge-pos">历史真相:</span> {quick.truth}
      </p>

      {/* 三层 tab */}
      <div role="tablist" aria-label="信息分层" className="flex gap-1 border-b border-line">
        {LAYERS.map((l, i) => (
          <button
            key={l.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${uid}-tab-${l.key}`}
            aria-selected={layer === l.key}
            aria-controls={`${uid}-panel-${l.key}`}
            tabIndex={layer === l.key ? 0 : -1}
            onClick={() => setLayer(l.key)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm transition ${
              layer === l.key
                ? 'border-arc-gold text-text'
                : 'border-transparent text-text-dim hover:text-text'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* 当前层面板 */}
      <div
        role="tabpanel"
        id={`${uid}-panel-${layer}`}
        aria-labelledby={`${uid}-tab-${layer}`}
        className="text-[15px] leading-8 text-text-dim"
      >
        {layer === 'quick' && (
          <p>
            这一步的核心:
            <span className="font-semibold text-arc-gold">{quick.title}</span>
            。切到「详情 / 启示」继续深入。
          </p>
        )}
        {layer === 'detail' && <p>{detail}</p>}
        {layer === 'insight' && (
          <blockquote className="border-l-4 border-arc-gold bg-panel-2 px-4 py-3 italic text-text">
            「 {insight} 」
          </blockquote>
        )}
      </div>
    </article>
  );
}
