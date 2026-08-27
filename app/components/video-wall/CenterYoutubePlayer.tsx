"use client";

import { useEffect, useState } from "react";

export default function CenterYoutubePlayer({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  const [prevYoutubeId, setPrevYoutubeId] = useState(youtubeId);
  const [displayedId, setDisplayedId] = useState(youtubeId);
  const [transitioning, setTransitioning] = useState(false);

  if (youtubeId !== prevYoutubeId) {
    setPrevYoutubeId(youtubeId);
    setTransitioning(true);
  }

  useEffect(() => {
    if (!transitioning) return;
    const t = setTimeout(() => {
      setDisplayedId(youtubeId);
      setTransitioning(false);
    }, 260);
    return () => clearTimeout(t);
  }, [transitioning, youtubeId]);

  return (
    <div
      className="relative aspect-video w-[90vw] max-w-[560px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out sm:w-[min(45vw,92vh)] sm:max-w-none"
      style={{
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "scale(0.98)" : "scale(1)",
      }}
    >
      <iframe
        key={displayedId}
        src={`https://www.youtube.com/embed/${displayedId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        className="h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        frameBorder={0}
      />
    </div>
  );
}
