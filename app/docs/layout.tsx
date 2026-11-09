import { source } from '@/lib/source';
import { getLayoutTabs } from 'fumadocs-ui/layouts/shared';
import { baseOptions } from '@/lib/layout.shared';
import { workspaces } from '@/lib/shared';
import { SidebarFooter } from '@/components/sidebar-footer';
import { HiddenSearch, SearchIconButton, SidebarSearch } from '@/components/sidebar-search';
import { AIDocsLayout } from '@/components/ai/docs-layout';

type WorkspaceKey = keyof typeof workspaces;

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const tree = source.getPageTree();

  // 工作区切换：content/docs 下每个 root 文件夹就是一个工作区，图标按工作区上色。
  // 在服务端算好再传给客户端布局（函数不能跨服务端/客户端传递）。
  const tabs = getLayoutTabs(tree, {
    transform: (option, node) => {
      if (!node.icon) return option;
      const key = option.url.split('/')[2] as WorkspaceKey;
      const color = workspaces[key]?.color;

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
  });

  return (
    <AIDocsLayout
      tree={tree}
      {...baseOptions()}
      tabs={tabs}
      // GitHub 链接放进自定义底部栏，不再单独占一个图标条
      githubUrl={undefined}
      // 搜索框放到工作区切换器下面：隐藏默认位置的搜索框，改由 banner 渲染
      slots={{ searchTrigger: { full: HiddenSearch, sm: SearchIconButton } }}
      sidebar={{ banner: <SidebarSearch />, footer: <SidebarFooter /> }}
    >
      {children}
    </AIDocsLayout>
  );
}
