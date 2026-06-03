# 电磁学：一场跨越三千年的认知革命

> 从琥珀摩擦到 5G 通信 —— 以科学史的曲折性为灵魂的电磁学科普静态网站。

[![Astro](https://img.shields.io/badge/Astro-5-ff6a00?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

## 核心定位

- **真实优先**：完整呈现争议、错误、偶然，不神化科学家
- **分层呈现**：同一知识点支持「快速 / 深度 / 专业」三层渐进展开
- **沉浸式**：抽象的「场」与「波」用交互动画使其可感知

## 技术栈

| 项 | 选型 |
|---|------|
| 静态框架 | Astro 5 + React 19（island） |
| 样式 | Tailwind CSS 3 |
| 公式渲染 | KaTeX（构建时） |
| 动画 | SVG + Canvas + React state |
| 证书下载 | html-to-image |
| 托管 | 纯静态，兼容 GitHub Pages / Vercel / Netlify |

## 板块结构

```
首页
├── 交互式时间线（灵魂板块）— 5 时代 16 节点
├── 理论的诞生与争议 — 7 段式深度专题 ×7
│   ├── 错误理论博物馆 — 动物电 / 以太 / 超距作用
│   └── 殊途同归 — 麦克斯韦方程组逐项拆解
├── 工程应用史 — 理论→发明→产业 因果链
│   └── 「如果没有电磁学」互动模拟器
├── 凡人科学家列传 — 法拉第 / 开尔文 / 麦克斯韦 / 赫兹
│   └── 被遗忘的先驱 — 格雷 / 欧姆 / 楞次 / 毕奥-萨伐尔
├── 科学启示录 — 5 条规律 / 5 条建议 / 10 个教训
└── 资源中心 — 视频 / 书籍 / 原始文献 / 实验复刻 / 交互实验室
```

## 本地开发

```bash
npm install
npm run dev       # 开发服务器（默认 http://localhost:4321）
npm run build     # 生产构建 → dist/
npm run preview   # 预览生产构建
npm run check     # TypeScript 类型检查
```

## 项目结构

```
src/
├── content/            # Astro Content Collections（theories / scientists / engineering）
│   └── config.ts       # Zod schema + collection 定义
├── pages/              # 路由页面（Astro 文件即路由）
├── components/         # 复用组件（Astro + React island）
├── data/               # 非 entry 型数据（timeline / errors / lessons …）
├── i18n/               # 多语言预留（当前中文）
├── layouts/            # BaseLayout（SEO / Inter 字体 / 全局样式）
├── lib/                # href() / schema() / data() 工具函数
└── styles/             # Tailwind 入口 + CSS 自定义属性
```

## 内容原则

- 史实标注出处，争议并列不同观点
- 物理公式 / 常量经核对，渲染前验证
- 脑洞内容（平行宇宙 / 「如果没有电磁学」）在 UI 上与史实明确区分
- 内容与表现分离：数据在 `src/data/` 与 `src/content/`，组件只负责渲染

## 许可

MIT © Boye Dai

---

> *"每一个理所当然的公式背后，都是百年的争论与试错。"*
