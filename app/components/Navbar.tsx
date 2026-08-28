import Link from "next/link";
import type { ReactNode } from "react";
import {
  PhotoshopIcon,
  PremiereIcon,
  IllustratorIcon,
  AfterEffectsIcon,
  DaVinciIcon,
  CameraIcon,
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
  "Content Shoot": <CameraIcon className="h-9 w-9" />,
  "Spotlight Saturday": <SpotlightIcon className="h-9 w-9" />,
};

export default function Navbar() {
  return (
    <header className="animate-navbar sticky top-0 z-20 border-b border-border/60 bg-bg/85 backdrop-blur-sm lg:h-20">
      <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10 lg:py-0">
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="TAC - The Art Code"
            className="h-12 sm:h-13 w-auto object-contain transition-transform duration-200 hover:scale-105"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-3 md:flex lg:gap-5 xl:gap-7">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center gap-1 text-center"
            >
              <span className="opacity-95 transition-all duration-200 group-hover:scale-110 group-hover:opacity-100">
                {navIcons[item.label]}
              </span>
              <span className="hidden whitespace-nowrap text-[10.5px] font-semibold tracking-[0.09em] text-gray-light transition group-hover:text-gold lg:inline">
                {item.label.toUpperCase()}
              </span>
            </Link>
          ))}
        </nav>

        <a
          href="#contact"
          className="group hidden shrink-0 items-center gap-2 rounded-[4px] border border-gold/70 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_0_20px_rgba(255,184,0,0.35)] sm:flex"
        >
          LET&apos;S TALK
          <ArrowUpRight className="h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <MobileMenu />
      </div>
    </header>
  );
}
