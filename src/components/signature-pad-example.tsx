import * as React from "react";
import { SignaturePad } from "@/components/ui/signature-pad";

export default function SignaturePadExample() {
  const [signatureUrl, setSignatureUrl] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md w-full">
      <SignaturePad
        height={180}
        onSave={(dataUrl) => setSignatureUrl(dataUrl)}
        onClear={() => setSignatureUrl(null)}
      />

      {signatureUrl && (
        <div className="flex flex-col gap-1.5 p-3 rounded-lg border bg-muted/30">
          <span className="text-xs font-semibold text-foreground">Exported Signature (PNG)</span>
          <img
            src={signatureUrl}
            alt="Saved signature"
            className="max-h-16 object-contain border rounded bg-background p-1"
          />
        </div>
      )}
    </div>
  );
}
