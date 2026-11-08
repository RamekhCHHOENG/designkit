import * as React from "react";
import {
  IconMotion,
  MorphMenuToggle,
  MorphPlayToggle,
} from "@/components/ui/icon-motion";
import {
  Search,
  X,
  Volume2,
  VolumeX,
  Heart,
  Bookmark,
  Check,
  Sun,
  Moon,
  Copy,
} from "lucide-react";

export default function IconMotionExample() {
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  return (
    <div className="flex flex-col gap-6 p-4 max-w-lg w-full">
      {/* SVG Morph Presets */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          SVG Morph Line Transitions
        </span>
        <div className="flex items-center gap-3">
          <MorphMenuToggle />
          <MorphPlayToggle />
        </div>
      </div>

      {/* Spring Morph Icon Pairs */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Spring Morph Icon Transitions
        </span>
        <div className="flex items-center gap-3">
          {/* Search <-> Close */}
          <IconMotion
            isToggled={isSearchActive}
            onToggle={setIsSearchActive}
            firstIcon={<Search className="size-4" />}
            secondIcon={<X className="size-4 text-rose-500" />}
            title="Search / Close"
          />

          {/* Sound / Mute */}
          <IconMotion
            isToggled={isMuted}
            onToggle={setIsMuted}
            firstIcon={<Volume2 className="size-4 text-emerald-500" />}
            secondIcon={<VolumeX className="size-4 text-rose-500" />}
            title="Sound / Mute"
          />

          {/* Sun / Moon Theme */}
          <IconMotion
            isToggled={isDark}
            onToggle={setIsDark}
            firstIcon={<Sun className="size-4 text-amber-500" />}
            secondIcon={<Moon className="size-4 text-indigo-400" />}
            transition="morph"
            title="Light / Dark"
          />

          {/* Copy / Checkmark */}
          <IconMotion
            isToggled={isCopied}
            onToggle={(active) => {
              setIsCopied(active);
              if (active) setTimeout(() => setIsCopied(false), 2000);
            }}
            firstIcon={<Copy className="size-4" />}
            secondIcon={<Check className="size-4 text-emerald-500 stroke-[3]" />}
            transition="morph"
            title="Copy to clipboard"
          />
        </div>
      </div>

      {/* Flip & Slide Variations */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          3D Flip & Slide Transitions
        </span>
        <div className="flex items-center gap-3">
          <IconMotion
            isToggled={isBookmarked}
            onToggle={setIsBookmarked}
            firstIcon={<Bookmark className="size-4 text-muted-foreground" />}
            secondIcon={<Bookmark className="size-4 fill-primary text-primary" />}
            transition="flip"
            title="Bookmark (3D Flip)"
          />

          <IconMotion
            firstIcon={<Heart className="size-4 text-muted-foreground" />}
            secondIcon={<Heart className="size-4 fill-rose-500 text-rose-500" />}
            transition="slide"
            title="Favorite (Vertical Slide)"
          />
        </div>
      </div>
    </div>
  );
}
