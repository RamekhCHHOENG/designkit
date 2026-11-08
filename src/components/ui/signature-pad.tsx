import * as React from "react";
import { RotateCcw, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SignaturePadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  onSave?: (dataUrl: string) => void;
  onClear?: () => void;
  onChange?: (isEmpty: boolean) => void;
  showGuideLine?: boolean;
}

export function SignaturePad({
  width = 500,
  height = 200,
  strokeColor = "currentColor",
  strokeWidth = 2.5,
  onSave,
  onClear,
  onChange,
  showGuideLine = true,
  className,
  ...props
}: SignaturePadProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const pointsRef = React.useRef<{ x: number; y: number }[]>([]);

  // Setup High DPI Canvas
  const setupCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor === "currentColor" ? getComputedStyle(canvas).color : strokeColor;
  }, [width, height, strokeWidth, strokeColor]);

  React.useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    pointsRef.current = [{ x, y }];

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    pointsRef.current.push({ x, y });

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    if (isEmpty) {
      setIsEmpty(false);
      onChange?.(false);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pointsRef.current = [];
    setIsEmpty(true);
    onClear?.();
    onChange?.(true);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || isEmpty) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSave?.(dataUrl);
  };

  return (
    <div
      data-slot="signature-pad"
      className={cn("flex flex-col gap-2 select-none", className)}
      {...props}
    >
      <div className="relative rounded-xl border bg-card overflow-hidden shadow-2xs touch-none">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ width: `${width}px`, height: `${height}px` }}
          className="cursor-crosshair w-full block"
        />

        {showGuideLine && (
          <div className="pointer-events-none absolute bottom-8 inset-x-8 border-b border-dashed border-border/70 flex items-center justify-between text-[11px] text-muted-foreground/60">
            <span>Sign on the line</span>
            <span>X</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2 px-1">
        <button
          type="button"
          onClick={handleClear}
          disabled={isEmpty}
          className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <RotateCcw className="size-3" />
          <span>Clear</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isEmpty}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1 text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:pointer-events-none"
        >
          <Check className="size-3" />
          <span>Save Signature</span>
        </button>
      </div>
    </div>
  );
}
