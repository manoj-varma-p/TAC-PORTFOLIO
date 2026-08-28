"use client";

import { motion } from "motion/react";
import { openContactModal } from "./ContactModal";

export type GuestSpotlightItem = {
  id: number;
  edition: string;
  guestName: string;
  role: string;
  topic: string;
  date?: string;
  about: string[];
  keyAdvice: string[];
  quote?: string;
  tags: string[];
  imageSrc?: string;
};

interface SpotlightShowcaseProps {
  items: GuestSpotlightItem[];
}

export default function SpotlightShowcase({ items }: SpotlightShowcaseProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Ambient Lighting Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-6xl rounded-full bg-gradient-to-b from-gold/15 via-gold/5 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-64 h-[600px] w-[600px] rounded-full bg-gold/[0.07] blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-2/3 -right-64 h-[600px] w-[600px] rounded-full bg-amber-500/[0.07] blur-[140px]"
      />

      {/* Hero Header Section */}
      <section className="relative px-6 pt-10 pb-4 text-center sm:pt-12 sm:pb-6 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Every Weekend • TAC Special Event
          </motion.div>

          {/* Main Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Spotlight <span className="text-gold">Saturday.</span>
          </motion.h1>

          {/* Classy Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-light sm:text-lg"
          >
            Every weekend, we invite renowned industry leaders, creative directors, master artists, and filmmakers to share their authentic journeys, insider workflows, and career-defining wisdom with our community.
          </motion.p>
        </div>
      </section>

      {/* Alternating Zig-Zag Guest Speaker Cards */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">
        {items.map((item, index) => {
          // Even index -> Image Left, Details Right
          // Odd index  -> Details Left, Image Right
          const isImageLeft = index % 2 === 0;

          return (
            <motion.article
              id={`guest-${item.id}`}
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className={`relative flex flex-col items-center gap-8 lg:gap-14 ${
                isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* ================= ADAPTIVE IMAGE BOX ================= */}
              <div className="w-full lg:w-[42%] shrink-0 flex items-center justify-center">
                <div className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e13] shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                  {item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt={`${item.guestName} - ${item.role}`}
                      className="block w-full h-auto object-contain"
                    />
                  ) : (
                    /* Classy Fallback Avatar & Spotlight Poster when no image is uploaded */
                    <div className="relative flex aspect-[16/10] min-h-[280px] sm:min-h-[340px] w-full flex-col items-center justify-center p-8 text-center bg-[#09090d]">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,184,0,0.18),_transparent_70%)]" />
                      
                      {/* Guest Monogram Circle */}
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/20 via-gold/10 to-transparent text-2xl font-black text-gold shadow-[0_0_35px_rgba(255,184,0,0.25)]">
                        {item.guestName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <span className="relative z-10 mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                        Guest Speaker
                      </span>
                      <span className="relative z-10 mt-1 text-xl font-extrabold text-white">
                        {item.guestName}
                      </span>
                      <span className="relative z-10 mt-1 text-xs text-gray-muted max-w-sm">
                        {item.role}
                      </span>

                      <span className="relative z-10 mt-4 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] text-gray-light">
                        Photo Upload: <code className="text-gold">public/spotlight-saturday/</code>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ================= GUEST DETAILS COLUMN ================= */}
              <div className="w-full lg:w-[58%] flex flex-col justify-center">
                {/* GUEST NAME (HEADING) */}
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px] leading-tight">
                  {item.guestName}
                </h2>

                {/* ROLE & DESIGNATION */}
                <p className="mt-2 text-base font-semibold text-gold sm:text-lg">
                  {item.role}
                </p>

                {/* ABOUT THE GUEST & THEIR EXPERIENCE */}
                <div className="mt-6 space-y-4 text-base sm:text-[17px] leading-relaxed text-gray-light">
                  {item.about.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Bottom CTA Card */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 sm:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-gold/20 blur-3xl"
          />
          <span className="relative inline-block rounded-full bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold border border-gold/30">
            Join the Community
          </span>
          <h3 className="relative mt-4 text-2xl font-extrabold text-white sm:text-4xl">
            Want to Join the Next <span className="text-gold">Spotlight Saturday?</span>
          </h3>
          <p className="relative mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-gray-light sm:text-base">
            Every weekend is a rare opportunity to connect directly with creative industry pioneers, ask questions in live AMAs, and level up your craft.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={openContactModal}
              className="rounded-lg bg-gold px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_30px_rgba(255,184,0,0.4)] transition-all hover:scale-105 hover:bg-gold-bright cursor-pointer"
            >
              Get In Touch & Reserve a Seat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
