'use client';

import { type ReactNode, useRef } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from './gsap';

/**
 * 包裹一个区块，内部带 data-reveal 的元素在滚动进入视口时依次淡入上浮
 */
export function Reveal({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
        if (!items.length) return;

        gsap.set(items, { opacity: 0, y: 24 });
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'expo.out',
              stagger: 0.08,
              overwrite: true,
            }),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id={id} className={className}>
      {children}
    </section>
  );
}
