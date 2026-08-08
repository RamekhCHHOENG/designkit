import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type NextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  children?: ReactNode;
};

// Stand-in for next/link in the Vite docs app: renders a plain <a>.
const Link = forwardRef<HTMLAnchorElement, NextLinkProps>(function Link(
  { href, prefetch, replace, scroll, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} href={href} {...rest}>
      {children}
    </a>
  );
});

export default Link;
