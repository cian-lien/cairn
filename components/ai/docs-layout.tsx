'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import {
  type AIChatClientData,
  AIChatPanel,
  AIChatProvider,
  AIChatTrigger,
  useAIChat,
} from '@fumadocs/ai-chat';
import { DocsLayout, type DocsLayoutProps } from 'fumadocs-ui/layouts/docs';

/** data-client：提问时所在的页面，由聊天面板自动附带 */
type ChatUIMessage = UIMessage<never, { client: AIChatClientData }>;

const suggestions = ['怎么在本地跑起知识库？', '线上出问题了怎么回滚？', '新人第一周要做什么？'];

/**
 * 带「Ask AI」的文档布局。
 * 问答接口 /api/chat 是 Cloudflare Pages Function（见 functions/api/chat.ts）。
 * 快捷键：Ctrl/⌘ + / 打开，Esc 关闭。
 */
export function AIDocsLayout(props: DocsLayoutProps) {
  const chat = useChat<ChatUIMessage>({
    id: 'cairn',
    throttle: 40,
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  return (
    <AIChatProvider
      chat={chat}
      description="只根据积石里的文档回答，并附上出处。"
      suggestions={suggestions}
    >
      <ChatLayout {...props} />
      <AIChatTrigger />
    </AIChatProvider>
  );
}

function ChatLayout(props: DocsLayoutProps) {
  const { open, setOpen } = useAIChat();

  return <DocsLayout {...props} aiChat={{ open, onOpenChange: setOpen, panel: <AIChatPanel /> }} />;
}
