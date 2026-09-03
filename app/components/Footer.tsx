import Link from "next/link";
import { ArrowUpRight, InstagramIcon, LinkedInIcon } from "./icons";
import { navItems } from "./navItems";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-bg text-foreground overflow-hidden">
      {/* Subtle ambient bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-[300px] w-full max-w-4xl rounded-full bg-gold/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand Info */}
          <div className="flex flex-col items-start gap-4 max-w-sm">
            <Link href="/" className="inline-block">
              <img
                src="/logo.png"
                alt="TAC - The Art Code"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105"
              />
            </Link>
            <p className="text-xs sm:text-sm text-gray-light leading-relaxed">
              TAC is a creative learning ecosystem where design thinkers turn ideas into impactful digital experiences.
            </p>
          </div>

          {/* Quick Showcase Links */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
              Showcases
            </span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-gray-muted transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials & Contact */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <span className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
              Connect With Us
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/tac_theartcode?igsi=dTk2NGpvb2ZoZmVx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow TAC on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-gray-light transition-all hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(255,184,0,0.4)]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/tac-the-art-code/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow TAC on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-gray-light transition-all hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(255,184,0,0.4)]"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/919848000274"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 rounded-[4px] border border-gold/70 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-wide text-white transition-all hover:bg-gold hover:text-black"
              >
                LET&apos;S TALK
                <ArrowUpRight className="h-3.5 w-3.5 text-gold group-hover:text-black" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-muted">
            &copy; {currentYear} <span className="text-gray-light font-semibold">TAC &mdash; The Art Code</span>. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-muted">
            Crafted for creative excellence &bull; Madhapur, Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
