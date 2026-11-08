import * as React from "react";
import { ChatContainer, ChatMessage, ChatMessageActions } from "@/components/ui/chat-container";

export function ChatContainerExample() {
  const [branch, setBranch] = React.useState(0);
  const responses = [
    "DesignKit provides unified OKLCH palettes and seamless dual-framework parity across React 19 and Vue 3 / Nuxt 4.",
    "Alternative 2: DesignKit features over 135 accessible primitives with built-in Apple-inspired motion and ECharts integration.",
    "Alternative 3: All DesignKit components follow the code-ownership model with zero vendor lock-in.",
  ];

  return (
    <div className="w-full max-w-md h-80 rounded-xl border bg-background shadow-xs overflow-hidden flex flex-col">
      <ChatContainer className="flex-1">
        <ChatMessage
          role="user"
          authorName="Alex Developer"
          timestamp="10:42 AM"
          content="How does DesignKit compare with other UI component ecosystems?"
        />
        <ChatMessage
          role="assistant"
          authorName="DesignKit AI"
          timestamp="10:42 AM"
          content={responses[branch]}
          branchIndex={branch}
          branchTotal={responses.length}
          onBranchChange={setBranch}
          actions={
            <ChatMessageActions
              textToCopy={responses[branch]}
              onThumbsUp={() => {}}
              onThumbsDown={() => {}}
              onRegenerate={() => setBranch((b) => (b + 1) % responses.length)}
            />
          }
        />
      </ChatContainer>
    </div>
  );
}
