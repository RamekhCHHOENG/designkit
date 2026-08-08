import { forwardRef, type CSSProperties, type ImgHTMLAttributes } from "react";

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  quality?: number | string;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
};

// Minimal stand-in for next/image inside the Vite docs app: renders a plain <img>.
const Image = forwardRef<HTMLImageElement, NextImageProps>(function Image(
  { src, fill, priority, quality, placeholder, blurDataURL, unoptimized, style, ...rest },
  ref,
) {
  const resolvedSrc = typeof src === "string" ? src : src.src;
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: (style?.objectFit as CSSProperties["objectFit"]) ?? "cover" }
    : undefined;
  return <img ref={ref} src={resolvedSrc} loading={priority ? "eager" : rest.loading} style={{ ...fillStyle, ...style }} {...rest} />;
});

export default Image;
