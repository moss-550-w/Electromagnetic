import { useRef, useState, type KeyboardEvent } from 'react';
import type { DisableScenario } from '../../data/disable';

/**
 * 「如果没有电磁学」互动模拟器(design.md 4.3)。
 * 选一个发现「禁用」,推演世界退回的样子。纯前端,无持久化。
 */

interface Props {
  scenarios: DisableScenario[];
}

export default function WithoutEM({ scenarios }: Props) {
  const [activeId, setActiveId] = useState(scenarios[0]?.id ?? '');
  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (idx + dir + scenarios.length) % scenarios.length;
    setActiveId(scenarios[next].id);
    tabRefs.current[next]?.focus();
  };

  if (!active) return null;

  return (
    <div>
      <div role="tablist" aria-label="选择要禁用的发现" className="flex flex-wrap gap-2">
        {scenarios.map((s, i) => {
          const on = s.id === activeId;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setActiveId(s.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                on ? 'text-black' : 'border-line text-text-dim hover:text-text'
              }`}
              style={on ? { background: s.accent, borderColor: s.accent } : undefined}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        aria-live="polite"
        className="mt-5 rounded-2xl border bg-panel p-6"
        style={{ borderColor: active.accent }}
      >
        <div className="text-sm font-bold" style={{ color: active.accent }}>
          世界退回到 · {active.era}
        </div>
        <p className="mt-3 leading-8 text-text">{active.consequence}</p>

        <div className="mt-5">
          <div className="mb-2 text-xs uppercase tracking-wide text-text-dim">你将失去</div>
          <ul className="flex flex-wrap gap-2">
            {active.losses.map((l) => (
              <li
                key={l}
                className="rounded-md bg-panel-2 px-3 py-1.5 text-sm text-text-dim line-through decoration-charge-pos"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
