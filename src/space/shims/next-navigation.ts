// Stand-in for next/navigation in the Vite docs app.
export function usePathname(): string {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}

export function useRouter() {
  return {
    push: (href: string) => { window.location.href = href; },
    replace: (href: string) => { window.location.replace(href); },
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => window.location.reload(),
    prefetch: () => {},
  };
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
}
