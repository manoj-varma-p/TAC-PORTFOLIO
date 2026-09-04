"use client";

import { useState } from "react";
import OptionWheel from "./OptionWheel";

export interface AfterEffectsItem {
  title: string;
  video?: string;
  youtubeId?: string;
  poster?: string;
  format?: "normal" | "short";
  category?: string;
  description?: string;
}

export default function AfterEffectsShowcase({
  items,
}: {
  items: AfterEffectsItem[];
}) {
  const [selected, setSelected] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Safely clamp selected index
  const activeIndex = Math.min(selected, Math.max(0, items.length - 1));
  const current = items[activeIndex] || items[0];
  const isShort = current?.format === "short";

  return (
    <div
      className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 pt-1 pb-4 sm:px-6 sm:pt-2 lg:px-[60px] lg:pt-3"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        {/* Title Wheel on Left */}
        <div
          className="relative h-[320px] w-full shrink-0 sm:h-[380px] lg:h-[620px] lg:w-[46%] overflow-visible pl-4 sm:pl-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <OptionWheel
            items={items.map((item) => item.title)}
            defaultSelected={activeIndex}
            side="left"
            fontSize={1.4}
            spacing={1.75}
            inset={40}
            tilt={16}
            curve={1.3}
            blur={0}
            fade={0.09}
            minOpacity={0.45}
            textColor="#b8b8b8"
            activeColor="#ffffff"
            loop={true}
            autoScroll={true}
            autoScrollInterval={3000}
            pauseOnHover={true}
            paused={isHovered}
            onChange={(index: number) => setSelected(index)}
          />
        </div>

        {/* Video Player on Right */}
        <div
          className="flex min-w-0 flex-1 flex-col items-center justify-center mt-3 sm:mt-5 lg:mt-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`relative w-full overflow-hidden rounded-2xl bg-black shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/15 transition-all duration-300 ${
              isShort
                ? "max-w-[330px] aspect-[9/16] max-h-[560px] mx-auto"
                : "aspect-video w-full max-w-2xl"
            }`}
          >
            {current.youtubeId ? (
              <iframe
                key={current.youtubeId}
                src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={current.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                frameBorder={0}
              />
            ) : (
              <video
                key={current.video}
                src={current.video}
                poster={current.poster}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain"
              />
            )}
          </div>

          {current.youtubeId && (
            <div className="mt-3 text-center">
              <a
                href={
                  isShort
                    ? `https://www.youtube.com/shorts/${current.youtubeId}`
                    : `https://www.youtube.com/watch?v=${current.youtubeId}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold/90 hover:text-gold transition-colors"
              >
                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
