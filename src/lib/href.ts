/**
 * base-aware 内部链接工具 —— 杜绝 GitHub Pages 子路径下的死链。
 * 所有站内链接、public/ 资源引用都必须经过这里,不要手写裸路径 `/timeline`。
 * import.meta.env.BASE_URL 由 Astro 注入,等于 astro.config 的 base(末尾带 /)。
 */
import { DEFAULT_LOCALE, type Locale } from '../i18n/config';

const BASE = import.meta.env.BASE_URL;
const join = (p: string): string =>
  `${BASE}/${String(p).replace(/^\/+/, '')}`.replace(/\/{2,}/g, '/');

/**
 * 站内链接。href('timeline') → '/timeline' 或 '/<repo>/timeline'。
 * locale 为 i18n 预留:默认语言不加前缀(保持现有 URL);非默认 → '/<locale>/timeline'。
 */
export const href = (path: string, locale: Locale = DEFAULT_LOCALE): string => {
  const clean = String(path).replace(/^\/+/, '');
  const withLocale = locale === DEFAULT_LOCALE ? clean : `${locale}/${clean}`;
  return join(withLocale);
};

/** public/ 静态资源:不带语言前缀。asset('favicon.svg') / asset('images/x.jpg') */
export const asset = (path: string): string => join(path);
