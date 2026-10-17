"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface WatermarkProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content?: string | string[]
  image?: string
  width?: number
  height?: number
  rotate?: number
  zIndex?: number
  gap?: [number, number]
  font?: {
    color?: string
    fontSize?: number
    fontWeight?: string | number
    fontFamily?: string
  }
}

export function Watermark({
  content = "CONFIDENTIAL",
  image,
  width = 160,
  height = 64,
  rotate = -22,
  zIndex = 9,
  gap = [100, 100],
  font = {},
  className,
  children,
  ...props
}: WatermarkProps) {
  const [base64Url, setBase64Url] = React.useState<string>("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  const {
    color = "rgba(0, 0, 0, 0.08)",
    fontSize = 14,
    fontWeight = "normal",
    fontFamily = "sans-serif",
  } = font

  React.useEffect(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const [gapX, gapY] = gap
    const canvasWidth = width + gapX
    const canvasHeight = height + gapY

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx.translate(canvasWidth / 2, canvasHeight / 2)
    ctx.rotate((rotate * Math.PI) / 180)

    if (image) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.referrerPolicy = "no-referrer"
      img.src = image
      img.onload = () => {
        ctx.drawImage(img, -width / 2, -height / 2, width, height)
        setBase64Url(canvas.toDataURL())
      }
    } else {
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
      ctx.fillStyle = color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const contents = Array.isArray(content) ? content : [content]
      contents.forEach((line, index) => {
        ctx.fillText(line, 0, (index - (contents.length - 1) / 2) * (fontSize + 4))
      })

      setBase64Url(canvas.toDataURL())
    }
  }, [content, image, width, height, rotate, gap, color, fontSize, fontWeight, fontFamily])

  return (
    <div
      ref={containerRef}
      data-slot="watermark"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          zIndex,
          backgroundImage: base64Url ? `url(${base64Url})` : undefined,
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
        }}
        aria-hidden="true"
      />
    </div>
  )
}
