/**
 * 资源中心 —— 数据层(design.md 7)。
 * 视频 / 书籍 / 原始文献 / 实验复刻指南 / 高清素材下载。
 * 外链统一标注来源,实验指南给出材料与步骤(内容/表现分离,组件只渲染)。
 */

export const RESOURCES_INTRO =
  '想继续深入?这里汇集了延伸观看、阅读、原始文献,以及十个在家就能动手复刻的电磁学实验。';

/** 通用外部资源条目(视频 / 书籍 / 文献)*/
export interface ResourceItem {
  title: string;
  /** 作者 / 出品方 / 频道 */
  by: string;
  desc: string;
  /** 外链;无链接时仅展示信息(避免死链)*/
  url?: string;
  /** 备注标签,如「纪录片」「传记」「原始论文」*/
  tag?: string;
}

/** 视频推荐 */
export const VIDEOS: ResourceItem[] = [
  {
    title: '长河劫·电磁学系列',
    by: 'B 站科普',
    desc: '以科学史的曲折性为线索,串起从泰勒斯到麦克斯韦的电磁学认知革命——本站叙事的灵感来源之一。',
    tag: '科普系列',
  },
  {
    title: 'BBC《电的故事》(Shock and Awe: The Story of Electricity)',
    by: 'BBC / Jim Al-Khalili',
    desc: '三集纪录片,从静电火花到电网文明,兼顾史实与人物,画面与叙事俱佳。',
    tag: '纪录片',
  },
  {
    title: '费曼物理学讲义·电磁学篇',
    by: 'Richard Feynman / Caltech',
    desc: '费曼对「场」与麦克斯韦方程组的讲解,把抽象概念讲得直观可感,适合进阶爱好者。',
    tag: '讲座',
  },
];

/** 书籍推荐 */
export const BOOKS: ResourceItem[] = [
  {
    title: '《电磁学发展史》',
    by: '宋德生 等',
    desc: '系统梳理从古代静电到经典电磁理论的发展脉络,史料扎实,适合作为通读底本。',
    tag: '科学史',
  },
  {
    title: '《法拉第传》',
    by: 'L. P. 威廉斯',
    desc: '铁匠之子如何凭直觉与实验抵达「场」的概念——一部关于想象力胜过数学的传记。',
    tag: '传记',
  },
  {
    title: '《麦克斯韦传》',
    by: 'Basil Mahon',
    desc: '《The Man Who Changed Everything》中译。讲述麦克斯韦如何用数学翻译法拉第的力线,预言电磁波。',
    tag: '传记',
  },
  {
    title: '《电学之父——法拉第的故事》',
    by: '科学家传记丛书',
    desc: '面向大众的入门读物,语言通俗,适合作为青少年了解电磁学史的第一本书。',
    tag: '入门',
  },
];

/** 原始文献库 —— 一手史料,标注出处便于溯源(CLAUDE.md 八)*/
export const PAPERS: ResourceItem[] = [
  {
    title: 'A Dynamical Theory of the Electromagnetic Field (1865)',
    by: 'J. C. Maxwell',
    desc: '麦克斯韦奠定电磁场理论、预言电磁波的原始论文。皇家学会哲学汇刊原文。',
    tag: '原始论文',
  },
  {
    title: 'Experimental Researches in Electricity',
    by: 'M. Faraday',
    desc: '法拉第历时数十年的实验研究合集,电磁感应、力线概念皆出于此。',
    tag: '实验笔记',
  },
  {
    title: 'Die galvanische Kette, mathematisch bearbeitet (1827)',
    by: 'G. S. Ohm',
    desc: '欧姆定律的原始专著——发表后被冷落十年,如今是每本电学教科书的开篇。',
    tag: '原始专著',
  },
];

