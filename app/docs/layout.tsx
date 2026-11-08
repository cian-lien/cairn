import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { workspaces } from '@/lib/shared';
import { SidebarFooter } from '@/components/sidebar-footer';
import { HiddenSearch, SearchIconButton, SidebarSearch } from '@/components/sidebar-search';

type WorkspaceKey = keyof typeof workspaces;

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      // GitHub 链接放进自定义底部栏，不再单独占一个图标条
      githubUrl={undefined}
      // 搜索框放到工作区切换器下面：隐藏默认位置的搜索框，改由 banner 渲染
      slots={{ searchTrigger: { full: HiddenSearch, sm: SearchIconButton } }}
      sidebar={{ banner: <SidebarSearch />, footer: <SidebarFooter /> }}
      // 工作区切换：content/docs 下每个 root 文件夹就是一个工作区
      tabs={{
        transform: (option, node) => {
          const key = option.url.split('/')[2] as WorkspaceKey;
          const color = workspaces[key]?.color;
          if (!node.icon) return option;

          return {
            ...option,
            icon: (
              <div
                className="size-full [&_svg]:size-full max-md:rounded-md max-md:border max-md:bg-fd-secondary max-md:p-1.5"
                style={{ color }}
              >
                {node.icon}
              </div>
            ),
          };
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
