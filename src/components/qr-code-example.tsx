import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { QRCode } from "@/components/ui/qr-code"

export default function QRCodeExample() {
  const [status, setStatus] = React.useState<"active" | "expired">("active")

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Standard QR Code with Download">
        <div className="flex flex-col items-center gap-2">
          <QRCode
            value="https://designkit-smoky.vercel.app"
            downloadable
          />
          <p className="text-xs text-muted-foreground">Scan to visit DesignKit documentation</p>
        </div>
      </Example>

      <Example title="Expired QR Code with Refresh Trigger">
        <div className="flex flex-col items-center gap-2">
          <QRCode
            value="https://designkit-smoky.vercel.app/auth"
            status={status}
            onRefresh={() => setStatus("active")}
          />
          <button
            type="button"
            onClick={() => setStatus(status === "active" ? "expired" : "active")}
            className="text-xs text-primary underline mt-2"
          >
            Toggle Expired State
          </button>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
