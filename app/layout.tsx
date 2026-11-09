import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google';
import { appDescription, appName } from '@/lib/shared';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSC = Noto_Sans_SC({
  weight: ['400', '500', '600'],
  variable: '--font-noto-sc',
  // 中文字体分片很多，不预加载，按需下载
  preload: false,
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: {
    template: `%s · ${appName}`,
    default: appName,
  },
  description: appDescription,
  icons: { icon: '/favicon.svg' },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${notoSC.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* 标记 JS 可用，配合 global.css 在 GSAP 接管前隐藏入场元素 */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-fd-background font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
