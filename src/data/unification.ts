/**
 * 殊途同归:麦克斯韦的统一 —— 数据层。
 * 讲四条分立定律如何汇入四个方程、它的统治地位、对称性与艺术性,以及「最优美公式」之名。
 */

export const UNIFY_INTRO =
  '电、磁、光,曾是三条互不相干的支流。麦克斯韦用四个方程,让它们万流归宗。';

export interface UnifiedEquation {
  tex: string;
  name: string;
  /** 前驱来源(它统一了哪条定律)*/
  origin: string;
  meaning: string;
}

/** 四方程的统一映射:每一式都收编了一条前驱定律 */
export const MAXWELL_EQUATIONS: UnifiedEquation[] = [
  {
    tex: '\\nabla \\cdot \\mathbf{E} = \\dfrac{\\rho}{\\varepsilon_0}',
    name: '高斯电场定律',
    origin: '收编库仑定律',
    meaning: '电荷是电场的源,电场从正电荷发散而出。',
  },
  {
    tex: '\\nabla \\cdot \\mathbf{B} = 0',
    name: '高斯磁场定律',
    origin: '收编「磁单极不存在」的观测',
    meaning: '磁感线无头无尾、自成闭合——没有孤立的磁荷。',
  },
  {
    tex: '\\nabla \\times \\mathbf{E} = -\\dfrac{\\partial \\mathbf{B}}{\\partial t}',
    name: '法拉第电磁感应定律',
    origin: '收编法拉第十年实验',
    meaning: '变化的磁场,会激发出电场。',
  },
  {
    tex: '\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\dfrac{\\partial \\mathbf{E}}{\\partial t}',
    name: '安培–麦克斯韦定律',
    origin: '收编安培定律 + 麦克斯韦位移电流',
    meaning: '电流与变化的电场,都会激发磁场;末项正是预言电磁波的关键。',
  },
];

/** 统治地位 */
export const DOMINANCE =
  '麦克斯韦方程组是经典电磁学的完整框架:任何宏观电磁现象——静电、电流、磁、电磁感应、电磁波乃至光——都能由这四个方程描述。它不仅终结了电与磁的割裂,更揭示「光本身就是电磁波」,把整个光学纳入电磁学版图;而它隐含的「光速不变」,直接催生了爱因斯坦的狭义相对论。在经典层面,电磁学几乎没有它无法描述的现象——这就是它的统治地位。';

/** 对称性与艺术性的说明 */
export const SYMMETRY_NOTE =
  '在没有电荷与电流的真空中(ρ=0, J=0),方程组呈现出近乎完美的对称:电场的旋度由磁场的变化给出,磁场的旋度由电场的变化给出。二者互为镜像、彼此激发、生生不息——这正是电磁波,也是这组方程最动人的地方。';

/** 真空无源形式(展示电↔磁的对称美)*/
export const VACUUM_FORMS: { tex: string }[] = [
  { tex: '\\nabla \\cdot \\mathbf{E} = 0' },
  { tex: '\\nabla \\cdot \\mathbf{B} = 0' },
  { tex: '\\nabla \\times \\mathbf{E} = -\\dfrac{\\partial \\mathbf{B}}{\\partial t}' },
  { tex: '\\nabla \\times \\mathbf{B} = \\mu_0 \\varepsilon_0 \\dfrac{\\partial \\mathbf{E}}{\\partial t}' },
];

export interface BeautyReason {
  title: string;
  desc: string;
}

/** 为什么它被称为「最优美的公式」*/
export const BEAUTY_REASONS: BeautyReason[] = [
  {
    title: '简洁',
    desc: '仅仅四行,就囊括了人类已知的全部经典电磁现象——从闪电到无线电,从电机到光。',
  },
  {
    title: '对称',
    desc: '电与磁、散度与旋度,在方程中互为镜像;真空里 E 与 B 的地位几乎完全对等。',
  },
  {
    title: '统一',
    desc: '它把原本分立的电学、磁学与光学合为一体——光,不过是电磁场的波动。',
  },
  {
    title: '预言',
    desc: '方程不只描述已知,还预言未知:电磁波的存在与光速,都是先从方程「算」出来,再被实验证实的。',
  },
  {
    title: '普适',
    desc: '从微观电子到星系尺度,同一组方程始终成立;它甚至本就是洛伦兹协变的,天然通过了相对论的检验。',
  },
];

export interface Tribute {
  quote: string;
  author: string;
}

/** 名家致敬(均为真实评价)*/
export const TRIBUTES: Tribute[] = [
  {
    quote:
      '从人类历史的长远眼光看——比如一万年后回望——几乎可以肯定,19 世纪最重大的事件,将被判定为麦克斯韦对电磁定律的发现。',
    author: '理查德·费曼',
  },
  {
    quote: '写下这些符号的,难道是神吗?',
    author: '路德维希·玻尔兹曼(借歌德《浮士德》评价麦克斯韦方程)',
  },
  {
    quote:
      '你无法摆脱这样的感觉:这些数学公式有其独立的存在与智慧,它们比我们更聪明,甚至比它们的发现者更聪明——我们从中得到的,远比当初放进去的更多。',
    author: '海因里希·赫兹',
  },
];
