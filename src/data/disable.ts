/**
 * 「如果没有电磁学」互动模拟器 —— 数据层(design.md 4.3)。
 * 禁用一个电磁学发现,推演世界会退回什么样子。脑洞基于真实历史逻辑(CLAUDE.md 八)。
 */

export interface DisableScenario {
  id: string;
  /** 按钮文字 */
  label: string;
  /** 被禁用的发现 */
  target: string;
  /** 退回到的时代 */
  era: string;
  accent: string;
  /** 后果总述 */
  consequence: string;
  /** 失去的具体事物 */
  losses: string[];
}

export const DISABLE_INTRO = '选择「禁用」一个电磁学发现,看看世界会变成什么样。';

export const DISABLE_SCENARIOS: DisableScenario[] = [
  {
    id: 'induction',
    label: '禁用电磁感应',
    target: '电磁感应',
    era: '蒸汽时代',
    accent: '#FB923C',
    consequence:
      '没有电磁感应,就没有发电机,也就没有电网。人类无法大规模地把机械能转化为电能,文明被钉死在煤炭与蒸汽机的时代——工厂靠蒸汽驱动,夜晚靠油灯照明。',
    losses: ['电灯', '一切家用电器', '电动机', '电网与稳定供电', '电梯与现代高楼'],
  },
  {
    id: 'em-wave',
    label: '禁用电磁波',
    target: '电磁波',
    era: '有线电报时代',
    accent: '#A78BFA',
    consequence:
      '没有电磁波,就没有任何无线通信。信息只能靠有线电缆或人力传递,海洋与天空成为无法逾越的信息鸿沟。没有广播把声音送进千家万户,没有手机让人随时相连。',
    losses: ['无线电与广播', '电视', '手机与移动网络', 'Wi-Fi', 'GPS 与卫星通信', '雷达'],
  },
  {
    id: 'maxwell',
    label: '禁用麦克斯韦方程组',
    target: '麦克斯韦方程组',
    era: '前电子时代',
    accent: '#EF4444',
    consequence:
      '没有麦克斯韦方程组,整个电与磁的统一理论崩塌。现代电子工程失去根基——电路、天线、半导体器件的设计都无从谈起。几乎所有现代电子设备,都将不复存在。',
    losses: ['计算机与芯片', '一切电子设备', '现代通信', '雷达与导航', '互联网'],
  },
];
