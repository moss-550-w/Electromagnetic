/**
 * 首页文案数据 —— 内容/表现分离(CLAUDE.md 六节,不写死中文到逻辑)。
 * 文案来源:design.md 第三节 1.2。
 */

export interface FeatureCard {
  id: string;
  title: string;
  desc: string;
  /** 站内目标 slug(传给 href());本轮仅 timeline 真实可达,其余预留 */
  to?: string;
  /** 暂未实现的板块标 true,渲染为 aria-disabled,不留死链 */
  upcoming?: boolean;
}

/** 三大特色卡片 */
export const FEATURES: FeatureCard[] = [
  {
    id: 'misunderstood',
    title: '被误解的天才',
    desc: '欧姆被骂了 10 年、法拉第的「场」被讥为玄学——看主流如何忽视后来改变世界的人。',
    to: 'scientists',
  },
  {
    id: 'formulas',
    title: '改变世界的 10 个公式',
    desc: '从库仑定律到麦克斯韦方程组,拆解每个公式的「前世今生」与它催生的产业。',
    to: 'theory',
  },
  {
    id: 'without-em',
    title: '如果没有电磁学',
    desc: '禁用一个发现,世界会怎样?没有电磁感应、没有电磁波的现代生活脑洞模拟。',
    upcoming: true,
  },
];

/** 科学启示自动滚动金句(design.md 1.2)*/
export const INSIGHTS: string[] = [
  '科学不是真理的集合,而是不断逼近真理的过程',
  '主流范式往往是最大的认知牢笼',
  '错误的理论也能催生伟大的发现',
  '10 岁上大学的神童很多,但敢于钻进故纸堆的开尔文很少',
];
