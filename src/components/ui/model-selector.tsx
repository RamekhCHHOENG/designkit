import * as React from "react";
import { ChevronDown, Check, Sparkles, Cpu, Zap, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AIModel {
  id: string;
  name: string;
  provider: "OpenAI" | "Anthropic" | "Google" | "DeepSeek" | "Ollama" | string;
  description?: string;
  contextWindow?: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ModelSelectorProps {
  models: AIModel[];
  value?: string;
  defaultValue?: string;
  onSelect?: (model: AIModel) => void;
  className?: string;
  disabled?: boolean;
}

export function ModelSelector({
  models,
  value,
  defaultValue,
  onSelect,
  className,
  disabled,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(
    value ?? defaultValue ?? models[0]?.id
  );
  const [search, setSearch] = React.useState("");
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const currentId = value !== undefined ? value : selectedId;
  const currentModel = models.find((m) => m.id === currentId) || models[0];

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredModels = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return models;
    return models.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q)
    );
  }, [models, search]);

  const handleSelect = (model: AIModel) => {
    if (value === undefined) {
      setSelectedId(model.id);
    }
    onSelect?.(model);
    setIsOpen(false);
  };

  return (
    <div ref={popoverRef} className={cn("relative inline-block text-left", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/60 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Sparkles className="size-3.5 text-primary" />
        <span className="font-semibold">{currentModel?.name ?? "Select Model"}</span>
        <span className="text-[10px] text-muted-foreground font-mono">({currentModel?.provider})</span>
        <ChevronDown className="size-3 text-muted-foreground ml-0.5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1.5 w-72 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg z-50 animate-in fade-in-0 zoom-in-95"
          role="listbox"
        >
          {/* Search Box */}
          <div className="flex items-center gap-2 px-2 py-1.5 border-b mb-1">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search model or provider..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>

          {/* Model Options List */}
          <div className="max-h-60 overflow-y-auto flex flex-col gap-0.5">
            {filteredModels.map((model) => {
              const isSelected = model.id === currentId;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => handleSelect(model)}
                  className={cn(
                    "flex items-center justify-between w-full rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-muted/80",
                    isSelected && "bg-muted font-medium text-foreground"
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold truncate">{model.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {model.provider}
                      </span>
                    </div>
                    {model.description && (
                      <span className="text-[11px] text-muted-foreground truncate">
                        {model.description}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {model.contextWindow && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground">
                        {model.contextWindow}
                      </span>
                    )}
                    {isSelected && <Check className="size-3.5 text-primary" />}
                  </div>
                </button>
              );
            })}

            {filteredModels.length === 0 && (
              <div className="p-3 text-center text-xs text-muted-foreground">
                No matching models.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
