"use client";

import { useState, useMemo } from "react";
import FlexCarousel, { type FlexCarouselItem } from "./FlexCarousel";

export interface AIVideoItem extends FlexCarouselItem {
  id: string;
  videoUrl?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  tool?: string;
  category?: string;
  prompt?: string;
  duration?: string;
}

export function extractYouTubeId(input?: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

interface AIShowcaseProps {
  items: AIVideoItem[];
}

export default function AIShowcase({ items }: AIShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingInPlace, setIsPlayingInPlace] = useState(false);

  // Normalize items client-side to automatically resolve YouTube IDs and thumbnail posters
  const normalizedItems = useMemo(() => {
    return items.map((item) => {
      const ytId =
        extractYouTubeId(item.youtubeId) ||
        extractYouTubeId(item.youtubeUrl) ||
        extractYouTubeId(item.videoUrl);
      const poster =
        item.src && item.src.length > 0
          ? item.src
          : ytId
          ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
          : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&auto=format&fit=crop";

      return {
        ...item,
        src: poster,
        youtubeId: ytId || item.youtubeId,
      };
    });
  }, [items]);

  // Active item reference
  const currentItem = useMemo(() => {
    return normalizedItems[activeIndex] || normalizedItems[0];
  }, [normalizedItems, activeIndex]);

  // Automatically detect YouTube ID from current active item
  const currentYouTubeId = useMemo(() => {
    if (!currentItem) return null;
    return (
      extractYouTubeId(currentItem.youtubeId) ||
      extractYouTubeId(currentItem.youtubeUrl) ||
      extractYouTubeId(currentItem.videoUrl)
    );
  }, [currentItem]);

  const handlePlayInPlace = () => {
    setIsPlayingInPlace(true);
  };

  const handleStopPlaying = () => {
    setIsPlayingInPlace(false);
  };

  return (
    <div className="relative flex flex-1 flex-col w-full h-full overflow-hidden justify-between">
      {/* 1. Carousel Area: takes available space with zero overlap */}
      <div className="relative flex-1 w-full min-h-0 flex items-center justify-center overflow-hidden">
        {/* Ambient Glow Aura */}
        <div
          aria-hidden
          className="pointer-events-none absolute h-[320px] w-[520px] rounded-full bg-gradient-to-r from-teal-500/10 via-gold/15 to-teal-500/10 blur-[130px]"
        />

        {/* The React Bits WebGL FlexCarousel */}
        <FlexCarousel
          items={normalizedItems}
          preset="liquid"
          intro="rise"
          autoplay={!isPlayingInPlace}
          interval={3.2}
          cardHeight={0.52}
          gap={16}
          radius={16}
          squeeze={0.2}
          focusOnClick={false}
          captions={false}
          onChange={(index) => {
            setActiveIndex(index);
            // If changing card while playing, reset in-place playback
            if (isPlayingInPlace) setIsPlayingInPlace(false);
          }}
          onSelect={() => handlePlayInPlace()}
          className="h-full w-full"
        />

        {/* In-Place Video Playing State (Plays directly in the center card position) */}
        {isPlayingInPlace && currentItem && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 animate-fade-in pointer-events-auto">
            {/* Ambient Backdrop Filter */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleStopPlaying}
            />

            {/* In-Place Video Frame */}
            <div className="relative z-10 w-[min(90vw,680px)] aspect-video overflow-hidden rounded-2xl border border-gold/60 bg-black shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(255,184,0,0.3)] transition-all duration-300">
              {/* Close / Return Button */}
              <button
                type="button"
                onClick={handleStopPlaying}
                className="group absolute top-3 right-3 z-30 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-gold hover:bg-gold hover:text-black hover:scale-105"
              >
                <span>Close</span>
                <span className="text-xs">&times;</span>
              </button>

              {/* Title & Tag Overlay on Video */}
              <div className="pointer-events-none absolute top-3 left-3 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="font-bold">{currentItem.title}</span>
                {currentItem.tool && (
                  <span className="text-[10px] text-teal-300 font-mono">
                    [{currentItem.tool}]
                  </span>
                )}
              </div>

              {/* Live Video Player Element */}
              {currentYouTubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentYouTubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={currentItem.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder={0}
                />
              ) : currentItem.videoUrl ? (
                <video
                  src={currentItem.videoUrl}
                  poster={currentItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                  <img
                    src={currentItem.src}
                    alt={currentItem.title}
                    className="max-h-[65%] rounded-lg object-contain mb-3 border border-white/10"
                  />
                  <p className="text-xs text-zinc-300">
                    Video file ready: Drop your <code className="text-gold">.mp4</code> into <code className="text-teal-300">public/gallery/ai/</code>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Controls / Play Trigger: Positioned strictly UNDER the Blocks */}
      {!isPlayingInPlace && currentItem && (
        <div className="relative z-20 shrink-0 w-full flex flex-col items-center justify-center pb-6 pt-2 gap-2.5">
          {/* Attractive Glowing Circular Play Button */}
          <button
            type="button"
            onClick={handlePlayInPlace}
            aria-label={`Play ${currentItem.title}`}
            className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-gold/85 bg-[#0a0a0c]/90 text-white shadow-[0_0_25px_rgba(255,184,0,0.45),0_8px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-[0_0_40px_rgba(255,184,0,0.8),0_10px_25px_rgba(0,0,0,0.9)] active:scale-95 cursor-pointer"
          >
            {/* Radiant golden halo */}
            <span className="absolute -inset-1 rounded-full bg-gold/20 blur-md group-hover:bg-gold/40 transition-all duration-300 pointer-events-none" />
            {/* White play triangle */}
            <svg
              className="relative h-6 w-6 sm:h-7 sm:w-7 fill-white translate-x-0.5 group-hover:fill-gold transition-colors duration-300"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          {/* Metadata Capsule Pill */}
          <button
            type="button"
            onClick={handlePlayInPlace}
            aria-label={`Play ${currentItem.title}`}
            className="group relative flex items-center gap-2.5 sm:gap-3 rounded-full border border-gold/40 bg-gradient-to-r from-black/85 via-neutral-950/85 to-black/85 px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:scale-[1.02] cursor-pointer"
          >
            {/* Equalizer animation */}
            <span className="flex items-center gap-0.5 mr-0.5">
              <span className="h-2.5 w-0.5 rounded-full bg-gold animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="h-4 w-0.5 rounded-full bg-gold animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="h-2 w-0.5 rounded-full bg-gold animate-[pulse_1s_ease-in-out_infinite]" />
            </span>

            {/* Project Title */}
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white group-hover:text-gold transition-colors">
              {currentItem.title}
            </span>

            {/* AI Tool Tag */}
            {currentItem.tool && (
              <span className="rounded-full bg-teal-500/15 border border-teal-500/40 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase text-teal-300">
                {currentItem.tool}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
