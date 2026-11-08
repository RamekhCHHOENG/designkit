import * as React from "react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export default function RichTextEditorExample() {
  const [content, setContent] = React.useState(
    `<h2>Project Milestone Overview</h2><p>DesignKit is expanding with advanced rich content editing, modern media playback, and fluid micro-interactions.</p><blockquote>"Great design is making something memorable and meaningful."</blockquote><ul><li>Clean typography hierarchy</li><li>Integrated markdown/source toggle</li><li>Real-time word &amp; character analytics</li></ul>`
  );

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl p-4">
      <RichTextEditor
        value={content}
        onChange={(html) => setContent(html)}
        minHeight={180}
        placeholder="Type notes or announcements..."
      />
    </div>
  );
}
