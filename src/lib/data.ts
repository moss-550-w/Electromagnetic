/**
 * Content Collections 异步查询辅助。
 * 替代原 src/data/*.ts 的同步 getTheory/getScientist 等函数。
 * getCollection() 在构建时可用,会缓存并去重。
 */
import { getCollection } from 'astro:content';

/** 按 slug 查单个条目。data 层不含 slug 字段(由文件名定义),故用 entry.id 匹配。 */
export async function getTheory(slug: string) {
  const entries = await getCollection('theories');
  return entries.find((e) => e.id === slug) ?? null;
}

export async function getScientist(slug: string) {
  const entries = await getCollection('scientists');
  return entries.find((e) => e.id === slug) ?? null;
}

export async function getEngineeringCase(slug: string) {
  const entries = await getCollection('engineering');
  return entries.find((e) => e.id === slug) ?? null;
}

/** 获取全部条目(替代原数组 import) */
export async function getAllTheories() {
  return getCollection('theories');
}

export async function getAllScientists() {
  return getCollection('scientists');
}

export async function getAllEngineeringCases() {
  return getCollection('engineering');
}
