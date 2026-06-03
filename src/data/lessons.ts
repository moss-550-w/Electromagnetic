/**
 * 科学启示录 —— 数据层(design.md 6)。
 * 从三千年电磁学史中提炼可迁移的科学方法论与人生智慧。
 */

export const INSIGHTS_INTRO =
  '从三千年电磁学史中,提炼出可迁移的科学方法论与人生智慧——这是整个网站的升华。';

export interface DiscoveryLaw {
  title: string;
  desc: string;
}

/** 科学发现的 5 条规律 */
export const DISCOVERY_LAWS: DiscoveryLaw[] = [
  {
    title: '科学不是线性进步,而是螺旋式上升',
    desc: '单流体与双流体、超距作用与场——科学在争论、否定与回归中盘旋前进,而非一条直线。',
  },
  {
    title: '错误是科学进步的必经之路',
    desc: '动物电假说错了,却逼出了伏打电堆;以太错了,却催生了相对论。',
  },
  {
    title: '偶然发现只青睐有准备的头脑',
    desc: '奥斯特讲座后的「顺手一试」之所以改变历史,是因为他早已为这个问题准备多年。',
  },
  {
    title: '主流范式往往是最大的认知障碍',
    desc: '「超距作用」「以太」曾是不容置疑的常识,恰恰是它们禁锢了想象力。',
  },
  {
    title: '实验是检验真理的唯一标准',
    desc: '麦克斯韦的电磁波只是预言,直到赫兹的实验,才把它从假设变成真理。',
  },
];

export interface YouthAdvice {
  title: string;
  note: string;
}

/** 给年轻人的 5 条建议 */
export const YOUTH_ADVICE: YouthAdvice[] = [
  { title: '不要盲从权威,要独立思考', note: '开尔文不随大流轻视法拉第,才接住了「场」的火种。' },
  { title: '不要害怕犯错,要从错误中学习', note: '伽伐尼的错误假说,本身就是通往真理的一级台阶。' },
  { title: '不要忽视「无用」的基础研究', note: '赫兹眼中「毫无用处」的电磁波,如今连接了整个星球。' },
  { title: '要像开尔文一样,去故纸堆里找宝藏', note: '把前人被忽视的直觉,翻译成今天的语言。' },
  { title: '保持好奇心,它是科学研究的原动力', note: '一切始于泰勒斯对一块琥珀的好奇。' },
];

export interface SocietyPoint {
  title: string;
  desc: string;
}

/** 科学与社会 */
export const SOCIETY_POINTS: SocietyPoint[] = [
  { title: '科学研究需要宽容的环境', desc: '欧姆被压制 10 年的教训提醒我们:容不下异见的环境,会扼杀真理。' },
  { title: '基础研究的价值不能用短期利益衡量', desc: '法拉第的线圈、麦克斯韦的方程,价值都在数十年后才兑现。' },
  { title: '科学是全人类的共同财富', desc: '从希腊的琥珀到德国的电火花,电磁学是无数民族共同书写的篇章。' },
];

export interface Lesson {
  n: number;
  person: string;
  lesson: string;
}

/** 电磁学史的 10 个教训(design.md 6.2)*/
export const LESSONS: Lesson[] = [
  { n: 1, person: '泰勒斯', lesson: '好奇是科学的起点' },
  { n: 2, person: '吉尔伯特', lesson: '实验是科学的基础' },
  { n: 3, person: '格雷', lesson: '小人物也能做出大发现' },
  { n: 4, person: '伽伐尼', lesson: '错误的理论也有价值' },
  { n: 5, person: '伏打', lesson: '质疑权威是科学的灵魂' },
  { n: 6, person: '欧姆', lesson: '真理需要时间来证明' },
  { n: 7, person: '奥斯特', lesson: '偶然中蕴含着必然' },
  { n: 8, person: '法拉第', lesson: '想象力比知识更重要' },
  { n: 9, person: '开尔文', lesson: '独立思考胜过追随主流' },
  { n: 10, person: '麦克斯韦', lesson: '理论思维能预见未来' },
];
