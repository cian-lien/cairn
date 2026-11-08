import { createGetUrl } from 'fumadocs-core/source';

export const appName = '积石 Cairn';
export const appDescription = '每个人放下一块石头，后来的人就不会迷路。团队知识库，基于 Fumadocs 构建。';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// 推送到 GitHub 后，改成你们真实的仓库信息
export const gitConfig = {
  user: 'cian-lien',
  repo: 'cairn',
  branch: 'main',
};

/**
 * 工作区（Fumadocs 的 root folder / sidebar tabs）
 * key 对应 content/docs 下的文件夹名，color 用于侧边栏切换器的图标颜色
 */
export const workspaces = {
  engineering: { color: '#F6C177' },
  product: { color: '#82AAFF' },
  team: { color: '#C792EA' },
  decisions: { color: '#9AE6B4' },
} as const;

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
