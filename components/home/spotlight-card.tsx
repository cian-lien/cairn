'use client';

import type { ReactNode } from 'react';
import { motion, useMotionTemplate, useSpring } from 'motion/react';
import { cn } from '@/lib/cn';

/**
 * 特性卡片：鼠标移动时有一块跟随的柔光（Motion 弹簧插值）
 */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const x = useSpring(-400, { stiffness: 400, damping: 40 });
  const y = useSpring(-400, { stiffness: 400, damping: 40 });
  const background = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgb(130 143 255 / 0.10), transparent 70%)`;

  return (
    <article
      data-reveal
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      className={cn(
        'group relative overflow-hidden rounded-[18px] border border-white/8 bg-cairn-card p-7 transition-colors duration-300 hover:border-white/16',
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative flex h-full flex-col gap-6">{children}</div>
    </article>
  );
}
