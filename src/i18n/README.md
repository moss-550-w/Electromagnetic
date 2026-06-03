# i18n —— 多语言扩展位（最小预留）

当前站点为**单语言中文**。本目录是「预留扩展位」：让未来新增语言**无需满世界找硬编码中文**，而不是现在就上英文版（符合 CLAUDE.md 六「预留 i18n」要求）。

## 现有结构

| 文件 | 职责 |
|------|------|
| `config.ts` | 语言单一事实源：`LOCALES` / `DEFAULT_LOCALE` / `HTML_LANG` |
| `ui.ts` | UI 界面文案字典 + `t(key, locale?)` 取值；内容文案不在此（见 `src/data`） |
| `README.md` | 本文件 |

- `href(path, locale?)`（`src/lib/href.ts`）已预留 `locale`：默认语言不加前缀（保持现有 URL），非默认 → `/<locale>/path`。
- `BaseLayout` 的 `<html lang>` 取自 `HTML_LANG[DEFAULT_LOCALE]`。
- **已消费字典的范例**：`SiteNav.astro`（导航）、`BaseLayout.astro`（跳转链接）。

## 新增一种语言（以英文 `en` 为例）

1. **登记**：`config.ts` → `LOCALES` 加 `'en'`；`HTML_LANG` 加 `en: 'en'`。
2. **UI 文案**：`ui.ts` → `UI` 加 `en` 字典（TS 会强制 key 与 `zh` 齐全）。
3. **内容数据**：二选一——
   - **方案 A（嵌入）**：`src/data/*.ts` 文案字段改 `{ zh: string; en: string }`，组件按 locale 取。集中但触及所有 data 文件。
   - **方案 B（分离）**：`src/data/en/*.ts` 平行一套，按 locale 切换数据源。内容与代码解耦，内容量大时推荐。
4. **路由**：启用 Astro i18n 或 `src/pages/[locale]/` 动态路由；页面内 `href(path, locale)` 传当前语言；加语言切换 UI。
5. **翻译**：约 500 条内容（timeline / theories / scientists / engineering / insights / quiz / resources），需专业科学校对，建议分板块多轮推进。

## 待迁移的散落 UI 文案（真正做 i18n 时，按 `SiteNav` 范例抽到 `ui.ts`）

- `[slug]` 段标题：`theory/[slug].astro` 的 7 段、`scientists/[slug].astro` 的 6 段、`engineering/[slug].astro` 的 5 段标签
- 交互组件按钮/提示：`QuizApp` / `EMWaveApp` / `FieldLines` / `WithoutEM` 内的中文串
- 各列表页 header、footer、`FeatureCards` 等文案

> 这些目前仍硬编码在组件中——属预留范围内的「已知待办」，不影响当前中文站运行。
