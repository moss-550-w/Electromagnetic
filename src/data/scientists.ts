/**
 * 凡人科学家列传 —— 数据层(design.md 5)。
 * 不做「天才神话」,呈现有缺点、会犯错、被误解的凡人(CLAUDE.md 八)。
 * 统一 6 段结构:凡人画像 / 研究之路 / 核心贡献 / 他们的争议 / 留给后世的启示 / 名言。
 */

export interface Scientist {
  slug: string;
  name: string;
  /** 生卒年 */
  life: string;
  /** 一句话定位 */
  role: string;
  accent: string;
  /** 一句话核心(凡人特质,快速阅读层,金色高亮)*/
  summary: string;
  sections: {
    portrait: string; // 凡人画像:性格、缺点与人生困境
    journey: string; // 研究之路:充满挫折
    contribution: string; // 核心贡献:客观、不夸大
    controversy: string; // 他们的争议:当时如何评价
    legacy: string; // 留给后世的启示
  };
  /** 他们的名言 */
  quote: { zh: string; en?: string };
  /** 关联理论页 slug(理论 ↔ 人物互链)*/
  theorySlug?: string;
}

export const SCIENTISTS: Scientist[] = [
  {
    slug: 'faraday',
    name: '迈克尔·法拉第',
    life: '1791 – 1867',
    role: '从装订学徒到电磁学之父',
    accent: '#EF4444',
    summary: '铁匠的儿子,几乎不懂数学,却凭想象力建立了「场」的概念。',
    sections: {
      portrait:
        '铁匠的儿子,家境贫寒,14 岁起当书籍装订学徒,靠读手中装订的书自学成才。性格谦逊虔诚,一生淡泊——拒绝过爵位,也拒绝担任皇家学会会长。他最大的短板众所周知:数学几乎只会加减乘除,不懂微积分。',
      journey:
        '他旁听戴维的讲座后,把整理的笔记寄去求职,成了戴维的助手(起初近乎仆从)。戴维后来甚至嫉妒他的才华。法拉第历经多年反复实验,1831 年发现电磁感应,却因数学薄弱,只能用文字和「力线」图像来描述自己的发现。',
      contribution:
        '电磁感应定律、电解定律、「场」与「力线」概念、法拉第笼、以及苯的发现。其中「场」的概念,成了整个现代物理学的基石。',
      controversy:
        '他的「力线 / 场」被擅长数学的主流物理学家视为缺乏严谨的「玄学」;在很多人眼里,没有数学的物理算不上真正的物理。',
      legacy:
        '直觉和想象力,有时比数学更重要;出身与学历,定义不了一个人能抵达的科学高度。',
    },
    quote: {
      zh: '只要符合自然规律,再奇妙的事物也可能成真。',
      en: 'Nothing is too wonderful to be true, if it be consistent with the laws of nature.',
    },
    theorySlug: 'faraday-induction',
  },
  {
    slug: 'kelvin',
    name: '开尔文勋爵(威廉·汤姆逊)',
    life: '1824 – 1907',
    role: '把法拉第的直觉翻译成数学的人',
    accent: '#3B82F6',
    summary: '10 岁上大学的神童,却愿意钻进法拉第的「故纸堆」;晚年也看走了眼。',
    sections: {
      portrait:
        '不折不扣的神童,10 岁就进入格拉斯哥大学。精力旺盛、极度自信,既是理论物理学家,也是亲手主持大西洋海底电缆的工程师,后被封为开尔文勋爵。但晚年逐渐固执,低估了正在到来的新物理。',
      journey:
        '当主流轻视法拉第时,他却不盲从,认真研读法拉第的「力线」,率先用数学语言去描述它,为麦克斯韦铺平了道路。他一生发表数百篇论文,并主导了横跨大西洋的海底电缆工程。',
      contribution:
        '热力学第二定律的奠基者之一、绝对温标(开尔文温标)、把法拉第的力线数学化、以及海底电缆的工程实现。',
      controversy:
        '晚年那场著名的「两朵乌云」演讲——他认为物理学大厦已基本落成,只剩两朵小乌云(以太漂移、黑体辐射)。讽刺的是,这两朵乌云恰恰是相对论与量子力学的开端。他还曾基于错误假设严重低估地球年龄,据此反对达尔文。',
      legacy:
        '科学研究不是附和主流,而是独立判断;但再聪明的人也会被时代局限——所以要始终保持谦逊。',
    },
    quote: {
      zh: '当你能测量你所谈论的事物,并用数字表达它,你才算真正了解了它。',
      en: 'When you can measure what you are speaking about, and express it in numbers, you know something about it.',
    },
    theorySlug: 'faraday-induction',
  },
  {
    slug: 'maxwell',
    name: '詹姆斯·麦克斯韦',
    life: '1831 – 1879',
    role: '预言电磁波,却没能看到它的人',
    accent: '#A78BFA',
    summary: '用流体类比想象电磁场,生前理论几乎无人问津,48 岁便早逝。',
    sections: {
      portrait:
        '苏格兰乡绅之子,内向、虔诚而幽默,兴趣广得惊人——色觉、土星环、气体分子运动都研究。生活低调,晚年在剑桥一手筹建了卡文迪许实验室。',
      journey:
        '他借助机械与流体力学模型来类比电磁场,一步步建立起方程组。1865 年发表时,理论过于超前,生前几乎无人能理解、更谈不上接受。1879 年他因胃癌去世,年仅 48 岁,没能等到 1887 年赫兹的验证。',
      contribution:
        '麦克斯韦方程组、电磁波的预言、气体分子运动论(麦克斯韦速度分布)、色彩理论(拍出第一张彩色照片)、以及土星环稳定性的证明。',
      controversy:
        '方程组与位移电流在当时被认为抽象、缺乏实验支撑;场论本身也未被广泛接受。他的工作,生前影响相当有限。',
      legacy:
        '伟大的理论往往超越它所处的时代;即便明知自己可能看不到成果,也值得坚持做下去。',
    },
    quote: {
      zh: '我们几乎无法回避这个推论:光,就是引起电与磁现象的同一介质的横向波动。',
      en: 'We can scarcely avoid the inference that light consists in the transverse undulations of the same medium which is the cause of electric and magnetic phenomena.',
    },
    theorySlug: 'maxwell-equations',
  },
  {
    slug: 'hertz',
    name: '海因里希·赫兹',
    life: '1857 – 1894',
    role: '证明了电磁波,却看不到它的用途',
    accent: '#FB923C',
    summary: '亲手验证了电磁波,却断言它「毫无用处」;36 岁英年早逝。',
    sections: {
      portrait:
        '德国物理学家,出身汉堡富裕家庭,是一位严谨内敛的实验家。健康一直欠佳,36 岁便因血管炎症去世,科学生命短暂得令人惋惜。',
      journey:
        '他在亥姆霍兹门下研究。1886–1889 年间,他用电火花谐振电路产生并接收了电磁波,测出其波长与速度(恰等于光速),还验证了反射、折射——完整地证实了麦克斯韦的理论。',
      contribution:
        '实验证实电磁波的存在;无意中发现了光电效应(后来由爱因斯坦解释);频率单位「赫兹(Hz)」即以他命名。',
      controversy:
        '他本人认为电磁波没有任何实际应用价值——这成了科学史上最著名的误判之一。可仅仅几年后,马可尼就把它变成了无线电。',
      legacy:
        '即使最伟大的科学家,也无法预见自己发现的未来;基础研究的价值,常常要等到发现者身后才真正显现。',
    },
    quote: {
      zh: '它没有任何用处……这只是一个证明麦克斯韦大师正确的实验。',
      en: 'It is of no use whatsoever... this is just an experiment that proves Maestro Maxwell was right.',
    },
    theorySlug: 'maxwell-equations',
  },
];

