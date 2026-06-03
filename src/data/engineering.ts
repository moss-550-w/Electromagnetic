/**
 * 从公式到世界:工程应用史 —— 数据层(design.md 4)。
 * 打破「科学归科学、工程归工程」的割裂,呈现「理论→发明→产业→生活」的完整链条。
 */

export interface EngineeringCase {
  slug: string;
  name: string;
  subtitle: string;
  /** 因果链条节点,页面渲染为 A → B → C → D */
  chain: string[];
  accent: string;
  /** 一句话核心(快速阅读层,金色高亮)*/
  summary: string;
  stages: {
    theory: string; // 理论源头
    breakthrough: string; // 技术突破
    industry: string; // 产业革命
    modern: string; // 现代应用
    future: string; // 未来展望
  };
  /** 科学启示 */
  insight: string;
  /** 关联理论页 slug */
  theorySlug?: string;
}

export const ENGINEERING_CASES: EngineeringCase[] = [
  {
    slug: 'generator-grid',
    name: '发电机与电网',
    subtitle: '一个小线圈,如何点亮整个文明',
    chain: ['法拉第电磁感应', '自激式发电机', '交流电网', '现代电力文明'],
    accent: '#FB923C',
    summary: '法拉第 1831 年的实验线圈,半个世纪后演化成了点亮全球的电网。',
    stages: {
      theory:
        '源头是 1831 年法拉第的电磁感应定律。他随后做出的「圆盘发电机」(单极发电机)虽能发电,却电压极低、效率很差,几乎没有实用价值——它只是一个原理验证,而非可用的机器。',
      breakthrough:
        '1866 年前后,西门子等人发明了「自激式发电机」(dynamo):用发电机自己产生的电流去给电磁铁励磁,取代了笨重微弱的永磁体。这一巧思让输出功率大幅跃升,大规模发电终于成为可能。',
      industry:
        '接着是著名的「电流战争」:爱迪生的直流(DC)系统 vs 特斯拉与威斯汀豪斯的交流(AC)系统。直流难以远距离输电(损耗巨大),而交流借助变压器可以先升压远送、再降压使用——变压器决定了胜负,交流电最终统一了电网。',
      modern:
        '今天,三峡水电站(装机约 22.5 GW,世界最大)、特高压输电线、跨区域互联电网,把电力输送到数十亿人手中。我们对「插座里永远有电」习以为常,却很少想起它的起点。',
      future:
        '前方是可控核聚变发电(如 ITER)、无线输电,以及整合大规模可再生能源的智能电网——让清洁电力更稳定、更普及。',
    },
    insight: '基础研究的价值,往往要在几十年后才会显现——法拉第 1831 年的小线圈,半个世纪后才点亮了城市。',
    theorySlug: 'faraday-induction',
  },
  {
    slug: 'wireless-comm',
    name: '无线电与通信',
    subtitle: '被断言「毫无用处」的电磁波,连接了整个星球',
    chain: ['麦克斯韦方程组', '赫兹实验', '无线电报', '广播 · 手机 · 5G'],
    accent: '#A78BFA',
    summary: '麦克斯韦笔下的方程,变成了你手机里的每一格信号。',
    stages: {
      theory:
        '源头是 1865 年麦克斯韦方程组对电磁波的预言:变化的电场与磁场可以相互激发、以光速自持传播。这在当时纯属理论推演,没有任何实验证据。',
      breakthrough:
        '1887 年赫兹用电火花实验产生并接收了电磁波,证实了预言——他却认为它「毫无用处」。几年后,马可尼把它工程化:1901 年实现跨大西洋无线电报,把电磁波变成了可商用的通信手段。',
      industry:
        '随后是无线电广播(1920 年代)、电视、二战中的雷达,再到移动通信从 1G 到 5G 的迭代。一个又一个产业,都建立在「让电磁波携带信息」这件事上。',
      modern:
        '今天,智能手机、Wi-Fi、卫星通信、GPS 定位、物联网……你身边几乎每一台联网设备,都在收发着麦克斯韦方程描述的同一种波。',
      future:
        '前方是 6G、太赫兹通信、低轨卫星互联网——把更高的带宽与更广的覆盖带到地球的每一个角落。',
    },
    insight: '赫兹断言「毫无用处」的电磁波,如今连接了整个星球——没有人能预见基础发现的全部未来。',
    theorySlug: 'maxwell-equations',
  },
];

export const getEngineeringCase = (slug: string): EngineeringCase | undefined =>
  ENGINEERING_CASES.find((c) => c.slug === slug);
