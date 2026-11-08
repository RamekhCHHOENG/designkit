import * as React from "react";
import { cn } from "@/lib/utils";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxRotation?: number; // Maximum tilt angle in degrees (default: 12)
  perspective?: number; // 3D perspective in px (default: 1000)
  glareEffect?: boolean;
  children: React.ReactNode;
}

export function TiltCard({
  maxRotation = 12,
  perspective = 1000,
  glareEffect = true,
  children,
  className,
  ...props
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = React.useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize -0.5 to 0.5
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    // Invert X for natural 3D tilt
    setRotation({
      x: -yPct * maxRotation,
      y: xPct * maxRotation,
    });

    if (glareEffect) {
      setGlarePosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 0.15,
      });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    if (glareEffect) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      data-slot="tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
      }}
      className={cn("inline-block", className)}
      {...props}
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative overflow-hidden rounded-3xl border bg-card text-card-foreground shadow-lg will-change-transform"
      >
        {/* Children */}
        {children}

        {/* Specular Glare Overlay */}
        {glareEffect && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: glarePosition.opacity,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.8), transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
