/**
 * Astro Content Collections 配置。
 * 「数据集合」—— 条目以 JSON 文件存储于子目录，Zod schema 构建时校验。
 * 迁移自 src/data/theories.ts / scientists.ts / engineering.ts。
 */
import { defineCollection, z } from 'astro:content';

// ─── 理论 ───

const theoryFormula = z.object({
  tex: z.string(),
  caption: z.string().optional(),
  display: z.boolean().optional(),
});

const theorySections = z.object({
  prelude: z.string(),
  breakthrough: z.string(),
  core: z.string(),
  controversy: z.string(),
  victory: z.string(),
  legacy: z.string(),
  insight: z.string(),
});

const theories = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    year: z.string(),
    people: z.array(z.string()),
    accent: z.string(),
    summary: z.string(),
    formulas: z.array(theoryFormula),
    sections: theorySections,
  }),
});

// ─── 科学家 ───

const scientistSections = z.object({
  portrait: z.string(),
  journey: z.string(),
  contribution: z.string(),
  controversy: z.string(),
  legacy: z.string(),
});

const scientists = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    life: z.string(),
    role: z.string(),
    accent: z.string(),
    summary: z.string(),
    sections: scientistSections,
    quote: z.object({ zh: z.string(), en: z.string().optional() }),
    theorySlug: z.string().optional(),
  }),
});

// ─── 工程案例 ───

const engineeringStages = z.object({
  theory: z.string(),
  breakthrough: z.string(),
  industry: z.string(),
  modern: z.string(),
  future: z.string(),
});

const engineering = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    chain: z.array(z.string()),
    accent: z.string(),
    summary: z.string(),
    stages: engineeringStages,
    insight: z.string(),
    theorySlug: z.string().optional(),
  }),
});

export const collections = { theories, scientists, engineering };
