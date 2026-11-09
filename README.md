# 积石 Cairn

> 每个人放下一块石头，后来的人就不会迷路。

团队知识库，基于 [Fumadocs](https://fumadocs.dev)（Next.js + Fumadocs MDX）构建，项目骨架来自官方脚手架 `create-fumadocs-app` 的 Next.js 模板。

## 本地开发

```bash
corepack enable   # 首次使用 pnpm 时
pnpm install
pnpm dev
```

打开 http://localhost:3000 。

## 目录结构

| 路径                          | 说明                                               |
| ----------------------------- | -------------------------------------------------- |
| `content/docs/`               | 全部文档，每个一级文件夹是一个工作区               |
| `app/(home)/`                 | 首页                                               |
| `app/docs/`                   | 文档布局与页面                                     |
| `app/api/search/route.ts`     | 静态搜索索引（构建时生成，浏览器端搜索）           |
| `functions/api/chat.ts`       | AI 问答接口（Cloudflare Pages Function）           |
| `components/ai/`              | Ask AI 聊天面板（`@fumadocs/ai-chat`）             |
| `public/_redirects`           | Cloudflare Pages 跳转规则                          |
| `components/home/`            | 首页区块与动效（GSAP、Motion）                     |
| `components/logo.tsx`         | 积石标志                                           |
| `lib/source.ts`               | Fumadocs 内容源                                    |
| `lib/shared.ts`               | 站点名、GitHub 仓库、工作区颜色                    |
| `public/topo.svg`、`ridge.svg` | 首页的等高线和山脊素材                             |

## 工作区

侧边栏顶部可以切换工作区，对应 `content/docs` 下带 `"root": true` 的文件夹：

| 文件夹         | 工作区     | 内容                     |
| -------------- | ---------- | ------------------------ |
| `engineering/` | 工程手册   | 代码、部署与排障         |
| `product/`     | 产品空间   | 需求、术语与用户反馈     |
| `team/`        | 团队约定   | 协作、值班与新人上手     |
| `decisions/`   | 决策与复盘 | 技术决策记录与事故复盘   |

新增工作区：建文件夹 → 写 `meta.json`（`"root": true`、`title`、`description`、`icon`）→ 把文件夹名加进 `content/docs/meta.json` → 在 `lib/shared.ts` 里给它配一个图标颜色。

## 动效

- 首页标题：GSAP SplitText 逐字上浮 + 去模糊
- 石堆、山路、路标：GSAP 时间线依次入场
- 产品截图：ScrollTrigger 随滚动从倾斜摊平
- 知识地图：山路随滚动绘制
- 特性卡片：ScrollTrigger.batch 依次淡入，Motion 弹簧跟随鼠标光斑
- 系统开启「减少动态效果」时，所有位移动画自动关闭

## 部署：Cloudflare Pages + Access

- 页面静态导出到 `out/`，部署在 Cloudflare Pages（构建命令 `pnpm build`，输出目录 `out`，`NODE_VERSION=22`）
- AI 问答：`functions/api/chat.ts` 是 Pages Function，模型通过环境变量配置：

  | 变量           | 示例                          |
  | -------------- | ----------------------------- |
  | `LLM_BASE_URL` | `https://api.deepseek.com/v1` |
  | `LLM_API_KEY`  | `sk-...`（设为 Secret）       |
  | `LLM_MODEL`    | `deepseek-chat`               |

- 访问控制：Cloudflare Access + 邮箱验证码，只放行白名单邮箱

完整步骤见站内「工程手册 › 部署流程」（`content/docs/engineering/deploy.mdx`）。

## 本地调试

```bash
pnpm dev                          # 只跑页面
cp .dev.vars.example .dev.vars    # 填入 LLM 配置
pnpm preview                      # 构建 + wrangler pages dev，连同 AI 问答一起跑
```

## 贡献文档

见站内「团队约定 › 如何贡献一篇文档」，或直接看 `content/docs/team/contributing.mdx`。
