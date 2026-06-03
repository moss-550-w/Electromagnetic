// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// GitHub Pages:project pages 的 base 必须等于仓库名。
// 用环境变量收敛:本地 dev 默认 '/';CI/部署时设 BASE_PATH=/<仓库名>、SITE_URL=https://<user>.github.io
const SITE = process.env.SITE_URL ?? 'https://example.github.io';
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  // 所有站内链接一律走 src/lib/href.ts 的 href()/asset(),自动带 base 前缀,杜绝子路径死链。
  // applyBaseStyles:false —— Tailwind 基础层由 src/styles/global.css 的 @tailwind 指令唯一注入,避免重复
  integrations: [react(), tailwind({ applyBaseStyles: false }), sitemap()],
});
