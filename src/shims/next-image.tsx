// Minimal stand-in for next/image so vendored shadcn/ui example demos (which
// assume a Next.js host app) render in this plain Vite app. No optimization,
// just a plain <img>.
import type { ImgHTMLAttributes } from "react";

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
};

export default function Image({ fill, priority: _priority, className, ...props }: NextImageProps) {
  return <img {...props} className={fill ? `absolute inset-0 h-full w-full ${className ?? ""}` : className} />;
}
