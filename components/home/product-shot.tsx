'use client';

import { useRef } from 'react';
import { Info, Search } from 'lucide-react';
import { gsap, MOTION_OK, useGSAP } from './gsap';

const sidebar = [
  { group: '新人上手', items: ['第一周清单', '本地开发环境'] },
  { group: '工程指南', items: ['代码规范', '部署流程', '环境变量'], active: '部署流程' },
  { group: '决策与复盘', items: ['技术决策记录', '事故复盘'] },
];

export function ProductShot() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // 随滚动把倾斜的截图摊平
        gsap.fromTo(
          '[data-shot]',
          { rotateX: 14, y: 40, transformPerspective: 2400, transformOrigin: '50% 0%' },
          {
            rotateX: 0,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 20%', scrub: true },
          },
        );
        // 顶边光线
        gsap.fromTo(
          '[data-beam]',
          { xPercent: -100 },
          { xPercent: 340, duration: 4.5, ease: 'sine.inOut', repeat: -1 },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative px-6 pt-12">
      <div className="relative mx-auto max-w-[1200px]">
        <div data-shot className="cairn-fade-bottom">
          <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-cairn-card shadow-[0_40px_120px_rgb(0_0_0/0.6)]">
            <div
              data-beam
              aria-hidden
              className="absolute -top-px left-0 h-px w-[30%] bg-[linear-gradient(90deg,transparent,#828fff,transparent)]"
            />
            <div className="flex h-11 items-center gap-4 border-b border-white/6 px-4">
              <div aria-hidden className="flex gap-[7px]">
                <span className="size-2.5 rounded-full bg-[#2a2c30]" />
                <span className="size-2.5 rounded-full bg-[#2a2c30]" />
                <span className="size-2.5 rounded-full bg-[#2a2c30]" />
              </div>
              <div className="flex flex-1 justify-center">
                <div className="rounded-md bg-white/[0.04] px-3.5 py-1 font-mono text-xs text-cairn-muted">
                  kb.cairn.team/docs/engineering/deploy
                </div>
              </div>
              <div className="w-11" />
            </div>
            <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)_200px]">
              <aside className="hidden flex-col gap-1 border-r border-white/6 px-3.5 py-5 text-[13px] md:flex">
                {sidebar.map((g) => (
                  <div key={g.group} className="flex flex-col gap-1">
                    <div className="px-2.5 pt-3.5 pb-1.5 text-[11px] font-medium tracking-[0.06em] text-cairn-muted first:pt-1.5">
                      {g.group}
                    </div>
                    {g.items.map((item) =>
                      item === g.active ? (
                        <div key={item} className="flex items-center gap-2 rounded-md bg-white/6 px-2.5 py-1.5">
                          <span className="size-1 rounded-full bg-cairn-accent" />
                          {item}
                        </div>
                      ) : (
                        <div key={item} className="px-2.5 py-1.5 text-cairn-soft">
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                ))}
              </aside>
              <div className="px-6 py-9 md:px-12">
                <div className="text-xs text-cairn-muted">工程指南 / 部署流程</div>
                <div className="mt-3 text-[30px] font-semibold tracking-[-0.02em]">部署流程</div>
                <div className="mt-3 flex items-center gap-2.5 text-xs text-cairn-muted">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#2a2c30] text-[10px] text-cairn-text">
                    B
                  </span>
                  维护人：成员 B · 3 天前复查
                </div>
                <div className="mt-5 flex gap-3 rounded-[10px] border border-[#828fff]/22 bg-[#828fff]/6 px-4 py-3.5 text-[13px] leading-[1.7] text-[#c9cdf5]">
                  <Info className="mt-[3px] size-4 flex-none text-cairn-accent" />
                  上线前请确认 main 分支 CI 全部通过，并在群里同步一次变更内容。
                </div>
                <div className="mt-5 rounded-[10px] border border-white/8 bg-cairn-code p-4 font-mono text-[13px] leading-[1.9]">
                  <div>
                    <span className="text-cairn-muted">$</span> pnpm <span className="text-cairn-mint">build</span>
                  </div>
                  <div>
                    <span className="text-cairn-muted">$</span> git <span className="text-cairn-mint">push</span>{' '}
                    <span className="text-cairn-amber">origin main</span>
                  </div>
                  <div className="text-cairn-muted"># 推送后由 Cloudflare Pages 自动构建并发布</div>
                </div>
              </div>
              <aside className="hidden flex-col gap-2.5 border-l border-white/6 px-5 py-9 text-xs md:flex">
                <div className="font-medium text-cairn-muted">本页目录</div>
                <div className="border-l border-cairn-accent pl-2.5">准备工作</div>
                <div className="border-l border-white/10 pl-2.5 text-cairn-muted">构建与推送</div>
                <div className="border-l border-white/10 pl-2.5 text-cairn-muted">回滚</div>
              </aside>
            </div>
          </div>
        </div>

        {/* 浮动的搜索与动态卡片 */}
        <div className="absolute top-[120px] -left-3 hidden w-[280px] animate-float rounded-xl border border-white/12 bg-[#111214]/92 p-3 shadow-[0_20px_60px_rgb(0_0_0/0.5)] backdrop-blur-md lg:block">
          <div className="flex h-[30px] items-center gap-2 rounded-[7px] border border-white/10 px-2.5 text-xs">
            <Search className="size-3 text-cairn-muted" />
            回滚
            <span className="h-[13px] w-px animate-caret bg-cairn-text" />
          </div>
          <div className="mt-2 rounded-md bg-white/6 px-2.5 py-[7px] text-xs">
            部署流程 › <span className="text-cairn-accent">回滚</span>
          </div>
          <div className="px-2.5 py-[7px] text-xs text-cairn-muted">事故复盘 › 数据库回滚</div>
        </div>
        <div className="absolute top-[60px] -right-3 hidden animate-float items-center gap-2.5 rounded-xl border border-white/12 bg-[#111214]/92 px-3.5 py-2.5 text-xs shadow-[0_20px_60px_rgb(0_0_0/0.5)] backdrop-blur-md [animation-delay:1.2s] lg:flex">
          <span className="flex size-[26px] items-center justify-center rounded-full bg-[#3a3d42] text-[11px]">A</span>
          <span className="flex flex-col gap-0.5">
            <span>成员 A 放下了一块石头</span>
            <span className="text-cairn-muted">新增《环境变量》· 刚刚</span>
          </span>
        </div>
      </div>
    </section>
  );
}
