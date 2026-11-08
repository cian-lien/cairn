import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { CairnLogo } from '@/components/logo';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <CairnLogo />,
      url: '/',
    },
    // 设计为暗色主题，隐藏明暗切换
    themeSwitch: { enabled: false },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
