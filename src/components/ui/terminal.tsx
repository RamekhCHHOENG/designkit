import * as React from "react";
import { Terminal as TerminalIcon, Copy, Check, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TerminalCommand {
  command: string;
  output?: string;
  isError?: boolean;
}

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  commands?: TerminalCommand[];
  interactive?: boolean;
  onCommandSubmit?: (command: string) => void;
  copyable?: boolean;
  animated?: boolean;
}

export function Terminal({
  title = "bash",
  commands = [
    { command: "npx @ramekhchhoeng/designkit@latest init", output: "✔ Created designkit.config.json\n✔ Installed 127 primitives successfully!" },
    { command: "npm run dev", output: "➜ Local:   http://localhost:3312/\n➜ Network: http://192.168.1.5:3312/" },
  ],
  interactive = false,
  onCommandSubmit,
  copyable = true,
  animated = false,
  className,
  children,
  ...props
}: TerminalProps) {
  const [copied, setCopied] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("");
  const [internalCommands, setInternalCommands] = React.useState<TerminalCommand[]>(commands);

  const handleCopy = async () => {
    const text = internalCommands
      .map((c) => `$ ${c.command}\n${c.output || ""}`)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const nextCmd: TerminalCommand = { command: inputVal.trim() };
    setInternalCommands((prev) => [...prev, nextCmd]);
    onCommandSubmit?.(inputVal.trim());
    setInputVal("");
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-[#09090b] text-zinc-100 font-mono text-xs shadow-2xl overflow-hidden select-text",
        className
      )}
      {...props}
    >
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/90 border-b border-zinc-800 select-none">
        {/* Mac Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
          <span className="size-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
          <span className="size-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
        </div>

        {/* Center Title */}
        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-sans">
          <TerminalIcon className="size-3" />
          <span>{title}</span>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-1">
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              title="Copy terminal commands"
              className="flex size-5 items-center justify-center rounded text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
            </button>
          )}
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto leading-relaxed">
        {internalCommands.map((cmd, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-200">
              <span className="text-emerald-400 font-bold select-none">$</span>
              <span>{cmd.command}</span>
            </div>
            {cmd.output && (
              <pre
                className={cn(
                  "text-[11px] whitespace-pre-wrap pl-4 leading-normal",
                  cmd.isError ? "text-rose-400" : "text-zinc-400"
                )}
              >
                {cmd.output}
              </pre>
            )}
          </div>
        ))}

        {children}

        {/* Interactive Prompt Input */}
        {interactive ? (
          <form onSubmit={handleInputSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold select-none">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type a command..."
              className="flex-1 bg-transparent text-zinc-100 outline-none text-xs placeholder:text-zinc-600"
            />
          </form>
        ) : (
          <div className="flex items-center gap-2 text-zinc-500 pt-1">
            <span className="text-emerald-400 font-bold select-none">$</span>
            <span className="size-2 bg-emerald-400 inline-block animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
