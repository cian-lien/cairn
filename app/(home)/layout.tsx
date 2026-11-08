import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        { text: '文档', url: '/docs', active: 'nested-url' },
        { text: '知识地图', url: '/#map' },
        { text: '特性', url: '/#features' },
        { text: '参与贡献', url: '/docs/team/contributing' },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
