/**
 * base-aware 内部链接工具 —— 杜绝 GitHub Pages 子路径下的死链。
 * 所有站内链接、public/ 资源引用都必须经过这里,不要手写裸路径 `/timeline`。
 * import.meta.env.BASE_URL 由 Astro 注入,等于 astro.config 的 base(末尾带 /)。
 */
const BASE = import.meta.env.BASE_URL;

/** 拼接 base + 路径,并压缩重复斜杠。href('timeline') → '/timeline' 或 '/<repo>/timeline' */
export const href = (path: string): string =>
  `${BASE}/${String(path).replace(/^\/+/, '')}`.replace(/\/{2,}/g, '/');

/** public/ 静态资源同理。asset('fonts/inter.woff2') / asset('images/x.jpg') */
export const asset = href;
