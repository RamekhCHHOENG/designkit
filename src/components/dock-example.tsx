import * as React from "react";
import {
  CompassIcon,
  FolderIcon,
  MailIcon,
  MessageSquareIcon,
  MusicIcon,
  SettingsIcon,
  TerminalIcon,
} from "lucide-react";
import { Example, ExampleWrapper } from "@/components/example";
import { Dock, DockIcon, DockSeparator } from "@/components/ui/dock";

export default function DockExample() {
  const [activeApp, setActiveApp] = React.useState("Mail");

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="macOS Physics-Based Dock">
        <div className="flex w-full flex-col items-center justify-center gap-8 py-8">
          <p className="text-xs text-muted-foreground">
            Hover over icons to experience smooth proximity magnification and tooltips.
          </p>

          <Dock magnification={68} distance={130} baseSize={44}>
            <DockIcon
              label="Mail"
              active={activeApp === "Mail"}
              onClick={() => setActiveApp("Mail")}
            >
              <MailIcon className="size-full text-sky-500" />
            </DockIcon>
            <DockIcon
              label="Messages"
              active={activeApp === "Messages"}
              onClick={() => setActiveApp("Messages")}
            >
              <MessageSquareIcon className="size-full text-emerald-500" />
            </DockIcon>
            <DockIcon
              label="Safari"
              active={activeApp === "Safari"}
              onClick={() => setActiveApp("Safari")}
            >
              <CompassIcon className="size-full text-blue-500" />
            </DockIcon>
            <DockIcon
              label="Music"
              active={activeApp === "Music"}
              onClick={() => setActiveApp("Music")}
            >
              <MusicIcon className="size-full text-rose-500" />
            </DockIcon>

            <DockSeparator />

            <DockIcon
              label="Files"
              active={activeApp === "Files"}
              onClick={() => setActiveApp("Files")}
            >
              <FolderIcon className="size-full text-amber-500" />
            </DockIcon>
            <DockIcon
              label="Terminal"
              active={activeApp === "Terminal"}
              onClick={() => setActiveApp("Terminal")}
            >
              <TerminalIcon className="size-full text-purple-500" />
            </DockIcon>
            <DockIcon
              label="Settings"
              active={activeApp === "Settings"}
              onClick={() => setActiveApp("Settings")}
            >
              <SettingsIcon className="size-full text-slate-500" />
            </DockIcon>
          </Dock>
        </div>
      </Example>
    </ExampleWrapper>
  );
}
