import Link from 'next/link';
import {
  Check,
  Clock,
  FileText,
  Folder,
  MessageCircle,
  Search,
  TriangleAlert,
  User,
} from 'lucide-react';
import { CairnLogo, CairnMark } from '@/components/logo';
import { Hero } from '@/components/home/hero';
import { ProductShot } from '@/components/home/product-shot';
import { Reveal } from '@/components/home/reveal';
import { KnowledgeMap } from '@/components/home/knowledge-map';
import { SpotlightCard } from '@/components/home/spotlight-card';
import { ContributionGraph } from '@/components/home/contribution-graph';
import { gitConfig } from '@/lib/shared';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[13px] font-medium text-cairn-accent">{children}</div>;
}

function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-3.5 text-[clamp(30px,4vw,48px)] leading-[1.15] font-semibold tracking-[-0.03em] ${className}`}
    >
      {children}
    </h2>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-cairn-bg text-cairn-text">
      <Hero />
      <ProductShot />

      {/* 为什么需要积石 */}
      <Reveal className="px-6 pt-30">
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal className="max-w-[640px]">
            <Eyebrow>为什么需要积石</Eyebrow>
            <SectionTitle>
              团队的经验，
              <br />
              每天都在悄悄流失
            </SectionTitle>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <article data-reveal className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-cairn-card p-6">
              <div className="flex h-[170px] flex-col justify-center gap-2.5 text-[13px] leading-normal">
                <div className="max-w-[80%] self-start rounded-[12px_12px_12px_3px] bg-white/6 px-3.5 py-2 text-cairn-soft">
                  测试环境的变量在哪配来着？
                </div>
                <div className="max-w-[80%] self-end rounded-[12px_12px_3px_12px] bg-white/10 px-3.5 py-2">
                  我上个月发过，往上翻翻
                </div>
                <div className="self-start rounded-[12px_12px_12px_3px] bg-white/6 px-3.5 py-2 text-cairn-muted">
                  …翻了 400 条没找到
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[13px] text-cairn-muted">
                  <MessageCircle className="size-[15px]" />
                  聊天记录
                </div>
                <h3 className="mt-2.5 text-lg font-semibold">一周后就被刷屏淹没</h3>
              </div>
            </article>

            <article data-reveal className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-cairn-card p-6">
              <div className="flex h-[170px] flex-col justify-center gap-1.5 text-[13px]">
                {['部署说明-最终版.docx', '部署说明-最终版v2(1).docx', '部署说明-真的最终版.docx'].map((name) => (
                  <div key={name} className="flex items-center gap-2.5 rounded-lg bg-white/[0.04] px-2.5 py-2 text-cairn-soft">
                    <FileText className="size-3.5" />
                    {name}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2 text-[13px] text-cairn-muted">
                  <Folder className="size-[15px]" />
                  散落的云文档
                </div>
                <h3 className="mt-2.5 text-lg font-semibold">没人知道哪份是最新的</h3>
              </div>
            </article>

            <article data-reveal className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-cairn-card p-6">
              <div className="flex h-[170px] items-center justify-center">
                <div className="flex w-[220px] flex-col gap-3 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-[34px] items-center justify-center rounded-full bg-[#2a2c30] text-[13px]">C</span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[13px]">成员 C</span>
                      <span className="text-[11px] text-cairn-muted">唯一会配服务器的人</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-cairn-amber">
                    <Clock className="size-[13px]" />
                    下个月休假两周
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[13px] text-cairn-muted">
                  <User className="size-[15px]" />
                  某个人的脑子里
                </div>
                <h3 className="mt-2.5 text-lg font-semibold">人不在，经验就断了</h3>
              </div>
            </article>
          </div>

          <div data-reveal className="mt-10 flex flex-col items-center gap-4">
            <span aria-hidden className="h-12 w-px border-l border-dashed border-cairn-accent/60" />
            <div className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-cairn-raised px-5 py-3 text-[15px]">
              <CairnMark className="size-5" />
              全部收进积石：一个地方、一份最新、人人可查
            </div>
          </div>
        </div>
      </Reveal>

      {/* 知识地图 */}
      <Reveal id="map" className="scroll-mt-20 px-6 pt-35">
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>知识地图</Eyebrow>
              <SectionTitle>
                按团队的工作方式
                <br />
                组织每一块石头
              </SectionTitle>
            </div>
            <p className="max-w-[380px] text-[15px] leading-[1.75] text-cairn-muted">
              从入职第一天到线上排障，每个阶段都有对应的路标。新人沿着走，老人随时查。
            </p>
          </div>
          <KnowledgeMap />
        </div>
      </Reveal>

      {/* 特性 Bento */}
      <Reveal id="features" className="scroll-mt-20 px-6 pt-35">
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal className="text-center">
            <Eyebrow>特性</Eyebrow>
            <SectionTitle>写的人省心，查的人省时</SectionTitle>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-6">
            <SpotlightCard className="md:col-span-4">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.01em]">⌘K，三秒找到答案</h3>
                <p className="mt-2 max-w-[460px] text-sm leading-[1.7] text-cairn-muted">
                  边打字边出结果，直接跳到具体章节。中文开箱即用，也能按工作区筛选。
                </p>
              </div>
              <div className="min-h-[220px] flex-1 overflow-hidden rounded-[14px] border border-white/10 bg-cairn-raised">
                <div className="flex h-12 items-center gap-2.5 border-b border-white/7 px-4 text-[15px]">
                  <Search className="size-4 text-cairn-muted" />
                  怎么申请服务器权限
                  <span className="h-4 w-px animate-caret bg-cairn-text" />
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-3 rounded-[9px] bg-white/6 px-3 py-2.5">
                    <span className="flex size-7 items-center justify-center rounded-[7px] border border-white/14 text-cairn-accent">
                      <FileText className="size-3.5" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm">
                        账号与<span className="text-cairn-accent">权限申请</span>
                      </span>
                      <span className="text-xs text-cairn-muted">新人上手 · 找谁开通、需要多久</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <span className="flex size-7 items-center justify-center rounded-[7px] border border-white/8 text-cairn-muted">
                      <FileText className="size-3.5" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm text-cairn-soft">部署流程 › 服务器访问</span>
                      <span className="text-xs text-cairn-muted">工程手册 · SSH 与跳板机</span>
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-2">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.01em]">新人第一周</h3>
                <p className="mt-2 text-sm leading-[1.7] text-cairn-muted">一份清单走完入职，不用逮着人问。</p>
              </div>
              <ul className="flex flex-col gap-2.5 text-[13px]">
                {[
                  { t: '开通 Git 与服务器权限', done: true },
                  { t: '跑通本地开发环境', done: true },
                  { t: '读完团队约定', current: true },
                  { t: '提交第一个 PR' },
                  { t: '给知识库补一篇文档' },
                ].map((item) => (
                  <li
                    key={item.t}
                    className={`flex items-center gap-2.5 ${item.done ? 'text-cairn-muted line-through' : item.current ? '' : 'text-cairn-soft'}`}
                  >
                    {item.done ? (
                      <span className="flex size-[18px] items-center justify-center rounded-[5px] bg-cairn-accent">
                        <Check className="size-3 text-cairn-bg" strokeWidth={3} />
                      </span>
                    ) : (
                      <span className={`size-[18px] rounded-[5px] border ${item.current ? 'border-white/30' : 'border-white/20'}`} />
                    )}
                    {item.t}
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-2">
              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { id: 'ADR-012', t: '选用 Fumadocs', s: '已采纳', on: true },
                  { id: 'ADR-011', t: '统一用 pnpm', s: '已采纳' },
                  { id: 'ADR-010', t: '自建对象存储', s: '已废弃', muted: true },
                ].map((a) => (
                  <div key={a.id} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${a.on ? 'bg-white/5' : ''}`}>
                    <span className="font-mono text-cairn-muted">{a.id}</span>
                    <span className={`flex-1 ${a.on ? '' : 'text-cairn-soft'}`}>{a.t}</span>
                    <span className={a.muted ? 'text-cairn-muted' : 'text-cairn-mint'}>{a.s}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold">决策有迹可循</h3>
                <p className="mt-2 text-sm leading-[1.7] text-cairn-muted">半年后还能查到「当时为什么这么做」。</p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-2">
              <div className="flex flex-col gap-2">
                <div className="rounded-lg border border-[#828fff]/22 bg-[#828fff]/6 px-3 py-2.5 text-xs text-[#c9cdf5]">
                  提示框 Callout
                </div>
                <div className="flex gap-1.5">
                  <span className="flex-1 rounded-lg border border-white/8 px-2.5 py-2 text-xs text-cairn-soft">步骤 Steps</span>
                  <span className="flex-1 rounded-lg border border-white/8 px-2.5 py-2 text-xs text-cairn-soft">标签页 Tabs</span>
                </div>
                <div className="rounded-lg border border-white/6 bg-cairn-code px-2.5 py-2 font-mono text-xs text-cairn-mint">
                  pnpm dev
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">MDX 组件随手用</h3>
                <p className="mt-2 text-sm leading-[1.7] text-cairn-muted">Markdown 的简单，加上组件的表达力。</p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-2">
              <div className="flex flex-col gap-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-cairn-soft">
                  <Check className="size-3.5 text-cairn-mint" strokeWidth={2.4} />
                  维护人：成员 B
                </div>
                <div className="flex items-center gap-2.5 text-cairn-soft">
                  <Check className="size-3.5 text-cairn-mint" strokeWidth={2.4} />
                  字段校验通过
                </div>
                <div className="flex items-center gap-2.5 rounded-lg border border-cairn-amber/25 bg-cairn-amber/6 px-2.5 py-2 text-[#f3d9b1]">
                  <TriangleAlert className="size-3.5 text-cairn-amber" />
                  90 天未复查，已提醒维护人
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">文档不会悄悄过期</h3>
                <p className="mt-2 text-sm leading-[1.7] text-cairn-muted">每篇都有维护人，久未更新会被提醒。</p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-3">
              <div className="flex flex-col gap-2.5 text-[13px] leading-relaxed">
                <div className="max-w-[75%] self-end rounded-[12px_12px_3px_12px] bg-white/8 px-3.5 py-2">
                  线上出问题了，怎么回滚？
                </div>
                <div className="max-w-[85%] animate-float rounded-[12px_12px_12px_3px] border border-white/10 px-3.5 py-2.5 text-cairn-soft">
                  在 Cloudflare Pages 的部署列表里，对上一次正常的部署选择「回滚到此部署」。
                  <span className="mt-1.5 block text-xs text-cairn-accent">出处：部署流程 › 回滚</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">问知识库</h3>
                  <span className="rounded-full border border-white/12 px-2 py-0.5 font-mono text-[11px] text-cairn-muted">Ctrl /</span>
                </div>
                <p className="mt-2 text-sm leading-[1.7] text-cairn-muted">接入大模型，只根据团队文档回答，并附上出处。</p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-3">
              <div className="overflow-hidden rounded-[10px] border border-white/8 font-mono text-xs leading-[1.9]">
                <div className="border-b border-white/6 bg-cairn-card px-3 py-1.5 text-cairn-muted">engineering/env.mdx</div>
                <div className="bg-[#ef6b6b]/8 px-3 text-[#f2a7a7]">- 测试环境地址见群公告</div>
                <div className="bg-cairn-mint/8 px-3 text-cairn-mint">+ 测试环境地址：[TEST_URL]</div>
                <div className="bg-cairn-mint/8 px-3 text-cairn-mint">+ 变量清单见下方表格</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">每次修改都有记录</h3>
                <p className="mt-2 text-sm leading-[1.7] text-cairn-muted">
                  文档和代码放在同一个仓库，走 PR 和 Review，谁改了什么一目了然。
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </Reveal>

      {/* 参与贡献 */}
      <Reveal id="contribute" className="scroll-mt-20 px-6 pt-35">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-14">
          <div data-reveal className="min-w-0 flex-[1_1_380px]">
            <Eyebrow>参与贡献</Eyebrow>
            <SectionTitle>
              放一块石头，
              <br />
              只需要三步
            </SectionTitle>
            <ol className="mt-9 flex flex-col">
              {[
                { n: '01', t: '写', d: '在 content/docs 下新建 .mdx，用你熟悉的编辑器。' },
                { n: '02', t: '提交', d: '发起 PR，队友在预览链接里看效果、留评论。' },
                { n: '03', t: '上线', d: '合并后自动构建，几分钟内全员可见。' },
              ].map((s, i, arr) => (
                <li key={s.n} className={`relative flex gap-[18px] ${i < arr.length - 1 ? 'pb-7' : ''}`}>
                  <span
                    className={`relative z-[1] flex size-9 flex-none items-center justify-center rounded-[10px] border bg-cairn-card font-mono text-[13px] ${i === 0 ? 'border-cairn-accent text-cairn-accent' : 'border-white/18 text-cairn-soft'}`}
                  >
                    {s.n}
                  </span>
                  {i < arr.length - 1 && (
                    <span aria-hidden className="absolute top-9 bottom-0 left-[18px] w-px bg-white/10" />
                  )}
                  <span>
                    <span className="block text-base font-semibold">{s.t}</span>
                    <span className="mt-1 block text-sm leading-[1.7] text-cairn-muted">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex min-w-0 flex-[1.2_1_480px] flex-col gap-4">
            <ContributionGraph />
            <div data-reveal className="rounded-[18px] border border-white/8 bg-cairn-card p-2">
              {[
                { a: 'A', who: '成员 A', what: '新增了《环境变量》', when: '刚刚' },
                { a: 'B', who: '成员 B', what: '复查了《部署流程》', when: '3 天前' },
                { a: 'C', who: '成员 C', what: '写了一篇事故复盘', when: '上周' },
              ].map((e, i) => (
                <div
                  key={e.a}
                  className={`flex items-center gap-3 px-3.5 py-3 text-[13px] ${i > 0 ? 'border-t border-white/5' : ''}`}
                >
                  <span className="flex size-7 flex-none items-center justify-center rounded-full bg-[#2a2c30] text-[11px]">
                    {e.a}
                  </span>
                  <span className="flex-1 text-cairn-soft">
                    <span className="text-cairn-text">{e.who}</span> {e.what}
                  </span>
                  <span className="text-xs text-cairn-muted">{e.when}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 结尾 */}
      <Reveal className="px-6 pt-35">
        <div
          data-reveal
          className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-white/8 bg-[#0b0c0e] px-8 pt-22 pb-60 text-center"
        >
          <div aria-hidden className="cairn-ridge absolute inset-x-0 bottom-0 h-[280px]" />
          <div aria-hidden className="absolute bottom-[150px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-[3px]">
            <div className="h-3 w-[26px] rounded-md bg-cairn-accent shadow-[0_0_30px_2px_rgb(130_143_255/0.4)]" />
            <div className="ml-1.5 h-3 w-10 rounded-md bg-[#d5d8de]" />
            <div className="h-[13px] w-[54px] rounded-md bg-cairn-muted" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-[720px] text-[clamp(30px,4.4vw,52px)] leading-[1.15] font-semibold tracking-[-0.035em]">
              今天，放下你的第一块石头
            </h2>
            <p className="mx-auto mt-5 max-w-[460px] text-base leading-[1.7] text-cairn-muted">
              从你最常被问到的那个问题开始写。
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/docs"
                className="inline-flex h-11 items-center rounded-[10px] bg-[#e6e6e6] px-5 text-[15px] font-medium text-cairn-bg transition-colors hover:bg-white"
              >
                进入知识库
              </Link>
              <a
                href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
                className="inline-flex h-11 items-center rounded-[10px] border border-white/12 bg-cairn-bg/60 px-5 text-[15px] font-medium transition-colors hover:border-white/20 hover:bg-white/[0.08]"
              >
                在 GitHub 上编辑
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <footer className="mt-25 border-t border-white/6">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 px-6 pt-10 pb-14 text-[13px] text-cairn-muted">
          <div className="flex items-center gap-2 text-cairn-text">
            <CairnLogo />
            <span className="text-cairn-muted">· 团队知识库</span>
          </div>
          <nav aria-label="页脚" className="flex flex-wrap gap-6">
            <Link href="/docs" className="transition-colors hover:text-cairn-text">
              文档
            </Link>
            <Link href="/#map" className="transition-colors hover:text-cairn-text">
              知识地图
            </Link>
            <a href="https://www.fumadocs.dev/" className="transition-colors hover:text-cairn-text">
              基于 Fumadocs 构建
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
