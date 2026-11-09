/**
 * Cloudflare Pages Function：知识库 AI 问答接口 POST /api/chat
 *
 * 和静态页面部署在同一个 Pages 项目、同一个域名下，
 * 因此 Cloudflare Access 的邮箱白名单同样保护这个接口。
 *
 * 环境变量（Cloudflare 后台 Settings → Variables and Secrets）：
 *   LLM_BASE_URL  兼容 OpenAI 接口的地址，例如 https://api.deepseek.com/v1
 *   LLM_API_KEY   API Key，请设为 Secret
 *   LLM_MODEL     模型名，例如 deepseek-chat
 *
 * 写法参照 Fumadocs 官方 Ask AI 路由（AI SDK v7）。
 * 区别：不做检索工具，直接把构建时生成的 /llms-full.txt 整份交给模型，适合文档量不大的团队知识库。
 */
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai';

interface Env {
  LLM_BASE_URL?: string;
  LLM_API_KEY?: string;
  LLM_MODEL?: string;
  /** Pages 自动注入，用来读取同一次部署里的静态文件 */
  ASSETS: { fetch: (input: Request | URL | string) => Promise<Response> };
}

interface PagesContext {
  request: Request;
  env: Env;
}

/** 文档文本上限（字符数），超过时截断，避免超出模型上下文 */
const MAX_DOCS_CHARS = 200_000;

const systemPrompt = [
  '你是「积石 Cairn」团队知识库的问答助手。',
  '只根据 <docs> 标签里的文档内容回答；文档里没有的，直接说不知道，并建议去搜索或补一篇文档。',
  '回答使用中文，简洁直接，能用步骤或列表就用。',
  '每个回答末尾用 Markdown 链接注明出处，链接取自文档里每页标题后括号中的路径，例如 [部署流程](/docs/engineering/deploy)。',
  '用户消息可能以 [Client Context] 开头，表示提问时所在的页面；问到「这一页」时以它为准。',
].join('\n');

// 同一个 isolate 内缓存文档文本；重新部署后自然失效
let docsCache: string | undefined;

async function loadDocs(request: Request, env: Env): Promise<string> {
  if (docsCache !== undefined) return docsCache;

  const res = await env.ASSETS.fetch(new URL('/llms-full.txt', request.url));
  let text = res.ok ? await res.text() : '';
  if (text.length > MAX_DOCS_CHARS) {
    text = `${text.slice(0, MAX_DOCS_CHARS)}\n\n（文档过长，已截断）`;
  }

  docsCache = text;
  return text;
}

function errorResponse(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  if (!env.LLM_BASE_URL || !env.LLM_API_KEY || !env.LLM_MODEL) {
    return errorResponse(500, 'AI 问答未配置：请在 Cloudflare 设置 LLM_BASE_URL、LLM_API_KEY、LLM_MODEL');
  }

  let messages: UIMessage[];
  try {
    const body = (await request.json()) as { messages?: UIMessage[] };
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return errorResponse(400, '请求格式错误');
  }

  const docs = await loadDocs(request, env);

  const llm = createOpenAICompatible({
    name: 'cairn-llm',
    baseURL: env.LLM_BASE_URL.replace(/\/+$/, ''),
    apiKey: env.LLM_API_KEY,
  });

  const result = streamText({
    model: llm(env.LLM_MODEL),
    instructions: `${systemPrompt}\n\n<docs>\n${docs}\n</docs>`,
    messages: await convertToModelMessages(messages, {
      convertDataPart(part) {
        if (part.type === 'data-client')
          return {
            type: 'text',
            text: `[Client Context: ${JSON.stringify(part.data)}]`,
          };
      },
    }),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
