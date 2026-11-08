import * as React from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  RemoveFormatting,
  Eye,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (html: string, text: string) => void;
  placeholder?: string;
  minHeight?: string | number;
  readOnly?: boolean;
  showWordCount?: boolean;
  showSourceToggle?: boolean;
}

export function RichTextEditor({
  value,
  defaultValue = "",
  onChange,
  placeholder = "Write your content here...",
  minHeight = "160px",
  readOnly = false,
  showWordCount = true,
  showSourceToggle = true,
  className,
  ...props
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = React.useState(defaultValue);
  const [isSourceMode, setIsSourceMode] = React.useState(false);
  const [stats, setStats] = React.useState({ words: 0, chars: 0 });

  // Sync external controlled value
  React.useEffect(() => {
    if (value !== undefined && editorRef.current && !isSourceMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
        updateStats();
      }
    }
  }, [value, isSourceMode]);

  const updateStats = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || "";
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    setStats({ words, chars });
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const text = editorRef.current.innerText;
    setHtmlContent(html);
    updateStats();
    onChange?.(html, text);
  };

  const execCommand = (command: string, arg?: string) => {
    if (readOnly || isSourceMode) return;
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleLink = () => {
    const url = window.prompt("Enter destination URL:", "https://");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const minHeightStyle = typeof minHeight === "number" ? `${minHeight}px` : minHeight;

  return (
    <div
      data-slot="rich-text-editor"
      className={cn(
        "flex flex-col w-full rounded-xl border bg-background overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-ring transition-all",
        readOnly && "opacity-80 pointer-events-none bg-muted/20",
        className
      )}
      {...props}
    >
      {/* Editor Toolbar */}
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-1 p-1.5 border-b bg-muted/40 text-muted-foreground select-none">
          {/* History */}
          <div className="flex items-center gap-0.5 pr-1 border-r border-border/60">
            <button
              type="button"
              onClick={() => execCommand("undo")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Undo (Ctrl+Z)"
              aria-label="Undo"
            >
              <Undo className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("redo")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Redo (Ctrl+Y)"
              aria-label="Redo"
            >
              <Redo className="size-3.5" />
            </button>
          </div>

          {/* Formats */}
          <div className="flex items-center gap-0.5 px-1 border-r border-border/60">
            <button
              type="button"
              onClick={() => execCommand("bold")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Bold (Ctrl+B)"
              aria-label="Bold"
            >
              <Bold className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("italic")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Italic (Ctrl+I)"
              aria-label="Italic"
            >
              <Italic className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("underline")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Underline (Ctrl+U)"
              aria-label="Underline"
            >
              <Underline className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("strikeThrough")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Strikethrough"
              aria-label="Strikethrough"
            >
              <Strikethrough className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("formatBlock", "<pre>")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Code block"
              aria-label="Code block"
            >
              <Code className="size-3.5" />
            </button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-0.5 px-1 border-r border-border/60">
            <button
              type="button"
              onClick={() => execCommand("formatBlock", "<h1>")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors font-bold text-xs"
              title="Heading 1"
              aria-label="Heading 1"
            >
              <Heading1 className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("formatBlock", "<h2>")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors font-semibold text-xs"
              title="Heading 2"
              aria-label="Heading 2"
            >
              <Heading2 className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("formatBlock", "<h3>")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors text-xs"
              title="Heading 3"
              aria-label="Heading 3"
            >
              <Heading3 className="size-3.5" />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center gap-0.5 px-1 border-r border-border/60">
            <button
              type="button"
              onClick={() => execCommand("insertUnorderedList")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Bullet List"
              aria-label="Bullet List"
            >
              <List className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("insertOrderedList")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Numbered List"
              aria-label="Numbered List"
            >
              <ListOrdered className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("formatBlock", "<blockquote>")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Blockquote"
              aria-label="Blockquote"
            >
              <Quote className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={handleLink}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Insert Link"
              aria-label="Insert Link"
            >
              <LinkIcon className="size-3.5" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-0.5 px-1 border-r border-border/60">
            <button
              type="button"
              onClick={() => execCommand("justifyLeft")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Align Left"
              aria-label="Align Left"
            >
              <AlignLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("justifyCenter")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Align Center"
              aria-label="Align Center"
            >
              <AlignCenter className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("justifyRight")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Align Right"
              aria-label="Align Right"
            >
              <AlignRight className="size-3.5" />
            </button>
          </div>

          {/* Clear & View Modes */}
          <div className="flex items-center gap-0.5 ml-auto">
            <button
              type="button"
              onClick={() => execCommand("removeFormat")}
              className="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
              title="Clear Formatting"
              aria-label="Clear Formatting"
            >
              <RemoveFormatting className="size-3.5" />
            </button>
            {showSourceToggle && (
              <button
                type="button"
                onClick={() => setIsSourceMode(!isSourceMode)}
                className={cn(
                  "p-1.5 rounded hover:bg-muted transition-colors flex items-center gap-1 text-[11px] font-medium",
                  isSourceMode ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
                title={isSourceMode ? "Visual Editor" : "HTML Source"}
                aria-label="Toggle HTML Source"
              >
                {isSourceMode ? <Eye className="size-3.5" /> : <FileCode className="size-3.5" />}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Editor Content Area */}
      {isSourceMode ? (
        <textarea
          value={htmlContent}
          onChange={(e) => {
            setHtmlContent(e.target.value);
            if (editorRef.current) {
              editorRef.current.innerHTML = e.target.value;
              updateStats();
            }
            onChange?.(e.target.value, editorRef.current?.innerText || "");
          }}
          style={{ minHeight: minHeightStyle }}
          className="w-full p-4 font-mono text-xs bg-muted/10 outline-none resize-y text-foreground border-none"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable={!readOnly}
          onInput={handleInput}
          style={{ minHeight: minHeightStyle }}
          data-placeholder={placeholder}
          className="p-4 outline-none text-sm text-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/60 empty:before:pointer-events-none"
        />
      )}

      {/* Footer Status Bar */}
      {showWordCount && (
        <div className="flex items-center justify-between px-3 py-1.5 border-t bg-muted/20 text-[11px] text-muted-foreground select-none">
          <span>{isSourceMode ? "HTML Source View" : "Visual Mode"}</span>
          <div className="flex items-center gap-3">
            <span>{stats.words} words</span>
            <span>{stats.chars} characters</span>
          </div>
        </div>
      )}
    </div>
  );
}
