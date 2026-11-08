import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Download,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MediaItem {
  id: string | number;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  category?: string;
}

export interface MediaGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: MediaItem[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "default" | "lg";
  aspectRatio?: "video" | "square" | "auto";
}

export function MediaGallery({
  items,
  columns = 3,
  gap = "default",
  aspectRatio = "auto",
  className,
  ...props
}: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  const handleNext = React.useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
    setIsZoomed(false);
  }, [lightboxIndex, items.length]);

  const handlePrev = React.useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    setIsZoomed(false);
  }, [lightboxIndex, items.length]);

  const handleClose = React.useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
    setShowInfo(false);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleClose, handleNext, handlePrev]);

  const colClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-2",
    default: "gap-4",
    lg: "gap-6",
  };

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    auto: "aspect-4/3",
  };

  return (
    <div
      data-slot="media-gallery"
      className={cn("w-full flex flex-col gap-4", className)}
      {...props}
    >
      {/* Grid */}
      <div className={cn("grid w-full", colClasses[columns], gapClasses[gap])}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => setLightboxIndex(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(idx);
              }
            }}
            className={cn(
              "group relative overflow-hidden rounded-xl border bg-muted cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring",
              aspectClasses[aspectRatio]
            )}
          >
            <img
              src={item.thumbnail ?? item.src}
              alt={item.alt ?? item.title ?? "Gallery image"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Hover Backdrop Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
              <div className="flex justify-end">
                <span className="p-1.5 rounded-full bg-black/40 backdrop-blur-md">
                  <Maximize2 className="size-3.5 text-white" />
                </span>
              </div>
              <div>
                {item.category && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                    {item.category}
                  </span>
                )}
                {item.title && (
                  <h4 className="text-sm font-semibold truncate text-white">
                    {item.title}
                  </h4>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md text-white animate-in fade-in-0 duration-200 select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 z-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/70">
                {lightboxIndex + 1} / {items.length}
              </span>
              {activeItem.title && (
                <span className="text-sm font-medium truncate max-w-xs md:max-w-md">
                  {activeItem.title}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                title={isZoomed ? "Zoom out" : "Zoom in"}
                aria-label="Toggle zoom"
              >
                {isZoomed ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
              </button>

              <button
                type="button"
                onClick={() => setShowInfo(!showInfo)}
                className={cn(
                  "p-2 rounded-lg hover:bg-white/10 transition-colors",
                  showInfo ? "bg-white/20 text-white" : "text-white/80 hover:text-white"
                )}
                title="Details"
                aria-label="Details"
              >
                <Info className="size-4" />
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors ml-2"
                title="Close (Esc)"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Center Stage with Prev/Next Navigation */}
          <div className="relative flex-1 flex items-center justify-center p-4 min-h-0 overflow-hidden">
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-10"
              title="Previous (Left arrow)"
              aria-label="Previous"
            >
              <ChevronLeft className="size-6" />
            </button>

            <div className="relative max-h-full max-w-full flex items-center justify-center overflow-auto">
              <img
                src={activeItem.src}
                alt={activeItem.alt ?? activeItem.title ?? "Preview"}
                className={cn(
                  "max-h-[75vh] max-w-[85vw] object-contain rounded-lg shadow-2xl transition-transform duration-300",
                  isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-10"
              title="Next (Right arrow)"
              aria-label="Next"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Info Drawer Overlay */}
            {showInfo && (
              <div className="absolute right-6 top-6 bottom-6 w-72 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 p-4 text-xs text-white/80 flex flex-col gap-3 z-20 animate-in slide-in-from-right-4">
                <h4 className="text-sm font-semibold text-white">Metadata</h4>
                {activeItem.title && (
                  <div>
                    <span className="text-[10px] text-white/50 block">Title</span>
                    <span>{activeItem.title}</span>
                  </div>
                )}
                {activeItem.description && (
                  <div>
                    <span className="text-[10px] text-white/50 block">Description</span>
                    <p className="leading-relaxed">{activeItem.description}</p>
                  </div>
                )}
                {activeItem.category && (
                  <div>
                    <span className="text-[10px] text-white/50 block">Category</span>
                    <span className="font-mono">{activeItem.category}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Thumbnails Scrubber */}
          <div className="flex items-center justify-center gap-2 p-4 overflow-x-auto border-t border-white/10 z-10 bg-black/40">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setLightboxIndex(idx);
                  setIsZoomed(false);
                }}
                className={cn(
                  "size-12 shrink-0 rounded-lg overflow-hidden border transition-all",
                  lightboxIndex === idx
                    ? "border-primary ring-2 ring-primary/50 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={item.thumbnail ?? item.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
