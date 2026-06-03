import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';

interface Props {
  fileName: string;
  /** 海报预览/可下载内容 */
  children: React.ReactNode;
}

/**
 * 通用海报下载包装器。
 * children 由 Astro 服务端渲染为静态 HTML,React 仅负责「一键下载为 PNG」。
 */
export default function PosterDownload({ fileName, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ref.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(ref.current, { quality: 0.95, pixelRatio: 2 });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      a.click();
    } catch {
      // 忽略（用户取消等）
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      {/* 海报预览区 */}
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: 800,
          margin: '0 auto 16px',
          background: '#0B1120',
          color: '#E2E8F0',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 0 0 1px #1e2c4a, 0 8px 32px rgba(0,0,0,.4)',
        }}
      >
        {children}
      </div>

      <div className="text-center">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-full border border-arc-gold/60 bg-arc-gold/10 px-6 py-2.5 text-sm font-semibold text-arc-gold transition hover:bg-arc-gold/20 disabled:opacity-60"
        >
          {downloading ? '生成中…' : `⬇ 下载 ${fileName}`}
        </button>
        <p className="mt-2 text-xs text-text-dim">PNG · 2× 高清输出</p>
      </div>
    </div>
  );
}
