import { Fragment, useEffect, useState, type ReactNode } from "react"
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { docs, type Block } from "@/docs-content"

const INLINE = /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g

/** Renders `code`, [links](url), **bold** and *italic* inside a line of text. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE).map((part, i) => {
        if (part.startsWith("`")) {
          return (
            <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>
        if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
          const external = /^https?:/.test(link[2]!)
          return (
            <a
              key={i}
              href={link[2]}
              className="underline underline-offset-2 hover:text-foreground"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {link[1]}
            </a>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="overflow-hidden rounded-lg border">
      {title && (
        <div className="border-b bg-muted/50 px-4 py-2 font-mono text-xs text-muted-foreground">{title}</div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto bg-muted/30 p-4 pr-12 text-xs leading-relaxed">
          <code>{code}</code>
        </pre>
        <Button
          variant="outline"
          size="icon-sm"
          className="absolute top-2 right-2"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1400)
            } catch {
              // Clipboard unavailable -- best effort only.
            }
          }}
        >
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
        </Button>
      </div>
    </div>
  )
}

function RenderBlock({ block }: { block: Block }): ReactNode {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={slugify(block.text)} className="mt-6 scroll-mt-24 border-b pb-2 text-xl font-semibold tracking-tight">
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 id={slugify(block.text)} className="mt-2 scroll-mt-24 text-base font-semibold">
          {block.text}
        </h3>
      )
    case "p":
      return (
        <p className="text-sm leading-7 text-muted-foreground">
          <Inline text={block.text} />
        </p>
      )
    case "code":
      return <CodeBlock code={block.code} title={block.title} />
    case "list":
      return (
        <ul className="ml-5 list-disc space-y-1.5 text-sm leading-7 text-muted-foreground marker:text-border">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      )
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                {block.head.map((h) => (
                  <th key={h} className="px-4 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t align-top">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-2 ${j === 0 ? "whitespace-nowrap" : "text-muted-foreground"}`}>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "note":
      return (
        <div className="flex gap-3 rounded-lg border bg-muted/40 p-4 text-sm leading-6">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p>
            <Inline text={block.text} />
          </p>
        </div>
      )
  }
}

function currentSlug() {
  const match = window.location.hash.match(/^#docs\/([a-z-]+)$/)
  return docs.some((d) => d.slug === match?.[1]) ? match![1]! : docs[0]!.slug
}

export function DocsPage() {
  const [slug, setSlug] = useState(currentSlug)

  useEffect(() => {
    const onHash = () => {
      setSlug(currentSlug())
      window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const index = docs.findIndex((d) => d.slug === slug)
  const page = docs[index]!
  const prev = docs[index - 1]
  const next = docs[index + 1]

  useEffect(() => {
    const previous = document.title
    document.title = `${page.title} — DesignKit Docs`
    return () => {
      document.title = previous
    }
  }, [page.title])

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 md:grid-cols-[220px_1fr] lg:px-6">
      <aside className="md:sticky md:top-20 md:h-fit">
        <nav aria-label="Documentation" className="flex flex-col gap-1">
          <span className="px-2 pb-1 text-xs font-medium text-muted-foreground">Documentation</span>
          {docs.map((d) => (
            <a
              key={d.slug}
              href={`#docs/${d.slug}`}
              aria-current={d.slug === slug ? "page" : undefined}
              className={`rounded-md px-2 py-1.5 text-sm hover:bg-muted ${
                d.slug === slug ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
              }`}
            >
              {d.title}
            </a>
          ))}
        </nav>
      </aside>

      <article className="flex min-w-0 max-w-3xl flex-col gap-4">
        <header className="flex flex-col gap-1 pb-2">
          <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{page.description}</p>
        </header>
        {page.blocks.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
        <footer className="mt-8 flex items-center justify-between gap-4 border-t pt-6 text-sm">
          {prev ? (
            <a href={`#docs/${prev.slug}`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ChevronLeftIcon className="size-4" /> {prev.title}
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a href={`#docs/${next.slug}`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              {next.title} <ChevronRightIcon className="size-4" />
            </a>
          )}
        </footer>
      </article>
    </div>
  )
}
