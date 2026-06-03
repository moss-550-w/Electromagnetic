/**
 * UI 文案字典(界面文字,非内容)。内容(史实/人物/理论)仍在 src/data。
 * 「最小预留」:集中界面文案,未来加语言只需在每个 key 下补对应翻译。
 * 消费示例见 SiteNav.astro / BaseLayout.astro;其余待迁移文案见 README.md。
 */
import { DEFAULT_LOCALE, type Locale } from './config';

const zh = {
  'nav.brand': '电磁学',
  'nav.timeline': '交互式时间线',
  'nav.timelineShort': '时间线',
  'nav.theory': '理论与争议',
  'nav.engineering': '工程应用史',
  'nav.scientists': '科学家列传',
  'nav.insights': '科学启示录',
  'nav.resources': '资源中心',
  'common.skipToMain': '跳到主内容',
} as const;

/** 所有 UI 文案的 key(由中文字典推导,新增语言须保持同样的 key) */
export type UIKey = keyof typeof zh;

/** 各语言 UI 字典。新增语言:补一份同 key 的字典,TS 会强制 key 齐全。 */
const UI: Record<Locale, Record<UIKey, string>> = { zh };

/** 取 UI 文案;给定语言缺失时回退默认语言。 */
export function t(key: UIKey, locale: Locale = DEFAULT_LOCALE): string {
  return (UI[locale] ?? UI[DEFAULT_LOCALE])[key];
}
