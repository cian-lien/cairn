'use client';

import { Search } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { cn } from '@/lib/cn';

/**
 * 侧边栏的完整搜索框。
 * Fumadocs 默认把搜索框放在工作区切换器上面，这里把默认的隐藏掉，
 * 改用 sidebar.banner 渲染在切换器下面。
 */
export function SidebarSearch({ className }: { className?: string }) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  if (!enabled) return null;

  return (
    <button
      type="button"
      data-search-full=""
      onClick={() => setOpenSearch(true)}
      className={cn(
        'inline-flex w-full items-center gap-2 rounded-lg border bg-fd-secondary/50 p-1.5 ps-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
        className,
      )}
    >
      <Search className="size-4" />
      搜索文档
      <span className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd key={i} className="rounded-md border bg-fd-background px-1.5">
            {k.display}
          </kbd>
        ))}
      </span>
    </button>
  );
}

/** 移动端顶栏的搜索图标按钮 */
export function SearchIconButton({ className }: { className?: string }) {
  const { enabled, setOpenSearch } = useSearchContext();
  if (!enabled) return null;

  return (
    <button
      type="button"
      data-search=""
      aria-label="搜索文档"
      onClick={() => setOpenSearch(true)}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground [&_svg]:size-4.5',
        className,
      )}
    >
      <Search />
    </button>
  );
}

/** 占位：不渲染侧边栏顶部默认位置的搜索框 */
export function HiddenSearch() {
  return null;
}
