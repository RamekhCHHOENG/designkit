"use client"

import * as React from "react"
import QRCodeGenerator from "qrcode"
import { DownloadIcon, RefreshCwIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  size?: number
  level?: "L" | "M" | "Q" | "H"
  color?: string
  bgColor?: string
  icon?: string
  iconSize?: number
  status?: "active" | "expired" | "loading"
  onRefresh?: () => void
  downloadable?: boolean
  fileName?: string
}

export function QRCode({
  value,
  size = 160,
  level = "M",
  color = "#000000",
  bgColor = "#ffffff",
  icon,
  iconSize = 36,
  status = "active",
  onRefresh,
  downloadable = false,
  fileName = "qrcode.png",
  className,
  ...props
}: QRCodeProps) {
  const [dataUrl, setDataUrl] = React.useState<string>("")
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!value) return

    QRCodeGenerator.toDataURL(value, {
      width: size,
      margin: 1,
      errorCorrectionLevel: level,
      color: {
        dark: color,
        light: bgColor,
      },
    })
      .then((url) => {
        setDataUrl(url)
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [value, size, level, color, bgColor])

  const handleDownload = () => {
    if (!dataUrl) return
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div
      data-slot="qr-code"
      className={cn("relative inline-flex flex-col items-center gap-2 select-none", className)}
      {...props}
    >
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-2 shadow-xs"
        style={{ width: size + 16, height: size + 16 }}
      >
        {dataUrl && (
          <img
            src={dataUrl}
            alt={`QR Code: ${value}`}
            width={size}
            height={size}
            className="block h-full w-full object-contain"
          />
        )}

        {/* Central Logo Overlay */}
        {icon && status === "active" && (
          <div
            className="absolute flex items-center justify-center overflow-hidden rounded-md border-2 border-white bg-white shadow-xs"
            style={{ width: iconSize, height: iconSize }}
          >
            <img src={icon} alt="QR logo" className="h-full w-full object-contain" />
          </div>
        )}

        {/* Expired or Loading Overlay */}
        {status !== "active" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/85 backdrop-blur-xs text-foreground p-2 text-center">
            {status === "expired" ? (
              <>
                <p className="text-xs font-medium">QR code expired</p>
                {onRefresh && (
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={onRefresh}
                    className="gap-1 mt-1 text-[11px]"
                  >
                    <RefreshCwIcon className="size-3" />
                    <span>Refresh</span>
                  </Button>
                )}
              </>
            ) : (
              <RefreshCwIcon className="size-5 animate-spin text-muted-foreground" />
            )}
          </div>
        )}
      </div>

      {downloadable && status === "active" && dataUrl && (
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={handleDownload}
          className="text-xs text-muted-foreground hover:text-foreground gap-1"
        >
          <DownloadIcon className="size-3" />
          <span>Download</span>
        </Button>
      )}

      {error && <span className="text-[11px] text-destructive">{error}</span>}
    </div>
  )
}
