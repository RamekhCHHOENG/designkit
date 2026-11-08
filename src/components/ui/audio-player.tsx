import * as React from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AudioPlayerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  title?: string;
  artist?: string;
  poster?: string;
  waveformHeights?: number[];
  autoPlay?: boolean;
}

const DEFAULT_WAVEFORM = [
  25, 45, 60, 30, 75, 90, 40, 85, 100, 70, 50, 65, 80, 95, 30, 60, 85, 40,
  70, 90, 65, 35, 55, 75, 40, 90, 80, 45, 60, 85, 95, 50, 70, 30, 45, 65,
];

export function AudioPlayer({
  src,
  title = "DesignKit Audio Track",
  artist = "Ambient System Soundscape",
  poster,
  waveformHeights = DEFAULT_WAVEFORM,
  autoPlay = false,
  className,
  ...props
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(180); // default 3:00 if simulated
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);

  // Time format mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      // simulated mode
      setIsPlaying((prev) => !prev);
      return;
    }

    try {
      if (audio.paused || audio.ended) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (err) {
      console.warn("Audio playback error:", err);
    }
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skip = (delta: number) => {
    const next = Math.max(0, Math.min(duration, currentTime + delta));
    seek(next);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
    }
  };

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Simulated progress if no actual src is playing
  React.useEffect(() => {
    if (!src && isPlaying) {
      const timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [src, isPlaying, duration]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      data-slot="audio-player"
      className={cn(
        "flex flex-col gap-3 rounded-2xl border bg-card p-4 text-card-foreground shadow-sm max-w-md w-full select-none",
        className
      )}
      {...props}
    >
      {src && (
        <audio
          ref={audioRef}
          src={src}
          autoPlay={autoPlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
        />
      )}

      {/* Top Track Info */}
      <div className="flex items-center gap-3">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="size-12 rounded-xl object-cover shadow-2xs shrink-0"
          />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-2xs shrink-0">
            <Sparkles className="size-5" />
          </div>
        )}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-semibold text-xs text-foreground truncate">
            {title}
          </span>
          <span className="text-[11px] text-muted-foreground truncate">
            {artist}
          </span>
        </div>

        {/* Speed menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSpeedMenu((p) => !p)}
            className="rounded-md border bg-muted/30 px-1.5 py-0.5 text-[10px] font-mono font-medium hover:bg-muted text-muted-foreground"
          >
            {playbackRate}x
          </button>
          {showSpeedMenu && (
            <div className="absolute right-0 top-full mt-1 z-50 flex flex-col rounded-lg border bg-popover p-1 shadow-md text-xs bg-background">
              {[0.75, 1, 1.25, 1.5, 2].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => changeSpeed(r)}
                  className={cn(
                    "rounded px-2 py-1 text-left text-[11px] hover:bg-muted",
                    playbackRate === r && "font-semibold text-primary"
                  )}
                >
                  {r}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Waveform Scrubber */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div
          className="relative flex items-center justify-between h-9 gap-1 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            seek(ratio * duration);
          }}
        >
          {waveformHeights.map((h, idx) => {
            const barPercent = (idx / waveformHeights.length) * 100;
            const isPlayed = barPercent <= progressPercent;
            return (
              <div
                key={idx}
                className={cn(
                  "w-1 rounded-full transition-all duration-150 group-hover:opacity-90",
                  isPlayed ? "bg-primary" : "bg-muted-foreground/25"
                )}
                style={{ height: `${Math.max(15, h)}%` }}
              />
            );
          })}
        </div>

        {/* Timestamps */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-1 border-t">
        {/* Playback Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => skip(-15)}
            title="Rewind 15s"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <RotateCcw className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95 shadow-xs"
          >
            {isPlaying ? (
              <Pause className="size-4 fill-current" />
            ) : (
              <Play className="size-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => skip(15)}
            title="Forward 15s"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <RotateCw className="size-3.5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleMute}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="size-3.5" />
            ) : (
              <Volume2 className="size-3.5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-14 h-1 rounded-full appearance-none bg-muted accent-primary cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
