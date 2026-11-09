'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import SearchDialog from '@/components/search';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      // 设计为暗色主题
      theme={{ forcedTheme: 'dark', defaultTheme: 'dark' }}
    >
      {children}
    </RootProvider>
  );
}
