import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { workspaces } from '@/lib/shared';

type WorkspaceKey = keyof typeof workspaces;

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
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
