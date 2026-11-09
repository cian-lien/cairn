import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

// 静态搜索：构建时生成索引文件，在浏览器里搜索。
// 不指定 language，使用默认的多语言分词（支持中文）。
export const { staticGET: GET } = createFromSource(source);
