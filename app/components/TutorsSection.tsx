"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { MorphItem } from "./MorphSlider";

const DEFAULT_TUTORS: MorphItem[] = [
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
    caption: "Sarah Jenkins",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop",
    caption: "Marcus Ray",
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop",
    caption: "Priya Sharma",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1600&auto=format&fit=crop",
    caption: "Alexandre Vance",
  },
];

export default function TutorsSection({
  items,
}: {
  items?: MorphItem[];
}) {
  const tutorList = items && items.length > 0 ? items : DEFAULT_TUTORS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = tutorList.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Autoplay every 2 seconds
  useEffect(() => {
    if (isPaused || total <= 1 || isFullscreen) return;
    timerRef.current = setTimeout(nextSlide, 2000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, isFullscreen, nextSlide, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 28 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 28 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      },
    }),
  };

  return (
    <section id="tutors" className="relative overflow-hidden pt-4 pb-16 sm:pt-6 sm:pb-20 lg:pt-8 lg:pb-24">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full opacity-25 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.3) 0%, rgba(255,184,0,0.06) 50%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-[60px]">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[620px]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-gold animate-pulse" />
              <p className="animate-eyebrow text-[13px] font-semibold tracking-[0.3em] text-gold">
                TAC FACULTY & MENTORS
              </p>
            </div>
            <h2 className="animate-heading mt-3 text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-tight text-white">
              Learn From Masters of <span className="text-gold">The Craft.</span>
            </h2>
            <p className="animate-description mt-4 text-[16px] leading-relaxed text-gray-light sm:text-[18px]">
              Active industry leads bringing studio-grade workflows directly to you.
              Select any mentor below to inspect their master profile.
            </p>
          </div>

          {/* Slide counter & Navigation Arrow Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-sm font-semibold tracking-wider text-gray-muted mr-1 font-mono">
              <span className="text-gold font-bold text-base">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>{" "}
              / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Tutor"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-gold hover:text-gold active:scale-95 cursor-pointer shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Tutor"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-gold hover:text-gold active:scale-95 cursor-pointer shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mentor Selector Pill Tabs */}
        <div className="mt-8 -mx-3 flex items-center gap-2.5 overflow-x-auto px-3 py-3 scrollbar-none">
          {tutorList.map((tutor, idx) => {
            const isActive = idx === currentIndex;
            const fullName = tutor.caption || `Mentor ${idx + 1}`;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`group m-0.5 flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2 text-[13px] font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-gold bg-gradient-to-r from-gold/25 via-gold/15 to-gold/25 text-white shadow-[0_0_25px_rgba(255,184,0,0.45)] ring-1 ring-gold/60 scale-105"
                    : "border-white/15 bg-white/[0.05] text-gray-200 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black transition-all ${
                    isActive
                      ? "bg-gold text-black shadow-[0_0_10px_#FFB800]"
                      : "bg-white/10 text-gray-300 group-hover:bg-gold group-hover:text-black"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className={isActive ? "text-gold-bright font-extrabold" : "font-semibold"}>
                  {fullName}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Cinema Stage / Showcase Deck */}
        <div
          className="relative mx-auto mt-6 w-full max-w-[1240px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ perspective: "1200px" }}
        >
          <div className="relative flex items-center justify-center py-4">
            {/* Left Preview Card (Clickable) */}
            {total > 1 && (
              <div
                onClick={prevSlide}
                className="hidden lg:block absolute left-0 w-[42%] aspect-[1600/1131] -translate-x-[20%] scale-90 cursor-pointer overflow-hidden rounded-2xl border border-white/10 opacity-35 transition-all duration-500 hover:opacity-70 hover:scale-95 z-0"
                style={{
                  transform: "translateX(-22%) scale(0.86) rotateY(18deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={tutorList[prevIndex].image}
                  alt="Previous mentor"
                  className="h-full w-full object-contain bg-[#08080a]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Center Active Spotlight Stage */}
            <div className="relative z-10 w-full max-w-[960px] aspect-[1600/1131] overflow-hidden rounded-2xl border border-white/20 bg-[#08080a] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.95),0_0_50px_rgba(255,184,0,0.12)]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 h-full w-full cursor-zoom-in"
                  onClick={() => setIsFullscreen(true)}
                >
                  <img
                    src={tutorList[currentIndex].image}
                    alt={tutorList[currentIndex].caption ?? `Tutor ${currentIndex + 1}`}
                    draggable={false}
                    className="h-full w-full object-contain bg-[#08080a]"
                  />
                  {/* Subtle top-right zoom prompt */}
                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md opacity-0 transition-opacity hover:opacity-100 hover:text-gold pointer-events-none">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Preview Card (Clickable) */}
            {total > 1 && (
              <div
                onClick={nextSlide}
                className="hidden lg:block absolute right-0 w-[42%] aspect-[1600/1131] translate-x-[20%] scale-90 cursor-pointer overflow-hidden rounded-2xl border border-white/10 opacity-35 transition-all duration-500 hover:opacity-70 hover:scale-95 z-0"
                style={{
                  transform: "translateX(22%) scale(0.86) rotateY(-18deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={tutorList[nextIndex].image}
                  alt="Next mentor"
                  className="h-full w-full object-contain bg-[#08080a]"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-bg/90 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
          </div>

          {/* Autoplay Progress Indicator Bar */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {tutorList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
                  idx === currentIndex
                    ? "w-10 bg-gold shadow-[0_0_10px_rgba(255,184,0,0.6)]"
                    : "w-2 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {isFullscreen && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              className="relative max-h-[92vh] max-w-[94vw] aspect-[1600/1131] w-full overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close fullscreen"
                onClick={() => setIsFullscreen(false)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-xl text-white hover:bg-gold hover:text-black transition-colors cursor-pointer"
              >
                ×
              </button>
              <img
                src={tutorList[currentIndex].image}
                alt={tutorList[currentIndex].caption ?? "Tutor slide"}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
