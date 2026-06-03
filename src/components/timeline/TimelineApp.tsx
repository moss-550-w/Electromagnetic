import { useEffect, useMemo, useRef, useState } from 'react';
import type { Era, TimelineNode } from '../../data/timeline';
import LayeredCard from '../shared/LayeredCard';
import { href } from '../../lib/href';

/**
 * 交互式时间线 —— B(垂直 scroll-snap 沉浸)+ C(详情常驻面板)混合。
 * 桌面:三栏 [时代导航 | scroll-snap 主轴 | 常驻详情];移动:单列滚动 + 底部抽屉。
 * M1 深化:延伸阅读(links)、平行宇宙(parallel,非史实)、同时代世界(era.worldEvents)。
 */

interface Props {
  eras: Era[];
}

interface Selection {
  era: Era;
  node: TimelineNode;
}

const PARALLEL = '#A78BFA';

const prefersReduced = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function TimelineApp({ eras }: Props) {
  const flat = useMemo<Selection[]>(
    () => eras.flatMap((era) => era.nodes.map((node) => ({ era, node }))),
    [eras],
  );

  const initial = flat.find((x) => x.node.person === '麦克斯韦') ?? flat[0];
  const [selected, setSelected] = useState<Selection>(initial);
  const [activeEraId, setActiveEraId] = useState<string>(eras[0]?.id ?? '');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const id = (en.target as HTMLElement).dataset.eraId;
          if (en.isIntersecting && id) setActiveEraId(id);
        });
      },
      { root, threshold: 0.5 },
    );
    Object.values(sectionRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [eras]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const jumpTo = (eraId: string) =>
    sectionRefs.current[eraId]?.scrollIntoView({
      behavior: prefersReduced() ? 'auto' : 'smooth',
    });

  const pick = (era: Era, node: TimelineNode) => {
    setSelected({ era, node });
    setDrawerOpen(true);
  };

  return (
    <div className="h-screen md:grid md:grid-cols-[210px_1fr_400px]">
      {/* B · 左侧时代导航(桌面)*/}
      <nav
        aria-label="时代导航"
        className="border-line hidden h-screen flex-col gap-1 overflow-y-auto border-r p-4 pt-20 md:flex"
      >
        <span className="mb-2 text-xs uppercase tracking-widest text-text-dim">五个时代</span>
        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => jumpTo(era.id)}
            aria-current={activeEraId === era.id ? 'true' : undefined}
            className={`flex flex-col gap-0.5 rounded-lg border-l-[3px] px-3 py-2.5 text-left transition hover:bg-panel ${
              activeEraId === era.id ? 'bg-panel' : 'border-transparent'
            }`}
            style={activeEraId === era.id ? { borderLeftColor: era.accent } : undefined}
          >
            <span className="text-sm font-bold text-text">
              <span style={{ color: era.accent }}>●</span> {era.name}
            </span>
            <span className="text-[11px] text-text-dim">{era.range}</span>
          </button>
        ))}
      </nav>

      {/* B · 垂直 scroll-snap 主轴 */}
      <div ref={scrollRef} className="h-screen snap-y snap-mandatory overflow-y-auto" tabIndex={-1}>
        {eras.map((era) => (
          <section
            key={era.id}
            data-era-id={era.id}
            ref={(el) => {
              sectionRefs.current[era.id] = el;
            }}
            className="flex min-h-full snap-start flex-col justify-center px-6 py-20 md:px-12"
          >
            <h2 className="text-4xl font-extrabold tracking-wide" style={{ color: era.accent }}>
              {era.name}
            </h2>
            <p className="mt-1 text-sm text-text-dim">{era.range}</p>

            {/* 时间线对比:同时代世界史 */}
            {era.worldEvents && era.worldEvents.length > 0 && (
              <div className="mt-3 max-w-2xl rounded-lg border border-line bg-panel/50 px-4 py-2.5">
                <span className="mr-2 text-[11px] uppercase tracking-wide text-text-dim">同时代世界</span>
                <span className="text-xs text-text-dim">{era.worldEvents.join(' · ')}</span>
              </div>
            )}

            <ul className="mt-7 flex max-w-2xl flex-col gap-3">
              {era.nodes.map((node) => {
                const isSel = selected.node === node;
                return (
                  <li key={`${era.id}-${node.year}-${node.person}`}>
                    <button
                      onClick={() => pick(era, node)}
                      aria-pressed={isSel}
                      className={`w-full rounded-xl border bg-panel p-4 text-left transition hover:border-arc-gold/60 ${
                        isSel ? 'border-arc-gold' : 'border-line'
                      }`}
                      style={{ borderLeftColor: era.accent, borderLeftWidth: 4 }}
                    >
                      <span className="text-xs font-bold text-arc-gold">
                        {node.year} · {node.person}
                        {node.key ? ' · ★ 关键' : ''}
                        {node.parallel ? ' · ⎇ 分歧点' : ''}
                      </span>
                      <strong className="mt-0.5 block text-lg font-bold text-text">{node.title}</strong>
                      <span className="mt-1.5 block text-[13px] text-charge-pos">
                        <b>历史真相:</b> {node.truth}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* C · 详情面板:桌面常驻右栏 / 移动底部抽屉 */}
      <aside
        aria-live="polite"
        aria-label="节点详情"
        className={`border-line bg-panel fixed inset-x-0 bottom-0 z-40 max-h-[72vh] overflow-y-auto rounded-t-2xl border-t p-5 transition-transform duration-300 md:static md:h-screen md:max-h-none md:translate-y-0 md:rounded-none md:border-l md:border-t-0 md:p-6 md:pt-20 ${
          drawerOpen ? 'translate-y-0' : 'translate-y-full'
        } md:translate-y-0`}
      >
        <button
          onClick={() => setDrawerOpen(false)}
          aria-label="收起详情"
          className="mb-3 w-full rounded-md bg-panel-2 py-1.5 text-sm text-text-dim md:hidden"
        >
          收起 ▾
        </button>

        <LayeredCard
          key={`${selected.node.person}-${selected.node.year}`}
          quick={{
            year: selected.node.year,
            person: selected.node.person,
            title: selected.node.title,
            truth: selected.node.truth,
          }}
          detail={selected.node.detail}
          insight={selected.node.insight}
          isKey={selected.node.key}
          accent={selected.era.accent}
        />

        {/* 延伸阅读:关联跳转 */}
        {selected.node.links && selected.node.links.length > 0 && (
          <div className="mt-5 border-t border-line pt-4">
            <div className="mb-2 text-xs uppercase tracking-wide text-text-dim">延伸阅读</div>
            <ul className="flex flex-col gap-2">
              {selected.node.links.map((l) => (
                <li key={l.to}>
                  <a href={href(l.to)} className="text-sm text-arc-gold hover:underline">
                    {l.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 平行宇宙:基于历史逻辑的推演,与史实明确区分 */}
        {selected.node.parallel && (
          <div className="mt-5 rounded-xl border border-dashed p-4" style={{ borderColor: PARALLEL }}>
            <div className="mb-1.5 text-xs font-bold" style={{ color: PARALLEL }}>
              ⎇ 平行宇宙 · 基于历史逻辑的推演(非史实)
            </div>
            <p className="text-sm font-semibold text-text">{selected.node.parallel.question}</p>
            <p className="mt-1.5 text-sm leading-7 text-text-dim">{selected.node.parallel.reasoning}</p>
          </div>
        )}
      </aside>
    </div>
  );
}
