"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  PhotoshopIcon,
  PremiereIcon,
  IllustratorIcon,
  AfterEffectsIcon,
  DaVinciIcon,
  AIIcon,
  SpotlightIcon,
  PencilIcon,
  MegaphoneIcon,
  ArrowUpRight,
} from "./icons";
import MobileMenu from "./MobileMenu";
import { navItems } from "./navItems";

const navIcons: Record<string, ReactNode> = {
  Photoshop: <PhotoshopIcon className="h-9 w-9" />,
  "Premiere Pro": <PremiereIcon className="h-9 w-9" />,
  Illustrator: <IllustratorIcon className="h-9 w-9" />,
  "After Effects": <AfterEffectsIcon className="h-9 w-9" />,
  "DaVinci Resolve": <DaVinciIcon className="h-9 w-9" />,
  AI: <AIIcon className="h-9 w-9" />,
  "Spotlight Saturday": <SpotlightIcon className="h-9 w-9" />,
};

import { useAutoTour } from "../context/AutoTourContext";

export default function Navbar() {
  const pathname = usePathname();
  const {
    isActive: isTourActive,
    isPaused: isTourPaused,
    currentStepIndex,
    totalSteps,
    startTour,
    stopTour,
    togglePause,
    nextStep,
  } = useAutoTour();

  return (
    <header className="animate-navbar sticky top-0 z-20 w-full border-b border-border/60 bg-bg/85 backdrop-blur-sm lg:h-20">
      <div className="relative flex h-full w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-8 lg:px-10 lg:py-0">
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="TAC - The Art Code"
            className="h-11 sm:h-12 lg:h-13 w-auto object-contain transition-transform duration-200 hover:scale-105"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-3 md:flex lg:gap-5 xl:gap-7">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex flex-col items-center gap-1 text-center transition-all duration-300 py-1 ${
                  isActive ? "text-gold" : "text-gray-light"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  {isActive && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-2 rounded-full bg-gold/30 blur-md animate-pulse"
                    />
                  )}
                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? "scale-115 opacity-100 drop-shadow-[0_0_12px_rgba(255,184,0,0.9)] drop-shadow-[0_0_24px_rgba(255,184,0,0.55)]"
                        : "opacity-75 group-hover:scale-110 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(255,184,0,0.45)]"
                    }`}
                  >
                    {navIcons[item.label]}
                  </span>
                </div>
                <span
                  className={`hidden whitespace-nowrap text-[10.5px] tracking-[0.09em] transition-all duration-200 lg:inline ${
                    isActive
                      ? "font-bold text-gold drop-shadow-[0_0_8px_rgba(255,184,0,0.5)]"
                      : "font-semibold text-gray-light group-hover:text-gold"
                  }`}
                >
                  {item.label.toUpperCase()}
                </span>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute -bottom-1 h-0.5 w-6 rounded-full bg-gold shadow-[0_0_10px_rgba(255,184,0,1)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Auto Tour Showcase Control Button */}
          {!isTourActive ? (
            <button
              type="button"
              onClick={startTour}
              className="group flex items-center gap-1.5 sm:gap-2 rounded-[4px] border border-gold/50 bg-gold/10 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 text-[11px] sm:text-[13px] font-semibold tracking-wide text-gold transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/20 hover:shadow-[0_0_18px_rgba(255,184,0,0.4)] cursor-pointer"
              title="Auto Showcase: Tour entire website in a loop"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <svg viewBox="0 0 24 24" className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" aria-hidden>
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
              <span className="hidden sm:inline">AUTO TOUR</span>
              <span className="sm:hidden">TOUR</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-[4px] border border-gold/70 bg-black/80 px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(255,184,0,0.3)]">
              {/* Tour progress step indicator */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`inline-flex rounded-full h-2 w-2 ${
                      isTourPaused ? "bg-amber-400" : "bg-emerald-400 animate-pulse"
                    }`}
                  />
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-gold uppercase whitespace-nowrap">
                  TOUR {currentStepIndex + 1}/{totalSteps}
                </span>
              </div>

              <div className="h-3.5 w-px bg-gold/30 mx-0.5" />

              {/* Pause / Resume Button */}
              <button
                type="button"
                onClick={togglePause}
                className="flex items-center gap-1 text-[11px] sm:text-[12px] font-semibold text-white hover:text-gold transition-colors px-1 py-0.5 cursor-pointer"
                title={isTourPaused ? "Resume Tour (Space)" : "Pause Tour (Space)"}
              >
                {isTourPaused ? (
                  <>
                    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current text-gold" aria-hidden>
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                    <span className="hidden md:inline text-[11px]">RESUME</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current text-gold" aria-hidden>
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    <span className="hidden md:inline text-[11px]">PAUSE</span>
                  </>
                )}
              </button>

              {/* Skip to Next */}
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center text-white/80 hover:text-gold transition-colors p-0.5 cursor-pointer"
                title="Skip to next page"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Exit Tour */}
              <button
                type="button"
                onClick={stopTour}
                className="flex items-center justify-center h-4 w-4 rounded text-gray-light hover:text-white hover:bg-white/10 transition-colors ml-0.5 cursor-pointer"
                title="Exit Tour (Esc)"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current" fill="none" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          <a
            href="https://wa.me/919848000274"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 sm:gap-2 rounded-[4px] border border-gold/70 px-3 py-1.5 sm:px-5 sm:py-2.5 text-[11px] sm:text-[13px] font-semibold tracking-wide text-white transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_0_20px_rgba(255,184,0,0.35)]"
          >
            LET&apos;S TALK
            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
