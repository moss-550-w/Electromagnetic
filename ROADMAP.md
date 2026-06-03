# 开发路线图 · 电磁学科普站

> 总体蓝图见 [`design.md`](./design.md),工程约束见 [`CLAUDE.md`](./CLAUDE.md)。
> 本文件规划「从已打通的首页+时间线」到「完整站点」的分阶段路线。

## 当前状态(基线)

- ✅ 工程:Astro 5 + React island + Tailwind **v3**(`@astrojs/tailwind`)+ GitHub Pages 目标,构建环境稳定
- ✅ 首页:开场动画 / 导航 / 时间线缩略图入口 / 三特色卡 / 启示滚动栏
- ✅ 交互式时间线:B+C 混合(垂直 scroll-snap 沉浸 + 详情常驻 / 移动抽屉),5 时代 16 节点,三层卡片
- ⚠️ **遗留**:Tailwind 由 v4 降级到 v3 后,设计令牌(颜色/字体)尚未迁入 `tailwind.config`,自定义类暂未生效 → 见 M0-P0

## 横切原则(每个里程碑都遵守)

| 维度 | 要求 | 来源 |
|------|------|------|
| 科学严谨 | 史料可溯源;争议并陈;脑洞与史实在 UI 上明确区分 | CLAUDE.md 八 |
| 设计一致 | 只用设计令牌,禁魔法值;金色仅高亮核心结论 | CLAUDE.md 四 |
| 内容/表现分离 | 文案进 `src/data`(或后续 `src/content`),组件只渲染 | CLAUDE.md 三 |
| a11y / SEO | 每页独立 SEO;键盘可达;`prefers-reduced-motion`;图片 alt | CLAUDE.md 六 |
| 复用优先 | `LayeredCard` / `BaseLayout` / `Seo` / 待建 `Formula` 跨板块共用 | CLAUDE.md 五 |

---

## M0 · 地基加固(P0,阻塞后续所有视觉开发)

| 任务 | 产物 | 说明 |
|------|------|------|
| **设计令牌迁移**(P0) | `tailwind.config.mjs` | `theme.extend.colors` = 深空蓝/电弧金/磁石灰/正电红/负电蓝 + 派生 bg/panel/panel-2/line/text/text-dim;`fontFamily.sans/math`。让 `bg-bg`/`text-arc-gold` 等生效 |
| 构建 + 视觉验证 | — | `npm run build`/`dev`,截图首页与时间线确认配色/布局/交互正常 |
| 字体 self-host | `public/fonts/` + `@font-face` | Inter woff2(SIL OFL,附 LICENSE),无外网依赖 |
| KaTeX 预接入 | `src/components/shared/Formula.tsx` | 构建时渲染公式组件,供 M2 麦克斯韦方程组 |
| 部署流水线 | `.github/workflows/deploy.yml` | GitHub Actions 构建并发布到 Pages,注入 `BASE_PATH`/`SITE_URL` |
| 清理 | 删 `prototypes/timeline/` | 时间线已落地,按 NOTES.md 移除原型 |

**完成判据**:首页与时间线在浏览器中配色/字体/交互完全正常;CI 能产出可访问的 Pages 站点。

---

## M1 · 时间线深化(灵魂板块补完)— design.md 2.2 / 2.3

- 节点历史图片接入(`node.image` + 合规 alt)
- 关联跳转接线(`node.links` → 理论/工程/列传,待目标页存在后启用)
- **平行宇宙时间线**:关键分歧点的「如果……」历史推演(2.3)
- **时间线对比**:叠加同时代世界史事件(创意交互 4)

## M2 · 理论的诞生与争议(深度板块)— design.md 3

- 路由 `/theory/[slug]`,**7 段式理论页模板**(诞生前夜→突破时刻→核心内容→世纪之争→最终胜利→工程遗产→启示)
- **错误理论博物馆** `/theory/errors`:动物电 / 单双流体说 / 超距作用 / 以太
- **公式的诞生**:麦克斯韦方程组逐项拆解 + KaTeX + 位移电流动画(创意交互 5)
- 复用 `LayeredCard`

## M3 · 工程应用史(特色板块)— design.md 4

- 路由 `/engineering/[slug]`,**案例页模板**(理论源头→技术突破→产业革命→现代应用→未来→启示)
- 首案例:发电机与电网
- **「如果没有电磁学」互动模拟器**:禁用某发现→展示后果(4.3)

## M4 · 凡人科学家列传(人文板块)— design.md 5

- 路由 `/scientists/[slug]`,**人物页模板**(凡人画像→研究之路→核心贡献→争议→启示→名言)
- 重点 4 人:法拉第 / 开尔文 / 麦克斯韦 / 赫兹
- **被遗忘的先驱**:格雷 / 欧姆 / 楞次 / 毕奥-萨伐尔

## M5 · 科学启示录(价值板块)— design.md 6

- `/insights`:科学发现 5 规律 / 给年轻人 5 建议 / 科学与社会
- **电磁学史的 10 个教训**卡片(复用卡片组件;可 `html-to-image` 分享)

## M6 · 资源中心 + 创意交互 — design.md 7 / 四

- `/resources`:视频 / 书籍 / 原始文献 / 实验复刻指南 / 高清素材下载
- **电场线可视化**:拖拽正负电荷实时重绘(Canvas)
- **电磁波传播动画**:可调频率/振幅(SVG)
- **认知闯关**:10 题 + 「历史达人」证书(`html-to-image` 下载,`localStorage` 存进度)

## M7 · 打磨与上线

- 内容三层分层完善(快速/深度/专业)
- 性能:图片懒加载、资源压缩、动画帧率与移动端降级
- 全站 a11y + SEO 审计(sitemap、结构化数据、alt 全覆盖)
- i18n 框架预留(多语言扩展位)
- 跨浏览器 / 移动端测试 → 正式部署

---

## 推荐执行顺序与理由

```
M0(必做地基)
  └─ M2 理论与争议 ── 网站最具特色(错误理论博物馆),优先立住「深度」人设
       └─ M4 科学家列传 ── 与理论强关联,复用模板,补「人文」
            └─ M3 工程应用史 ── 打通「理论→工程」链条
                 └─ M5 启示录 ── 提炼升华,体量小
M1 时间线深化 / M6 创意交互 ── 穿插在内容板块之间做,提升沉浸感
M7 打磨上线 ── 收尾
```

**判断依据**:design.md 把时间线定为「灵魂」、理论争议定为「深度」。时间线骨架已成,故下一步主攻「深度板块」立住差异化人设;人物与工程紧随其后形成内容闭环;创意交互(高研发成本)穿插推进,避免一次性铺太大。顺序可按需调整。

## 技术债 / 待办清单

- [ ] M0-P0:`tailwind.config.mjs` 设计令牌(**最高优先**)
- [ ] Inter 字体 self-host
- [ ] KaTeX 接入(公式板块前置)
- [ ] GitHub Actions 部署 + 确认仓库名→`BASE_PATH`
- [ ] 删除 `prototypes/timeline/`
- [ ] `src/content/` 集合化(板块内容增多后,从 `src/data` 迁到 Astro Content Collections,获得类型校验与 Markdown 支持)
