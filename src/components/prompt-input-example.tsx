import * as React from "react";
import { PromptInput, PromptAttachment } from "@/components/ui/prompt-input";
import { ModelSelector } from "@/components/ui/model-selector";

export default function PromptInputExample() {
  const [prompt, setPrompt] = React.useState("");
  const [attachments, setAttachments] = React.useState<PromptAttachment[]>([
    { id: "1", name: "design-system-spec.pdf", size: "1.2MB" },
  ]);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const sampleModels = [
    { id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", contextWindow: "200k" },
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", contextWindow: "128k" },
    { id: "gemini-2-flash", name: "Gemini 2.0 Flash", provider: "Google", contextWindow: "1M" },
  ];

  const handleSubmit = (text: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-xl p-4">
      <PromptInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={handleSubmit}
        isStreaming={isGenerating}
        onStop={() => setIsGenerating(false)}
        attachments={attachments}
        onRemoveAttachment={(id) =>
          setAttachments((prev) => prev.filter((a) => a.id !== id))
        }
        addonLeading={<ModelSelector models={sampleModels} defaultValue="claude-3-7-sonnet" />}
      />
    </div>
  );
}
