import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperDescription,
  ImageCropperImage,
} from "@/components/ui/image-cropper"
import { Button } from "@/components/ui/button"

export default function ImageCropperExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <CropperDemo />
    </ExampleWrapper>
  )
}

function CropperDemo() {
  const [zoom, setZoom] = React.useState(1)

  return (
    <Example title="Interactive Image Cropper">
      <div className="w-full max-w-md space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black/5 dark:bg-white/5">
          <ImageCropper
            image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
            zoom={zoom}
            onZoomChange={setZoom}
            className="h-full w-full"
          >
            <ImageCropperDescription>Crop your profile picture</ImageCropperDescription>
            <ImageCropperImage />
            <ImageCropperCropArea className="rounded-full" />
          </ImageCropper>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Drag image to position</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
            >
              Zoom Out
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
            >
              Zoom In
            </Button>
          </div>
        </div>
      </div>
    </Example>
  )
}