export const getScientist = (slug: string): Scientist | undefined =>
  SCIENTISTS.find((s) => s.slug === slug);

/** 被遗忘的先驱(design.md 5.4)*/
export interface ForgottenPioneer {
  name: string;
  life: string;
  contribution: string;
  fate: string;
}

export const FORGOTTEN_INTRO =
  '科学史是由胜利者书写的,但每一个胜利者的背后,都有无数被遗忘的铺路石。';

export const FORGOTTEN_PIONEERS: ForgottenPioneer[] = [
  {
    name: '斯蒂芬·格雷',
    life: 'c.1666 – 1736',
    contribution: '首次实现电的远距离传导,并区分了导体与绝缘体。',
    fate: '长期被皇家学会的权势人物排挤,生前贫困,靠慈善养老院度日,贡献长年被埋没。',
  },
  {
    name: '乔治·欧姆',
    life: '1789 – 1854',
    contribution: '提出欧姆定律,给出电压、电流、电阻的简洁关系。',
    fate: '发表后被德国学界斥为「纯粹的数学虚构」,压制近 10 年,一度愤而辞去教职,晚年才获认可。',
  },
  {
    name: '海因里希·楞次',
    life: '1804 – 1865',
    contribution: '提出楞次定律,判定感应电流的方向(反抗磁通变化)。',
    fate: '定律以他命名、天天被使用,其人却很少被人记起。',
  },
  {
    name: '毕奥 与 萨伐尔',
    life: '1820',
    contribution: '提出毕奥–萨伐尔定律,由电流分布计算其产生的磁场。',
    fate: '公式被一代代学生反复使用,两位作者本人却鲜被提及。',
  },
];