/** 实验复刻指南 —— 在家可做的简单电磁学实验(附材料与步骤)*/
export interface Experiment {
  id: string;
  title: string;
  /** 对应的历史节点,做关联 */
  origin: string;
  /** 难度:简单 / 中等 */
  level: '简单' | '中等';
  materials: string[];
  steps: string[];
  /** 现象解释 */
  principle: string;
  /** 安全提示(涉及高压/尖锐物时必填)*/
  safety?: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'amber',
    title: '琥珀摩擦吸引轻物',
    origin: '泰勒斯,公元前 600 年',
    level: '简单',
    materials: ['塑料尺或气球(替代琥珀)', '碎纸屑', '干燥的头发或羊毛布'],
    steps: [
      '把塑料尺在干燥头发或羊毛布上快速摩擦十几下。',
      '将尺子靠近桌面上的碎纸屑,但不要接触。',
      '观察纸屑被吸起、跳向尺子的现象。',
    ],
    principle: '摩擦使物体带上静电,带电体对轻小物体产生静电吸引——这正是「电(elektron=琥珀)」一词的由来。',
  },
  {
    id: 'can',
    title: '易拉罐静电赛跑',
    origin: '静电时代',
    level: '简单',
    materials: ['空易拉罐', '吹胀的气球', '干燥头发'],
    steps: [
      '把易拉罐横放在光滑桌面上。',
      '气球在头发上摩擦使其带电。',
      '把气球靠近(不接触)易拉罐,罐子会被「隔空」吸着滚动。',
    ],
    principle: '带电气球使易拉罐近端感应出异号电荷(静电感应),异性相吸,于是罐子追着气球跑。',
  },
  {
    id: 'oersted',
    title: '奥斯特实验:电流让指南针偏转',
    origin: '奥斯特,1820 年',
    level: '简单',
    materials: ['1.5V 电池', '一段导线', '小指南针'],
    steps: [
      '把指南针放平,记下静止时 N 极指向。',
      '将导线平行放在指南针上方,短暂接通电池两极。',
      '观察通电瞬间指针发生偏转,断电后回位。',
    ],
    principle: '电流在周围激发磁场,使磁针偏转——这就是 1820 年震动欧洲的「电生磁」,电与磁第一次被联系起来。',
    safety: '只可短暂通电(数秒),导线直接接电池会发热,切勿长时间短路。',
  },
  {
    id: 'induction',
    title: '法拉第电磁感应:动磁生电',
    origin: '法拉第,1831 年',
    level: '中等',
    materials: ['漆包线绕成的线圈(几十到上百匝)', '强磁铁', '灵敏电流计或 LED'],
    steps: [
      '把线圈两端接到电流计(或低压 LED)。',
      '将磁铁快速插入线圈,观察电流计指针摆动。',
      '磁铁静止时无电流;快速抽出时指针向反方向摆动。',
    ],
    principle: '只有「变化」的磁场才能生电:磁通量随时间变化在线圈中感应出电动势——发电机的原理就在这一插一拔之间。',
  },
  {
    id: 'motor',
    title: '最简单的电动机(单极电机)',
    origin: '电与磁的统一',
    level: '中等',
    materials: ['1.5V 电池', '圆柱形钕磁铁', '一段铜丝'],
    steps: [
      '把磁铁吸在电池负极底部。',
      '将铜丝弯成对称形状,顶端点在电池正极、两脚轻触磁铁边缘。',
      '观察铜丝绕电池高速旋转。',
    ],
    principle: '电流在磁场中受到洛伦兹力(F=IL×B),持续的切向力推动铜丝旋转——电动机最朴素的雏形。',
    safety: '磁铁与电池会发热,旋转铜丝有甩出风险,实验后及时断开,远离眼睛。',
  },
];

/** 高清素材下载 —— 海报 / 肖像等(本轮多为占位,实际素材落地后补 url)*/
export interface DownloadItem {
  title: string;
  desc: string;
  /** 资源相对路径(经 asset() 处理);无则标注「即将上线」*/
  file?: string;
  format: string;
}

export const DOWNLOADS: DownloadItem[] = [
  {
    title: '电磁学发展时间线海报',
    desc: '从琥珀到 5G 的三千年大事记,适合打印张贴。',
    format: 'PNG · A2',
  },
  {
    title: '麦克斯韦方程组海报',
    desc: '四个方程的微分与积分形式,配 Latin Modern Math 公式字体。',
    format: 'SVG · 矢量',
  },
  {
    title: '科学家肖像合集',
    desc: '法拉第、麦克斯韦、赫兹等手绘风肖像,统一深空蓝配色。',
    format: 'PNG · 透明底',
  },
];
