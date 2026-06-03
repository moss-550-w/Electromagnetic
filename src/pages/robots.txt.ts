import type { APIRoute } from 'astro';

/**
 * 动态 robots.txt:允许全站抓取,并指向构建产出的 sitemap-index.xml。
 * Sitemap 行用绝对地址且带 base 前缀,兼容 GitHub Pages 子路径部署。
 */
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL; // 末尾带 /
  const path = `${base}sitemap-index.xml`.replace(/\/{2,}/g, '/');
  const sitemap = site ? new URL(path, site).href : path;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
