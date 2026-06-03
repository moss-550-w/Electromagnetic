import { useEffect, useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import {
  QUIZ_QUESTIONS,
  PASS_THRESHOLD,
  QUIZ_STORAGE_KEY,
  type QuizQuestion,
} from '../../data/quiz';

/**
 * 电磁学认知闯关(design.md 四·3)。
 * 10 题选择,逐题作答即时解析;全部完成给分,达标可下载「历史达人」证书。
 * 进度持久化到 localStorage(无服务端);证书用 html-to-image 导出 PNG。
 */

type Phase = 'intro' | 'playing' | 'result';

interface SavedState {
  answers: (number | null)[]; // 每题所选下标
  done: boolean;
}

const loadSaved = (): SavedState | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedState;
    if (Array.isArray(parsed.answers) && parsed.answers.length === QUIZ_QUESTIONS.length) {
      return parsed;
    }
  } catch {
    /* 损坏数据忽略 */
  }
  return null;
};

const emptyAnswers = (): (number | null)[] => QUIZ_QUESTIONS.map(() => null);

export default function QuizApp() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyAnswers);
  const [picked, setPicked] = useState<number | null>(null); // 当前题已选(显示解析后才进入下一题)
  const [name, setName] = useState('');
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement | null>(null);

  /** 挂载后读取本地进度,允许「继续上次」*/
  const [resumable, setResumable] = useState<SavedState | null>(null);
  useEffect(() => {
    setResumable(loadSaved());
  }, []);

  const score = useMemo(
    () => answers.reduce<number>((s, a, i) => s + (a === QUIZ_QUESTIONS[i].answer ? 1 : 0), 0),
    [answers],
  );
  const passed = score >= PASS_THRESHOLD;

  const persist = (next: (number | null)[], done: boolean) => {
    try {
      window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({ answers: next, done }));
    } catch {
      /* 隐私模式下可能写入失败,忽略 */
    }
  };

  const start = (fresh: boolean) => {
    if (fresh) {
      setAnswers(emptyAnswers());
      setIdx(0);
      setPicked(null);
      try {
        window.localStorage.removeItem(QUIZ_STORAGE_KEY);
      } catch {
        /* ignore */
      }
    } else if (resumable) {
      setAnswers(resumable.answers);
      const firstUnanswered = resumable.answers.findIndex((a) => a === null);
      setIdx(firstUnanswered === -1 ? QUIZ_QUESTIONS.length - 1 : firstUnanswered);
      setPicked(null);
    }
    setPhase('playing');
  };

  const q: QuizQuestion = QUIZ_QUESTIONS[idx];
  const isLast = idx === QUIZ_QUESTIONS.length - 1;

  const choose = (optIdx: number) => {
    if (picked !== null) return; // 已作答本题,锁定
    setPicked(optIdx);
    const next = answers.slice();
    next[idx] = optIdx;
    setAnswers(next);
    persist(next, isLast);
  };

  const goNext = () => {
    if (isLast) {
      setPhase('result');
      persist(answers, true);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const restart = () => {
    setPhase('intro');
    setResumable(null);
    start(true);
  };

  /** 证书 PNG 下载 */
  const downloadCert = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(certRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0B1120',
        cacheBust: true,
      });
      const a = document.createElement('a');
      a.download = `电磁学历史达人证书-${name || '我'}.png`;
      a.href = dataUrl;
      a.click();
    } catch {
      // 失败兜底:不阻断流程,用户可截图
      window.alert('证书生成失败,可直接截图保存。');
    } finally {
      setDownloading(false);
    }
  };

  /* ---------- 渲染 ---------- */

  if (phase === 'intro') {
    return (
      <div className="rounded-2xl border border-line bg-panel p-6 md:p-8">
        <h3 className="text-2xl font-bold">电磁学认知闯关</h3>
        <p className="mt-2 text-sm leading-7 text-text-dim">
          10 道题,每一道都来自一个真实的历史瞬间。答对 {PASS_THRESHOLD} 题及以上,即可领取可下载的
          <span className="text-arc-gold">「电磁学历史达人」证书</span>。进度会自动保存在本地。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => start(true)}
            className="rounded-full bg-arc-gold px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
          >
            开始闯关 →
          </button>
          {resumable && !resumable.done && resumable.answers.some((a) => a !== null) && (
            <button
              onClick={() => start(false)}
              className="rounded-full border border-line px-6 py-2.5 text-sm text-text-dim transition hover:text-text"
            >
              继续上次进度
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'playing') {
    const correct = picked !== null && picked === q.answer;
    return (
      <div className="rounded-2xl border border-line bg-panel p-6 md:p-8">
        {/* 进度 */}
        <div className="mb-4 flex items-center justify-between text-xs text-text-dim">
          <span>
            第 <span className="text-arc-gold">{idx + 1}</span> / {QUIZ_QUESTIONS.length} 题
          </span>
          <span>已答对 {score}</span>
        </div>
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-panel-2">
          <div
            className="h-full rounded-full bg-arc-gold transition-all"
            style={{ width: `${((idx + (picked !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        <h3 className="text-lg font-bold leading-relaxed text-text">{q.question}</h3>

        <ul className="mt-5 flex flex-col gap-2.5" role="radiogroup" aria-label="选项">
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const isAnswer = q.answer === i;
            const revealed = picked !== null;
            let cls = 'border-line bg-panel-2 hover:border-arc-gold/60';
            if (revealed && isAnswer) cls = 'border-emerald-500 bg-emerald-500/10';
            else if (revealed && isPicked && !isAnswer) cls = 'border-charge-pos bg-charge-pos/10';
            return (
              <li key={i}>
                <button
                  role="radio"
                  aria-checked={isPicked}
                  disabled={revealed}
                  onClick={() => choose(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${cls} ${
                    revealed ? 'cursor-default' : ''
                  }`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-xs text-text-dim">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-text">{opt}</span>
                  {revealed && isAnswer && <span className="ml-auto text-emerald-400">✓</span>}
                  {revealed && isPicked && !isAnswer && (
                    <span className="ml-auto text-charge-pos">✗</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* 解析 */}
        {picked !== null && (
          <div
            className="mt-5 rounded-xl border-l-4 px-4 py-3 text-sm leading-7"
            style={{
              borderColor: correct ? '#10B981' : '#EF4444',
              background: correct ? 'rgba(16,185,129,.08)' : 'rgba(239,68,68,.08)',
            }}
            aria-live="polite"
          >
            <strong className={correct ? 'text-emerald-400' : 'text-charge-pos'}>
              {correct ? '答对了!' : '再想想 —'}
            </strong>{' '}
            <span className="text-text-dim">{q.explain}</span>
          </div>
        )}

        {picked !== null && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={goNext}
              className="rounded-full bg-arc-gold px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
            >
              {isLast ? '查看成绩 →' : '下一题 →'}
            </button>
          </div>
        )}
      </div>
    );
  }

  /* result */
  return (
    <div className="rounded-2xl border border-line bg-panel p-6 md:p-8">
      <h3 className="text-2xl font-bold">
        {passed ? '🎉 恭喜通关!' : '继续加油!'}
      </h3>
      <p className="mt-2 text-text-dim">
        你答对了 <span className="text-2xl font-extrabold text-arc-gold">{score}</span> /{' '}
        {QUIZ_QUESTIONS.length} 题。
        {passed
          ? `达到 ${PASS_THRESHOLD} 题门槛,可领取证书。`
          : `答对 ${PASS_THRESHOLD} 题即可领取证书,再来一次?`}
      </p>

      {passed && (
        <div className="mt-6">
          <label className="block text-sm">
            <span className="text-text-dim">在证书上署名(选填):</span>
            <input
              type="text"
              value={name}
              maxLength={16}
              onChange={(e) => setName(e.target.value)}
              placeholder="你的名字"
              className="mt-1.5 w-full max-w-xs rounded-lg border border-line bg-panel-2 px-3 py-2 text-text outline-none focus:border-arc-gold"
            />
          </label>

          {/* 证书(导出区域)*/}
          <div className="mt-5 overflow-x-auto">
            <div
              ref={certRef}
              className="relative mx-auto w-[560px] rounded-2xl border-2 border-arc-gold/60 bg-bg p-8 text-center"
              style={{ background: 'linear-gradient(160deg,#0F172A,#0B1120)' }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-arc-gold">Certificate</div>
              <div className="mt-3 text-3xl font-extrabold text-text">电磁学历史达人</div>
              <div className="mx-auto mt-3 h-px w-24 bg-arc-gold/50" />
              <p className="mt-5 text-sm text-text-dim">兹证明</p>
              <p className="mt-1 text-2xl font-bold text-arc-gold">{name || '这位探索者'}</p>
              <p className="mt-3 text-sm leading-7 text-text-dim">
                已通过电磁学认知闯关,答对 {score} / {QUIZ_QUESTIONS.length} 题,
                <br />
                走完了从琥珀摩擦到 5G 通信的三千年认知革命。
              </p>
              <div className="mt-6 flex items-center justify-between text-[11px] text-text-dim">
                <span>⚡ 电磁学:一场跨越三千年的认知革命</span>
                <span>从泰勒斯 → 麦克斯韦 → 你</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={downloadCert}
              disabled={downloading}
              className="rounded-full bg-arc-gold px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-60"
            >
              {downloading ? '生成中…' : '⬇ 下载证书 PNG'}
            </button>
            <button
              onClick={restart}
              className="rounded-full border border-line px-6 py-2.5 text-sm text-text-dim transition hover:text-text"
            >
              重新挑战
            </button>
          </div>
        </div>
      )}

      {!passed && (
        <div className="mt-6">
          <button
            onClick={restart}
            className="rounded-full bg-arc-gold px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
          >
            再来一次 →
          </button>
        </div>
      )}
    </div>
  );
}
