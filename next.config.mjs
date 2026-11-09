import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // 静态导出，产物在 out/，部署到 Cloudflare Pages
  output: 'export',
  reactStrictMode: true,
  images: {
    // 静态站没有图片优化服务
    unoptimized: true,
  },
  // 注意：静态导出下 redirects() 不生效，跳转规则写在 public/_redirects
};

export default withMDX(config);
