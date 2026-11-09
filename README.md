<div align="center">

<img src="public/favicon.svg" width="72" height="72" alt="积石 Cairn" />

# 积石 Cairn

**每个人放下一块石头，后来的人就不会迷路。**

团队知识库 · 基于 [Fumadocs](https://fumadocs.dev) 构建 · 部署在 Cloudflare Pages

</div>

---

Cairn 是登山者沿途堆起的石堆路标：每个经过的人添一块石头，后来的人就不会迷路。积石把团队踩过的坑、做过的决定、跑通的流程收在一个能搜、能问、不会悄悄过期的地方。

## 功能

- **四个工作区**：工程手册、产品空间、团队约定、决策与复盘，在侧边栏顶部切换
- **⌘K 全文搜索**：构建时生成索引，在浏览器里搜索，中文开箱即用
- **AI 问答**：Ctrl / ⌘ + `/` 打开，只根据知识库内容回答并附上出处；模型地址、密钥、模型名可自定义
- **MDX 写作**：提示框、步骤条、标签页、文件树等组件全局可用，不用每篇 import
- **文档即代码**：内容放在 Git 仓库里，走 PR 和 Review，每次修改都有记录
- **访问控制**：Cloudflare Access 按邮箱白名单放行，访问者用邮箱验证码登录
- **给 AI 读的版本**：自动生成 `llms.txt`、`llms-full.txt` 和每页的 Markdown
- **Linear 风格首页**：GSAP 与 Motion 动效；系统开启「减少动态效果」时自动关闭位移动画

## 技术栈

| 类别     | 选型                                                              |
| -------- | ----------------------------------------------------------------- |
| 框架     | Next.js 16（App Router，静态导出）                                |
| 文档     | Fumadocs UI / Core / MDX，骨架来自官方脚手架 `create-fumadocs-app` |
| 样式     | Tailwind CSS 4，Inter + 思源黑体 + JetBrains Mono                 |
| 动效     | GSAP（SplitText、ScrollTrigger）、Motion                          |
| AI 问答  | `@fumadocs/ai-chat` + AI SDK，后端为 Cloudflare Pages Function    |
| 部署     | Cloudflare Pages + Cloudflare Access                              |

## 快速开始

需要 Node.js 22 以上和 pnpm。

```bash
git clone https://github.com/cian-lien/cairn.git
cd cairn
corepack enable      # 首次使用 pnpm 时
pnpm install
pnpm dev
```

打开 http://localhost:3000 。

### 本地调试 AI 问答

`pnpm dev` 只运行页面，问答接口 `/api/chat` 由 Cloudflare 运行。要一起调试：

```bash
cp .dev.vars.example .dev.vars   # 填入模型配置，见下文
pnpm preview                     # 构建静态站 + wrangler pages dev
```

### 命令

| 命令               | 说明                                         |
| ------------------ | -------------------------------------------- |
| `pnpm dev`         | 本地开发（热更新，不含 AI 问答接口）         |
| `pnpm build`       | 静态导出到 `out/`                            |
| `pnpm start`       | 用 wrangler 在本地托管 `out/`，含 AI 问答接口 |
| `pnpm preview`     | `build` + `start`                            |
| `pnpm types:check` | 类型检查                                     |

## 目录结构

```text
cairn/
├── content/docs/              # 全部文档
│   ├── meta.json              # 工作区顺序
│   ├── engineering/           # 工程手册
│   ├── product/               # 产品空间
│   ├── team/                  # 团队约定
│   └── decisions/             # 决策与复盘
├── app/
│   ├── (home)/                # 首页
│   ├── docs/                  # 文档布局与页面
│   ├── api/search/route.ts    # 静态搜索索引
│   ├── llms*.txt、llms.mdx/   # 给 AI 读的文本
│   └── og/                    # 分享图
├── components/
│   ├── home/                  # 首页区块与动效
│   ├── ai/                    # Ask AI 聊天面板
│   ├── logo.tsx               # 积石标志
│   ├── sidebar-search.tsx     # 侧边栏搜索框
│   └── sidebar-footer.tsx     # 侧边栏底部栏
├── functions/api/chat.ts      # AI 问答接口（Cloudflare Pages Function）
├── lib/
│   ├── source.ts              # Fumadocs 内容源
│   └── shared.ts              # 站点名、GitHub 仓库、工作区颜色
├── public/
│   ├── _redirects             # Cloudflare Pages 跳转规则
│   └── topo.svg、ridge.svg    # 首页素材
└── wrangler.toml              # Cloudflare Pages 配置
```

## 写文档

在对应工作区的文件夹里新建 `.mdx` 文件，文件路径就是网址：

```mdx
---
title: 新人上手清单
description: 入职第一周要做的事
---

## 第一天

<Callout>写完记得在侧边栏顺序里加上它。</Callout>
```

- 侧边栏顺序由同目录的 `meta.json` 里的 `pages` 决定，`---标题---` 是分组标题
- 写好后发 PR，合并到 `main` 自动上线
- 详细约定见站内「团队约定 › 如何贡献一篇文档」

### 新增工作区

1. 在 `content/docs/` 下新建文件夹，写 `meta.json`：

   ```json
   { "title": "工作区名", "description": "一句话说明", "icon": "Lucide 图标名", "root": true }
   ```

2. 把文件夹名加进 `content/docs/meta.json` 的 `pages`
3. 在 `lib/shared.ts` 的 `workspaces` 里给它配一个图标颜色

## AI 问答

问答接口 `functions/api/chat.ts` 把构建时生成的 `llms-full.txt` 作为参考资料交给模型，要求只根据文档回答并附上出处。模型通过环境变量配置，任何兼容 OpenAI 接口的服务都可以：

| 变量           | 示例                          | 说明                     |
| -------------- | ----------------------------- | ------------------------ |
| `LLM_BASE_URL` | `https://api.deepseek.com/v1` | 兼容 OpenAI 接口的地址   |
| `LLM_API_KEY`  | `sk-...`                      | 线上请设为 Secret        |
| `LLM_MODEL`    | `deepseek-chat`               | 模型名                   |

- **本地**：写在 `.dev.vars`（已被 git 忽略）
- **线上**：Cloudflare Pages 项目 → Settings → Variables and Secrets，改完需重新部署

换模型或服务商只需改这三个变量，不用改代码。文档多到放不下上下文时（单次上限约 20 万字符，超出会截断），再升级为「先检索再回答」。

## 部署

部署在 **Cloudflare Pages**，用 **Cloudflare Access** 限制只有团队邮箱能访问（Zero Trust 免费版支持 50 人以内）。

| 设置项       | 值                    |
| ------------ | --------------------- |
| 构建命令     | `pnpm build`          |
| 构建输出目录 | `out`                 |
| 环境变量     | `NODE_VERSION` = `22`，以及上面三个 `LLM_` 变量 |

要点：

1. 提交 `pnpm-lock.yaml`，Cloudflare 会据此使用 pnpm
2. 绑定自定义域名，`*.pages.dev` 在国内访问不稳定
3. Access 应用除了自定义域名，还要覆盖 `cairn.pages.dev` 和 `*.cairn.pages.dev`，否则可以绕过登录

完整步骤见站内「工程手册 › 部署流程」（`content/docs/engineering/deploy.mdx`），选型理由见「决策与复盘 › ADR-013」。

## 已知限制

静态导出后，以下能力不可用或有变化：

- 不能按请求头返回 Markdown（`llms.txt`、Copy Markdown 按钮不受影响）
- 搜索在浏览器里进行，首次搜索需下载索引；文档上千篇时再考虑换方案
- 图片不经过自动优化，上传前请自行压缩

## 致谢

- [Fumadocs](https://fumadocs.dev)：文档框架、脚手架与 AI 聊天组件
- [GSAP](https://gsap.com)、[Motion](https://motion.dev)：动效
- [Lucide](https://lucide.dev)：图标
