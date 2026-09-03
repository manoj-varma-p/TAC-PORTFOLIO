"use client";

import { useState, useMemo } from "react";
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

type FilterMode = "all" | "short" | "normal";

export default function AfterEffectsShowcase({
  items,
}: {
  items: AfterEffectsItem[];
}) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [selected, setSelected] = useState(0);

  const filteredItems = useMemo(() => {
    if (filter === "short") return items.filter((item) => item.format === "short");
    if (filter === "normal") return items.filter((item) => item.format !== "short");
    return items;
  }, [items, filter]);

  // Safely clamp selected index when filter changes
  const activeIndex = Math.min(selected, Math.max(0, filteredItems.length - 1));
  const current = filteredItems[activeIndex] || filteredItems[0] || items[0];
  const isShort = current?.format === "short";

  const shortsCount = useMemo(() => items.filter((i) => i.format === "short").length, [items]);
  const normalCount = useMemo(() => items.filter((i) => i.format !== "short").length, [items]);

  const handleFilterChange = (newFilter: FilterMode) => {
    setFilter(newFilter);
    setSelected(0);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 py-4 sm:px-6 lg:px-[60px]">
      {/* Category Filter Pills */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => handleFilterChange("all")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
            filter === "all"
              ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
          }`}
        >
          All Works ({items.length})
        </button>
        <button
          onClick={() => handleFilterChange("short")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
            filter === "short"
              ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
          }`}
        >
          Vertical Shorts ({shortsCount})
        </button>
        <button
          onClick={() => handleFilterChange("normal")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
            filter === "normal"
              ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
          }`}
        >
          Cinematic Cuts ({normalCount})
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        {/* Title Wheel on Left */}
        <div className="relative h-[280px] w-full shrink-0 sm:h-[340px] lg:h-[580px] lg:w-[38%]">
          <OptionWheel
            key={`wheel-${filter}`}
            items={filteredItems.map((item) => item.title)}
            defaultSelected={activeIndex}
            side="left"
            fontSize={1.35}
            spacing={1.65}
            inset={8}
            tilt={12}
            curve={1.1}
            blur={1.2}
            fade={0.15}
            minOpacity={0.35}
            textColor="#666666"
            activeColor="#ffffff"
            onChange={(index) => setSelected(index)}
          />
        </div>

        {/* Video Player on Right */}
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center">
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

          <div className="mt-4 max-w-xl text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="rounded bg-gold/10 px-2 py-0.5 text-[11px] font-bold tracking-widest text-gold uppercase border border-gold/20">
                {current.category || (isShort ? "Vertical Short" : "After Effects Cut")}
              </span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                {isShort ? "9:16 Vertical" : "16:9 Widescreen"}
              </span>
            </div>

            <p className="mt-2 text-[clamp(18px,2.2vw,24px)] font-bold text-white tracking-wide">
              {current.title}
            </p>

            {current.description && (
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                {current.description}
              </p>
            )}

            {current.youtubeId && (
              <a
                href={
                  isShort
                    ? `https://www.youtube.com/shorts/${current.youtubeId}`
                    : `https://www.youtube.com/watch?v=${current.youtubeId}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold/90 hover:text-gold transition-colors"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
