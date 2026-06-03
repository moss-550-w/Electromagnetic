/**
 * 凡人科学家列传 —— 重点人物已迁移至 Content Collections(src/content/scientists/)。
 * 此文件保留「被遗忘的先驱」(不单独成页,仅列表展示)(design.md 5.4)。
 */

/** 被遗忘的先驱(design.md 5.4)*/
export interface ForgottenPioneer {
  name: string;
  life: string;
  contribution: string;
  fate: string;
  /** 关联理论页 slug(若该先驱有独立理论专题)*/
  theorySlug?: string;
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
    theorySlug: 'ohm-law',
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
    theorySlug: 'biot-savart',
  },
];
