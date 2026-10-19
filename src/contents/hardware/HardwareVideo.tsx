import { useState } from "react";

interface HardwareVideoProps {
  src: string;
  title: string;
  poster: string;
  aspectRatio: number;
}

export function HardwareVideo({
  src,
  title,
  poster,
  aspectRatio,
}: HardwareVideoProps) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="hardware-video-frame" style={{ aspectRatio }}>
      {playing ? (
        <iframe
          src={`${src}?autoplay=1`}
          title={title}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="border-0"
        />
      ) : (
        <button
          className="hardware-video-cover"
          type="button"
          aria-label={`Play ${title}`}
          onClick={() => setPlaying(true)}
        >
          <img src={poster} alt="" loading="lazy" decoding="async" />
          <span className="hardware-play-button" aria-hidden="true">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
