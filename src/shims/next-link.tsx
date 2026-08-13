// Minimal stand-in for next/link so vendored shadcn/ui example demos render
// in this plain Vite app (no client-side router here -- every demo link is
// a placeholder "#" anyway).
import type { AnchorHTMLAttributes } from "react";

type NextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export default function Link({ href, ...props }: NextLinkProps) {
  return <a href={href} {...props} />;
}
