/**
 * i18n 单一事实源 —— 站点支持的语言与默认语言。
 * 「最小预留」:当前仅中文;新增语言只需在此登记,并补 ui.ts 与内容文案(见 README.md)。
 */
export const LOCALES = ['zh'] as const;
export type Locale = (typeof LOCALES)[number];

/** 默认语言:URL 不带语言前缀(保持现有 /path);非默认语言将走 /<locale>/path */
export const DEFAULT_LOCALE: Locale = 'zh';

/** Locale → <html lang> 属性值 */
export const HTML_LANG: Record<Locale, string> = {
  zh: 'zh-CN',
};
