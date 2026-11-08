import * as React from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture,
  RotateCcw,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface VideoPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  title?: string;
  badge?: string;
  autoHideControlsMs?: number;
}

export function VideoPlayer({
  src = "/sample-video.mp4",
  poster,
  title,
  badge = "HD",
  autoHideControlsMs = 3000,
  className,
  ...props
}: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [activeSrc, setActiveSrc] = React.useState(src || "/sample-video.mp4");

  React.useEffect(() => {
    setActiveSrc(src || "/sample-video.mp4");
  }, [src]);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);

  const hideTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Time formatting mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const triggerAutoHide = React.useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, autoHideControlsMs);
    }
  }, [isPlaying, autoHideControlsMs]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (video.paused || video.ended) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (err) {
      console.warn("Video play error:", err);
    }
    triggerAutoHide();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && volume === 0) {
      video.volume = 0.5;
      setVolume(0.5);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      await video.requestPictureInPicture();
    }
  };

  const changeSpeed = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSpeedMenu(false);
    }
  };

  // Keyboard shortcut listener
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "f") {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === "m") {
      e.preventDefault();
      toggleMute();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={triggerAutoHide}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
      data-slot="video-player"
      className={cn(
        "relative group flex items-center justify-center overflow-hidden rounded-2xl bg-black aspect-video select-none shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <video
        ref={videoRef}
        src={activeSrc}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onTimeUpdate={() => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          if (activeSrc !== "/sample-video.mp4") {
            setActiveSrc("/sample-video.mp4");
          }
        }}
        className="w-full h-full object-cover cursor-pointer"
        {...props}
      />

      {/* Top Header Overlay */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between transition-opacity duration-300 z-20 pointer-events-none",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-sm font-medium text-white/95 drop-shadow-md truncate">
          {title}
        </span>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>

      {/* Center Big Play Button */}
      <div
        onClick={togglePlay}
        className={cn(
          "absolute flex items-center justify-center cursor-pointer transition-all duration-300 z-10",
          !isPlaying
            ? "opacity-100 scale-100"
            : showControls
            ? "opacity-60 hover:opacity-100 scale-95 hover:scale-105"
            : "opacity-0 scale-75 pointer-events-none"
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-xl transition-transform">
          {isPlaying ? (
            <Pause className="size-6 fill-current" />
          ) : (
            <Play className="size-6 fill-current ml-1" />
          )}
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300 z-20",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Scrubber Timeline */}
        <div className="relative flex items-center w-full group/slider">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary group-hover/slider:h-2 transition-all outline-none"
          />
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center justify-between text-white/90 text-xs">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="p-1 hover:text-white transition-colors"
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="size-4 fill-current" />
              )}
            </button>

            {/* Replay 10s */}
            <button
              type="button"
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime -= 10;
              }}
              className="p-1 hover:text-white transition-colors"
              title="Rewind 10s"
              aria-label="Rewind 10s"
            >
              <RotateCcw className="size-3.5" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 group/vol">
              <button
                type="button"
                onClick={toggleMute}
                className="p-1 hover:text-white transition-colors"
                title={isMuted ? "Unmute (M)" : "Mute (M)"}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-white outline-none"
              />
            </div>

            {/* Time Stamp */}
            <span className="font-mono text-[11px] text-white/80 select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2 py-0.5 rounded hover:bg-white/10 text-[11px] font-mono font-medium transition-colors"
                title="Playback Speed"
              >
                {playbackRate}x
              </button>

              {showSpeedMenu && (
                <div className="absolute right-0 bottom-full mb-2 bg-black/90 backdrop-blur-md border border-white/15 rounded-lg py-1 shadow-xl flex flex-col z-30">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => changeSpeed(rate)}
                      className={cn(
                        "px-3 py-1 text-left text-[11px] hover:bg-white/20 transition-colors",
                        playbackRate === rate ? "text-primary font-bold" : "text-white/80"
                      )}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PiP */}
            <button
              type="button"
              onClick={togglePiP}
              className="p-1 hover:text-white transition-colors"
              title="Picture in Picture"
              aria-label="Picture in Picture"
            >
              <PictureInPicture className="size-4" />
            </button>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1 hover:text-white transition-colors"
              title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
              aria-label="Fullscreen"
            >
              {isFullscreen ? (
                <Minimize className="size-4" />
              ) : (
                <Maximize className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
