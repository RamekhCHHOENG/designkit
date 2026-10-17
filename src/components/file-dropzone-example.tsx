import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { FileDropzone } from "@/components/ui/file-dropzone"

export default function FileDropzoneExample() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Drag & Drop Upload Area with File Previews">
        <div className="w-full max-w-md space-y-2">
          <FileDropzone
            files={files}
            onFilesChange={setFiles}
            maxFiles={4}
            maxSize={15 * 1024 * 1024}
            accept=".png, .jpg, .jpeg, .pdf, .zip"
          />
        </div>
      </Example>
    </ExampleWrapper>
  )
}
