'use client';

import { useState } from 'react';
import type { ProjectVideo } from '@/data/projects';

interface VideoCarouselProps {
  videos: ProjectVideo[];
}

const frameClass = 'rounded-2xl overflow-hidden border border-line bg-black';

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [index, setIndex] = useState(0);

  if (videos.length === 0) return null;

  // One video: plain player, sized to the video itself.
  if (videos.length === 1) {
    const [video] = videos;
    return (
      <div className={`${frameClass} flex justify-center`}>
        <video
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          className="max-w-full max-h-[80vh] w-auto h-auto"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  const go = (next: number) => setIndex((next + videos.length) % videos.length);
  const current = videos[index];

  // Several videos: fixed 16:9 stage so the controls don't jump between slides.
  // The <video> is keyed by index, so switching slides stops the one playing.
  return (
    <div className="flex flex-col gap-3" role="region" aria-roledescription="carousel" aria-label="Project videos">
      <div className={`${frameClass} relative aspect-video max-h-[80vh] w-full`}>
        <video
          key={index}
          src={current.src}
          poster={current.poster}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-contain"
          aria-label={`Video ${index + 1} of ${videos.length}`}
        >
          Your browser does not support the video tag.
        </video>
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous video"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-xl text-text backdrop-blur-sm hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next video"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-xl text-text backdrop-blur-sm hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          ›
        </button>
      </div>
      <div className="flex items-center justify-center gap-2">
        {videos.map((video, i) => (
          <button
            key={video.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show video ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-accent' : 'w-2.5 bg-line-strong hover:bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
