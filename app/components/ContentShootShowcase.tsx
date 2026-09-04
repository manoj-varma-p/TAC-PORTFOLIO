"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export interface ContentShootItem {
  id: string;
  title: string;
  category: "Commercial" | "Fashion & Studio" | "Brand Campaign" | "Cinematic B-Roll" | "Creator Reel";
  client?: string;
  camera?: string;
  lens?: string;
  location?: string;
  format: "normal" | "short";
  youtubeId?: string;
  video?: string;
  poster?: string;
  description: string;
  tags?: string[];
}

interface ContentShootShowcaseProps {
  items: ContentShootItem[];
}

export default function ContentShootShowcase({ items }: ContentShootShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [autoPlayTimer, setAutoPlayTimer] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hudGrid, setHudGrid] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "ALL") return items;
    if (selectedCategory === "9:16 REELS") return items.filter((it) => it.format === "short");
    return items.filter((it) => it.category === selectedCategory);
  }, [items, selectedCategory]);

  // Categories list
  const categories = ["ALL", "COMMERCIAL", "FASHION & STUDIO", "BRAND CAMPAIGN", "CINEMATIC B-ROLL", "9:16 REELS"];

  // Ensure current index is safely within filtered bounds
  const currentIdx = Math.min(selectedIdx, Math.max(0, filteredItems.length - 1));
  const activeItem = filteredItems[currentIdx] || items[0];

  // Reset index when category changes
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedIdx(0);
  };

  // Auto-advance every 4.5 seconds (pauses on hover)
  useEffect(() => {
    if (!autoPlayTimer || filteredItems.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % filteredItems.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [autoPlayTimer, filteredItems.length, isHovered]);

  // Auto-scroll active carousel card into view
  useEffect(() => {
    if (carouselRef.current) {
      const activeEl = carouselRef.current.children[currentIdx] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [currentIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setSelectedIdx((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredItems.length]);

  return (
    <div
      className="mx-auto flex w-full max-w-[1540px] flex-1 flex-col gap-6"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Top Header & Category Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-gold">
              TAC CINEMA & PRODUCTION
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Content Shoot Archive
          </h1>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === "ALL"
                ? items.length
                : cat === "9:16 REELS"
                ? items.filter((it) => it.format === "short").length
                : items.filter((it) => it.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-gold text-black shadow-[0_0_16px_rgba(255,184,0,0.4)]"
                    : "border border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono ${isActive ? "text-black/70" : "text-gray-500"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeItem && (
        <div className="flex flex-col gap-6">
          {/* Main Director's Stage Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Cinema Viewfinder Screen (7 to 8 cols) */}
            <div className="lg:col-span-8 flex flex-col items-center justify-center">
              <div className="relative w-full">
                {/* Ambient Backlight Aura */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,184,0,0.25) 0%, rgba(120,60,220,0.15) 50%, transparent 80%)",
                  }}
                />

                {/* Viewfinder Monitor Frame */}
                <div
                  className={`relative mx-auto w-full overflow-hidden rounded-2xl border border-white/20 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-all duration-500 ${
                    activeItem.format === "short"
                      ? "max-w-[360px] aspect-[9/16] max-h-[580px]"
                      : "aspect-video max-w-full"
                  }`}
                >
                  {/* Viewfinder Telemetry Overlay */}
                  {hudGrid && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4">
                      {/* Top Bar HUD */}
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/80 drop-shadow">
                        <div className="flex items-center gap-2 rounded bg-black/60 px-2 py-0.5 backdrop-blur-sm border border-white/10">
                          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="font-bold text-red-400">REC</span>
                          <span className="text-gray-400">00:0{currentIdx + 1}:24:18</span>
                        </div>
                        <div className="flex items-center gap-2 rounded bg-black/60 px-2 py-0.5 backdrop-blur-sm border border-white/10">
                          <span className="text-gold">4K DCI</span>
                          <span className="text-gray-400">·</span>
                          <span>24.00 FPS</span>
                          <span className="text-gray-400">·</span>
                          <span>ISO 800</span>
                        </div>
                      </div>

                      {/* Center Framing Crosshairs */}
                      <div className="relative flex flex-1 items-center justify-center">
                        <div className="h-6 w-6 border-t border-b border-white/30" />
                        <div className="h-6 w-6 border-l border-r border-white/30 absolute" />
                        <span className="absolute text-gold/30 text-xs font-light select-none">+</span>
                      </div>

                      {/* Bottom Bar HUD */}
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/80 drop-shadow">
                        <div className="rounded bg-black/60 px-2 py-0.5 backdrop-blur-sm border border-white/10">
                          <span>{activeItem.camera || "ARRI ALEXA MINI LF"}</span>
                        </div>
                        <div className="rounded bg-black/60 px-2 py-0.5 backdrop-blur-sm border border-white/10 text-gold">
                          <span>{activeItem.format === "short" ? "9:16 VERTICAL" : "16:9 ANAMORPHIC"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Corner Target Markers */}
                  <div className="pointer-events-none absolute inset-3 z-10 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="h-3.5 w-3.5 border-t-2 border-l-2 border-gold/70" />
                      <div className="h-3.5 w-3.5 border-t-2 border-r-2 border-gold/70" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3.5 w-3.5 border-b-2 border-l-2 border-gold/70" />
                      <div className="h-3.5 w-3.5 border-b-2 border-r-2 border-gold/70" />
                    </div>
                  </div>

                  {/* Video Player */}
                  {activeItem.youtubeId ? (
                    <iframe
                      key={activeItem.youtubeId}
                      src={`https://www.youtube.com/embed/${activeItem.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&enablejsapi=1`}
                      title={activeItem.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      frameBorder={0}
                    />
                  ) : (
                    <video
                      key={activeItem.video}
                      src={activeItem.video}
                      poster={activeItem.poster}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>

                {/* Viewfinder Tool Controls */}
                <div className="mt-3 flex items-center justify-between px-2 text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setHudGrid((prev) => !prev)}
                      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-mono transition-colors ${
                        hudGrid
                          ? "bg-gold/15 text-gold border border-gold/30"
                          : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <span>HUD Telemetry {hudGrid ? "ON" : "OFF"}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-gray-500">
                      Use [←] [→] to navigate shoots
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Production Slate & Gear Spec (4 cols) */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
                {/* Header Tag & Counter */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="rounded bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold border border-gold/30">
                    {activeItem.category}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {currentIdx + 1} of {filteredItems.length}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-4 text-xl sm:text-2xl font-black leading-snug tracking-wide text-white">
                  {activeItem.title}
                </h2>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Technical Production Specs */}
                <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold/80 mb-2">
                    CAMERA RIG & PRODUCTION DETAILS
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {activeItem.client && (
                      <div className="rounded-lg bg-black/40 p-2.5 border border-white/5">
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">Client / Brand</span>
                        <span className="font-semibold text-white truncate block">{activeItem.client}</span>
                      </div>
                    )}
                    {activeItem.camera && (
                      <div className="rounded-lg bg-black/40 p-2.5 border border-white/5">
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">Camera Rig</span>
                        <span className="font-semibold text-white truncate block">{activeItem.camera}</span>
                      </div>
                    )}
                    {activeItem.lens && (
                      <div className="rounded-lg bg-black/40 p-2.5 border border-white/5">
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">Optics / Lens</span>
                        <span className="font-semibold text-white truncate block">{activeItem.lens}</span>
                      </div>
                    )}
                    {activeItem.location && (
                      <div className="rounded-lg bg-black/40 p-2.5 border border-white/5">
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">Location</span>
                        <span className="font-semibold text-white truncate block">{activeItem.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {activeItem.tags && activeItem.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                    {activeItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-gray-300 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  {activeItem.youtubeId && (
                    <a
                      href={
                        activeItem.format === "short"
                          ? `https://www.youtube.com/shorts/${activeItem.youtubeId}`
                          : `https://www.youtube.com/watch?v=${activeItem.youtubeId}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-gold-bright hover:shadow-[0_0_20px_rgba(255,184,0,0.4)]"
                    >
                      <span>Watch on YouTube</span>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}

                  {/* Prev / Next Nav */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelectedIdx((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:border-gold hover:bg-gold hover:text-black transition-all"
                      title="Previous Project"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedIdx((prev) => (prev + 1) % filteredItems.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:border-gold hover:bg-gold hover:text-black transition-all"
                      title="Next Project"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Film Deck Carousel */}
          <div className="relative mt-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  PRODUCTION FILM REEL
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-gold">
                  {filteredItems.length} SHOOTS
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAutoPlayTimer((prev) => !prev)}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-gray-300 hover:text-white transition-colors"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      autoPlayTimer ? "bg-emerald-400 animate-pulse" : "bg-gray-500"
                    }`}
                  />
                  <span>{autoPlayTimer ? "Auto-Play ON" : "Auto-Play PAUSED"}</span>
                </button>
              </div>
            </div>

            {/* Horizontal Film Cards */}
            <div
              ref={carouselRef}
              className="flex items-center gap-3.5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-white/20"
            >
              {filteredItems.map((item, idx) => {
                const isSelected = idx === currentIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border text-left transition-all duration-300 ${
                      isSelected
                        ? "w-[240px] sm:w-[280px] border-gold ring-2 ring-gold/40 shadow-[0_0_25px_rgba(255,184,0,0.35)] scale-[1.02]"
                        : "w-[190px] sm:w-[220px] border-white/10 bg-white/[0.02] opacity-65 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    {/* Thumbnail preview */}
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                      <img
                        src={item.poster || `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold border border-gold/30">
                          {item.category}
                        </span>
                        {item.format === "short" && (
                          <span className="rounded bg-rose-500/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            9:16
                          </span>
                        )}
                      </div>

                      {/* Active Indicator Pulse */}
                      {isSelected && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-gold border border-gold/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                          <span>NOW PLAYING</span>
                        </div>
                      )}
                    </div>

                    {/* Card Meta */}
                    <div className="p-3">
                      <p className={`text-xs font-bold tracking-wide truncate ${isSelected ? "text-gold" : "text-white"}`}>
                        {item.title}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5">
                        {item.camera || item.client || "Cinema Production"}
                      </p>
                    </div>

                    {/* Active Bottom Progress Bar */}
                    {isSelected && (
                      <div className="h-0.5 w-full bg-gold animate-[glow-pulse_2s_infinite]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
