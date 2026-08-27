import Link from "next/link";
import type { ReactNode } from "react";
import {
  AppBadge,
  ArrowUpRight,
  CameraIcon,
  DaVinciIcon,
  MegaphoneIcon,
  PencilIcon,
} from "./icons";
import MobileMenu from "./MobileMenu";
import { navItems } from "./navItems";

const navIcons: Record<string, ReactNode> = {
  Photoshop: <AppBadge label="Ps" bg="#001e36" fg="#31a8ff" />,
  "Premiere Pro": <AppBadge label="Pr" bg="#00005b" fg="#9999ff" />,
  Illustrator: <AppBadge label="Ai" bg="#330000" fg="#ff9a00" />,
  "After Effects": <AppBadge label="Ae" bg="#00005b" fg="#9999ff" />,
  "DaVinci Resolve": <DaVinciIcon className="h-7 w-7 text-gray-light" />,
  "Content Shoot": <CameraIcon className="h-7 w-7 text-gray-light" />,
  "Content Writing": <PencilIcon className="h-7 w-7 text-gray-light" />,
  "Digital Marketing": <MegaphoneIcon className="h-7 w-7 text-gray-light" />,
};

export default function Navbar() {
  return (
    <header className="animate-navbar sticky top-0 z-20 border-b border-border/60 bg-bg/85 backdrop-blur-sm lg:h-20">
      <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-6 py-4 lg:px-[60px] lg:py-0">
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-gold">T</span>
            <span className="text-white">AC</span>
          </span>
          <span className="mt-0.5 text-[9px] font-medium tracking-[0.25em] text-gray-muted">
            THE ART CODE
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-3 md:flex lg:gap-5 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center gap-1.5 text-center"
            >
              <span className="opacity-90 transition group-hover:opacity-100 group-hover:brightness-125">
                {navIcons[item.label]}
              </span>
              <span className="hidden whitespace-nowrap text-[10px] font-medium tracking-[0.08em] text-gray-light transition group-hover:text-gold lg:inline">
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
