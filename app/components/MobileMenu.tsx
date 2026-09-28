"use client";

import { useState, useEffect } from "react";
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
  ArrowUpRight,
  InstagramIcon,
  LinkedInIcon,
} from "./icons";
import { navItems } from "./navItems";

const navIcons: Record<string, ReactNode> = {
  Photoshop: <PhotoshopIcon className="h-7 w-7" />,
  "Premiere Pro": <PremiereIcon className="h-7 w-7" />,
  Illustrator: <IllustratorIcon className="h-7 w-7" />,
  "After Effects": <AfterEffectsIcon className="h-7 w-7" />,
  "DaVinci Resolve": <DaVinciIcon className="h-7 w-7" />,
  AI: <AIIcon className="h-7 w-7" />,
  "Spotlight Saturday": <SpotlightIcon className="h-7 w-7" />,
};

import { useAutoTour } from "../context/AutoTourContext";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const {
    isActive: isTourActive,
    isPaused: isTourPaused,
    currentStepIndex,
    totalSteps,
    startTour,
    stopTour,
    togglePause,
  } = useAutoTour();

  // Prevent background scrolling when fullscreen menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Hamburger / Close Button in Header */}
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full hover:bg-white/10 transition-colors"
      >
        <span
          className={`h-0.5 w-5 bg-white transition-all duration-300 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-white transition-all duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-white transition-all duration-300 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Fullscreen Overlay covering the entire page from top to bottom */}
      {open && (
        <div className="fixed inset-0 z-40 flex h-dvh w-full flex-col justify-between bg-bg/98 px-6 pt-20 pb-8 backdrop-blur-2xl overflow-y-auto">
          {/* Ambient Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[350px] w-[350px] rounded-full bg-gold/15 blur-[120px]"
          />

          {/* Auto Tour Mode Quick Card */}
          <div className="relative mb-3 rounded-xl border border-gold/40 bg-gold/10 p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className={`inline-flex rounded-full h-2.5 w-2.5 ${
                      isTourActive
                        ? isTourPaused
                          ? "bg-amber-400"
                          : "bg-emerald-400 animate-pulse"
                        : "bg-gold"
                    }`}
                  />
                  {isTourActive && !isTourPaused && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  )}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    {isTourActive
                      ? `AUTO TOUR ACTIVE (${currentStepIndex + 1}/${totalSteps})`
                      : "AUTO SHOWCASE TOUR"}
                  </h4>
                  <p className="text-[10px] text-gray-light">
                    {isTourActive
                      ? isTourPaused
                        ? "Tour is paused"
                        : "Looping through entire website"
                      : "Showcase every section automatically"}
                  </p>
                </div>
              </div>

              {!isTourActive ? (
                <button
                  type="button"
                  onClick={() => {
                    startTour();
                    setOpen(false);
                  }}
                  className="rounded-[4px] border border-gold bg-gold px-3 py-1.5 text-[11px] font-bold text-black shadow-[0_0_12px_rgba(255,184,0,0.5)] active:scale-95"
                >
                  START
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={togglePause}
                    className="rounded-[4px] border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white"
                  >
                    {isTourPaused ? "RESUME" : "PAUSE"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      stopTour();
                      setOpen(false);
                    }}
                    className="rounded-[4px] border border-red-500/40 bg-red-500/20 px-2 py-1 text-[10px] font-semibold text-red-300"
                  >
                    EXIT
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links Grid filling the screen */}
          <div className="relative my-auto flex flex-col gap-3 py-2">
            <p className="text-[11px] font-bold tracking-[0.25em] text-gold uppercase mb-1">
              EXPLORE SHOWCASES
            </p>
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group relative flex items-center gap-3 rounded-xl border p-3.5 transition-all duration-200 ${
                      isActive
                        ? "border-gold bg-gold/15 text-white shadow-[0_0_20px_rgba(255,184,0,0.3)]"
                        : "border-white/10 bg-white/[0.03] text-gray-light hover:border-gold/50 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <span
                      className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? "drop-shadow-[0_0_10px_rgba(255,184,0,0.8)]" : ""
                      }`}
                    >
                      {navIcons[item.label]}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-xs font-bold tracking-wider uppercase truncate ${
                          isActive ? "text-gold" : "text-white group-hover:text-gold"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="text-[10px] text-gray-muted tracking-wide">
                        {isActive ? "Viewing" : "Showcase"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Footer Section in Fullscreen Menu */}
          <div className="relative flex items-center justify-between border-t border-white/10 pt-5 mt-4">
            <a
              href="https://wa.me/919848000274"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-[4px] border border-gold/70 bg-gold/10 px-5 py-2.5 text-xs font-bold tracking-wide text-white hover:bg-gold hover:text-black transition-all"
            >
              LET&apos;S TALK
              <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/tac_theartcode?igsi=dTk2NGpvb2ZoZmVx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-light hover:border-gold hover:text-gold transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/tac-the-art-code/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-light hover:border-gold hover:text-gold transition-colors"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
