'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, ChevronRight, FileText, GitBranch, Search } from 'lucide-react';
import { gsap, MOTION_OK, MOTION_REDUCE, SplitText, useGSAP } from './gsap';

const waypoints = [
  { label: '部署流程 · 刚刚更新', dot: 'bg-cairn-accent', className: 'left-[30px] top-[150px]' },
  { label: 'ADR-012 选用 Fumadocs', dot: 'bg-cairn-amber', className: 'right-0 top-[200px]' },
  { label: '新人上手清单', dot: 'bg-cairn-mint', className: 'left-[6px] top-[404px]' },
];

// 从下往上：越往上越小，略微错开，像手工堆起来的
const stones = [
  { w: 70, h: 32, offset: -10, className: 'bg-cairn-accent shadow-[0_0_60px_4px_rgb(130_143_255/0.4)]' },
  { w: 108, h: 32, offset: 12, className: 'bg-[#d5d8de]' },
  { w: 144, h: 34, offset: -6, className: 'bg-cairn-muted' },
  { w: 184, h: 34, offset: 8, className: 'border border-white/8 bg-[#4b4f57]' },
  { w: 230, h: 36, offset: 0, className: 'border border-white/8 bg-[#26282d]' },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.set('[data-intro]', { visibility: 'visible' });

        const split = new SplitText('[data-hero-title]', { type: 'chars' });
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.from('[data-hero-badge]', { y: 12, opacity: 0, duration: 0.8 })
          .from(
            split.chars,
            { yPercent: 60, opacity: 0, filter: 'blur(8px)', stagger: 0.03, duration: 1 },
            '-=0.5',
          )
          .from('[data-hero-sub]', { y: 16, opacity: 0, filter: 'blur(6px)', duration: 0.9 }, '-=0.7')
          .from('[data-hero-cta] > *', { y: 12, opacity: 0, stagger: 0.08, duration: 0.8 }, '-=0.6');

        // 石头从下往上依次落下
        gsap.from('[data-stone]', {
          y: -60,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(2.2)',
          stagger: { each: 0.18, from: 'end' },
          delay: 0.3,
        });

        // 山路描边
        const trail = root.current?.querySelector<SVGPathElement>('[data-trail]');
        if (trail) {
          const length = trail.getTotalLength();
          gsap.fromTo(
            trail,
            { strokeDasharray: length, strokeDashoffset: length },
            { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', delay: 0.6 },
          );
        }

        gsap.from('[data-waypoint]', {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.8)',
          stagger: 0.15,
          delay: 1.4,
        });

        return () => split.revert();
      });

      mm.add(MOTION_REDUCE, () => {
        gsap.set('[data-intro]', { visibility: 'visible' });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative px-6 pt-16 md:pt-20">
      <div aria-hidden className="cairn-grid pointer-events-none absolute inset-x-0 top-0 h-[760px]" />
      <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-10">
        <div className="min-w-0 flex-[1_1_500px]">
          <Link
            href="#map"
            data-intro
            data-hero-badge
            className="inline-flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pr-3.5 pl-2.5 text-[13px] text-cairn-soft transition-colors hover:border-white/20 hover:bg-white/[0.07]"
          >
            <span className="size-1.5 animate-pulse-soft rounded-full bg-cairn-accent" />
            团队知识库 · 基于 Fumadocs
            <ChevronRight className="size-3" />
          </Link>

          <h1
            data-intro
            data-hero-title
            className="mt-7 text-[clamp(40px,5.4vw,70px)] leading-[1.1] font-semibold tracking-[-0.035em]"
          >
            每个人放下一块石头，
            <br />
            <span className="text-cairn-muted">后来的人就不会迷路</span>
          </h1>

          <p data-intro data-hero-sub className="mt-6 max-w-[500px] text-lg leading-[1.75] text-cairn-muted">
            踩过的坑、做过的决定、跑通的流程，写下来，就是后来人的路标。积石把团队的经验收在一个能搜、能找、不会过期的地方。
          </p>

          <div data-intro data-hero-cta className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-[#e6e6e6] px-5 text-[15px] font-medium text-cairn-bg transition-colors hover:bg-white"
            >
              进入知识库
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/docs/team/contributing"
              className="inline-flex h-11 items-center rounded-[10px] border border-white/12 bg-white/[0.03] px-5 text-[15px] font-medium transition-colors hover:border-white/20 hover:bg-white/[0.08]"
            >
              写第一篇文档
            </Link>
          </div>

          <ul data-intro className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-[13px] text-cairn-muted">
            <li className="flex items-center gap-2">
              <Search className="size-[15px]" />
              ⌘K 全文搜索
            </li>
            <li className="flex items-center gap-2">
              <FileText className="size-[15px]" />
              Markdown 写作
            </li>
            <li className="flex items-center gap-2">
              <GitBranch className="size-[15px]" />
              Git 版本管理
            </li>
          </ul>
        </div>

        {/* 插画：等高线 + 山路 + 石堆 */}
        <div className="relative flex h-[380px] min-w-0 flex-[1_1_460px] justify-center sm:h-[540px]">
          <div className="relative size-[540px] flex-none origin-top scale-[0.7] sm:scale-100">
            <div aria-hidden className="cairn-topo cairn-fade-edge absolute -inset-[60px]" />
            <svg viewBox="0 0 540 540" aria-hidden className="absolute inset-0 size-[540px]">
              <path
                d="M0 440 C 90 420 130 470 210 455 S 330 400 420 430 S 520 470 540 450"
                stroke="rgb(255 255 255 / 0.14)"
                strokeWidth="1"
                fill="none"
              />
              <path
                data-trail
                d="M20 528 C 80 520 70 488 130 482 S 220 500 268 446"
                stroke="#828fff"
                strokeOpacity="0.7"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <div aria-hidden className="absolute top-[262px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-[5px]">
              {stones.map((s, i) => (
                <div
                  key={i}
                  data-intro
                  data-stone
                  className={`rounded-full ${s.className}`}
                  style={{ width: s.w, height: s.h, marginLeft: s.offset }}
                />
              ))}
            </div>

            {waypoints.map((w) => (
              <div
                key={w.label}
                data-intro
                data-waypoint
                className={`absolute ${w.className}`}
              >
                <div className="flex animate-float items-center gap-2 rounded-lg border border-white/10 bg-[#111214]/90 px-3 py-[7px] text-xs text-cairn-soft backdrop-blur-md">
                  <span className={`size-1.5 rounded-full ${w.dot}`} />
                  {w.label}
                </div>
              </div>
            ))}

            <p className="absolute top-[476px] left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.08em] text-cairn-muted">
              ↑ 最新放下的一块
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
