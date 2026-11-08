import type { SVGProps } from 'react';

/**
 * 积石标志：三块叠起的石头，最上面一块是刚放下的新文档（主色）
 * 24×24 网格，圆角 2.5，石间距 1
 */
export function CairnMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="16" width="18" height="5" rx="2.5" className="fill-fd-foreground" />
      <rect
        x="6"
        y="10"
        width="13"
        height="5"
        rx="2.5"
        className="fill-fd-foreground"
        fillOpacity={0.55}
      />
      <rect x="8.5" y="4" width="8" height="5" rx="2.5" className="fill-cairn-accent" />
    </svg>
  );
}

export function CairnLogo() {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
      <CairnMark className="size-5.5" />
      积石
      <span className="font-normal text-fd-muted-foreground">Cairn</span>
    </span>
  );
}
