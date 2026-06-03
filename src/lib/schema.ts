/**
 * JSON-LD 结构化数据生成器(SEO)。纯函数,组件只负责把返回对象注入
 * <script type="application/ld+json">。URL 一律传入**绝对 canonical**
 * (页面用 new URL(pathname, Astro.site) 构造),避免子路径下生成相对地址。
 */

/** 站点名,与 Seo.astro 的 og:site_name 共用,集中一处避免漂移。 */
export const SITE_NAME = '电磁学:一场跨越三千年的认知革命';

/** 站点作为发布者/作者的 Organization 实体。 */
const PUBLISHER = {
  '@type': 'Organization',
  name: SITE_NAME,
} as const;

/** 站点级 WebSite schema(首页用)。url 为站点根绝对地址。 */
export function websiteSchema(opts: { url: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: opts.url,
    description: opts.description,
    inLanguage: 'zh-CN',
  };
}

/** 词条/文章页 Article schema(理论 / 科学家 / 工程详情页)。 */
export function articleSchema(opts: {
  headline: string;
  description: string;
  /** 当前页绝对 canonical */
  url: string;
  /** 所属板块名,如「理论的诞生与争议」 */
  section?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    inLanguage: 'zh-CN',
    isAccessibleForFree: true,
    publisher: PUBLISHER,
    author: PUBLISHER,
    ...(opts.section ? { articleSection: opts.section } : {}),
  };
}

/** 列表/板块页 CollectionPage schema(理论列表、科学家列表等)。 */
export function collectionPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  section?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    inLanguage: 'zh-CN',
    isAccessibleForFree: true,
    ...(opts.section ? { about: opts.section } : {}),
  };
}

/** 通用 WebPage schema(单页无内容分层时使用:timeline、errors、insights、resources)。 */
export function webPageSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    inLanguage: 'zh-CN',
    isAccessibleForFree: true,
  };
}

/** 面包屑 BreadcrumbList(首页 → 列表 → 详情)。items 顺序即层级,url 为绝对地址。 */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
