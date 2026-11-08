'use client';

import Link from 'next/link';
import { type CSSProperties, useRef } from 'react';
import { CairnMark } from '@/components/logo';
import { gsap, MOTION_OK, useGSAP } from './gsap';

const pins = [
  { tag: '起点', title: '新人上手', desc: '第一周清单、账号权限、本地环境', href: '/docs/team/onboarding', x: '4%', y: '370px', start: true },
  { tag: '02', title: '团队约定', desc: '协作流程、Code Review、值班', href: '/docs/team', x: '24%', y: '200px' },
  { tag: '03', title: '工程指南', desc: '代码规范、部署流程、环境变量', href: '/docs/engineering', x: '42%', y: '380px' },
  { tag: '04', title: '产品与需求', desc: '需求文档、术语表、用户反馈', href: '/docs/product', x: '58%', y: '40px' },
  { tag: '05', title: '决策记录', desc: '为什么选这个方案，当时的取舍', href: '/docs/decisions', x: '74%', y: '290px' },
  { tag: '山顶', title: '事故复盘', desc: '出过的问题，不再出第二次', href: '/docs/decisions/postmortems', x: '79%', y: '40px', end: true },
];

const TRAIL =
  'M80 470 C 200 470 220 380 330 360 S 470 420 560 330 S 640 170 780 190 S 940 300 1010 200 S 1080 90 1130 90';

export function KnowledgeMap() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const reveal = root.current?.querySelector<SVGPathElement>('[data-trail-reveal]');
        if (reveal) {
          const length = reveal.getTotalLength();
          // 用实线遮罩逐段露出虚线山路，随滚动绘制
          gsap.fromTo(
            reveal,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
            },
          );
        }

        gsap.from('[data-pin]', {
          y: 16,
          opacity: 0,
          scale: 0.96,
          duration: 0.7,
          ease: 'back.out(1.6)',
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="cairn-topo relative mt-12 flex flex-col gap-3 overflow-hidden rounded-[20px] border border-white/8 bg-[#0b0c0e] p-6 md:block md:h-[560px] md:p-0"
    >
      <svg
        viewBox="0 0 1200 560"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 hidden size-full md:block"
      >
        <defs>
          <mask id="trail-mask">
            <path data-trail-reveal d={TRAIL} stroke="#fff" strokeWidth="6" fill="none" />
          </mask>
        </defs>
        <path
          d={TRAIL}
          mask="url(#trail-mask)"
          stroke="#828fff"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="4 7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {pins.map((pin) => (
        <div
          key={pin.title}
          data-pin
          className="md:absolute md:top-[var(--y)] md:left-[var(--x)] md:w-[210px]"
          style={{ '--x': pin.x, '--y': pin.y } as CSSProperties}
        >
          <div className={`mb-2.5 flex items-center gap-2 ${pin.end ? 'md:justify-end' : ''}`}>
            {pin.start ? (
              <span className="relative size-2.5">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-cairn-accent" />
                <span className="absolute inset-0 rounded-full bg-cairn-accent" />
              </span>
            ) : pin.end ? (
              <CairnMark className="size-4" />
            ) : (
              <span className="size-2.5 rounded-full border-2 border-cairn-text" />
            )}
            <span className="font-mono text-[11px] text-cairn-muted">{pin.tag}</span>
          </div>
          <Link
            href={pin.href}
            className="block rounded-xl border border-white/10 bg-cairn-card/92 px-4 py-3.5 transition-colors hover:border-white/20 hover:bg-cairn-raised"
          >
            <div className="text-[15px] font-semibold">{pin.title}</div>
            <div className="mt-1 text-xs leading-relaxed text-cairn-muted">{pin.desc}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
