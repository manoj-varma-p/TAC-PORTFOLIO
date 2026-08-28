"use client";

import { motion } from "motion/react";
import { openContactModal } from "./ContactModal";

interface InitiativeItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
}

const INITIATIVES: InitiativeItem[] = [
  {
    id: "tac-recipes",
    number: "01",
    title: "TAC Recipes",
    tagline: "Design Blueprints & Presets",
    description: "Curated editing recipes, color grading LUTs, motion toolkits, and project blueprints built for commercial workflows.",
    badge: "Toolkits",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M19 11V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v7M3 11h18a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3v8M8 7h8M8 15h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "tac-entertainment",
    number: "02",
    title: "TAC Entertainment",
    tagline: "Original Media & Cinema",
    description: "Our in-house production house producing original narrative shorts, pop-culture web content, and creator media.",
    badge: "Originals",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5" strokeLinecap="round" />
        <polygon points="10,9 15,12 10,15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "tac-capsules",
    number: "03",
    title: "TAC Capsules",
    tagline: "15-Minute Skill Sprints",
    description: "High-impact, bite-sized micro masterclasses covering VFX compositing, speed-editing hacks, and sound design secrets.",
    badge: "Micro-Courses",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m8.5 8.5 7 7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "director-verse",
    number: "04",
    title: "Director Verse",
    tagline: "Cinematic Worldbuilding",
    description: "Master the directorial craft: shot composition, narrative tension, actors' direction, and subtextual scene blocking.",
    badge: "Universe",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "tac-ai-2-0",
    number: "05",
    title: "TAC AI 2.0",
    tagline: "Next-Gen Creative Intelligence",
    description: "State-of-the-art AI suite empowering creators with automated storyboarding, neural scene extension, and voice synthesis.",
    badge: "v2.0",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: "ai-in-filmmaking",
    number: "06",
    title: "AI in Filmmaking",
    tagline: "Virtual Production & Generative VFX",
    description: "Bridging cinematography with generative AI: real-time Unreal Engine virtual sets, digital lighting, and concept art.",
    badge: "Production Lab",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M23 7 16 12l7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="12" r="2" fill="currentColor" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: "filmmaking-with-ai",
    number: "07",
    title: "Filmmaking with AI",
    tagline: "End-to-End Autonomous Pipeline",
    description: "Prompt-to-premiere pipeline masterclass: writing scripts, generating keyframes, neural animation, foley, and 4K mastering.",
    badge: "Masterclass",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6h10M6 10h10M6 14h6" strokeLinecap="round" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function MoreFromTac() {
  return (
    <section id="more-from-tac" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* Subtle Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-full max-w-5xl rounded-full bg-gold/[0.04] blur-[150px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-[60px]">
        {/* Clean Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-gold animate-pulse" />
              <p className="text-[12.5px] font-bold tracking-[0.25em] text-gold uppercase">
                THE TAC ECOSYSTEM
              </p>
            </div>
            <h2 className="mt-3 text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.15] tracking-tight text-white">
              More From <span className="text-gold">TAC.</span>
            </h2>
            <p className="mt-3 text-base text-gray-light sm:text-[17px] leading-relaxed">
              Explore our specialized media wings, AI research initiatives, production blueprints, and filmmaking masterclasses.
            </p>
          </div>

          <button
            type="button"
            onClick={openContactModal}
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-black transition-all cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(255,184,0,0.3)]"
          >
            Inquire About Programs
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Clean, Animated 7-Card Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {INITIATIVES.map((item, index) => {
            const isWide = index === 6; // 7th card spans 2 columns on larger screens for balanced symmetry

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                onClick={openContactModal}
                className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-gold/60 hover:bg-white/[0.04] hover:shadow-[0_15px_40px_rgba(255,184,0,0.12)] cursor-pointer ${
                  isWide ? "sm:col-span-2 xl:col-span-2" : ""
                }`}
              >
                {/* Subtle Hover Radial Aura */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gold/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  {/* Top Row: Icon + Number & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:scale-110 group-hover:border-gold/50 group-hover:bg-gold/10">
                      {item.icon}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="rounded-full bg-gold/15 border border-gold/30 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-gold">
                          {item.badge}
                        </span>
                      )}
                      <span className="font-mono text-xs font-extrabold text-gray-500 group-hover:text-gold transition-colors">
                        {item.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-5">
                    <h3 className="text-xl font-extrabold text-white transition-colors group-hover:text-gold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-gold/85">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-gray-light/85">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
                    Explore Initiative
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black group-hover:translate-x-1">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
