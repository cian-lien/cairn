import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // 文档首页直接进入第一个工作区，这样侧边栏的工作区切换器始终可见
        source: '/docs',
        destination: '/docs/engineering',
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
