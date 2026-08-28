"use client";

import { motion } from "motion/react";
import { openContactModal } from "./ContactModal";

interface InitiativeItem {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  accentGradient: string;
  icon: React.ReactNode;
}

const INITIATIVES: InitiativeItem[] = [
  {
    id: "tac-recipes",
    tag: "Creative Blueprints",
    title: "TAC Recipes",
    tagline: "Design Blueprints, Color Grading LUTs & Production Presets",
    description:
      "Curated project recipes, customizable motion templates, color palettes, and workflow breakdowns engineered to accelerate high-end commercial delivery.",
    accentGradient: "from-amber-500/20 via-gold/10 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M19 11V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v7M3 11h18a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3v8M8 7h8M8 15h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "tac-entertainment",
    tag: "Original Media",
    title: "TAC Entertainment",
    tagline: "Original Media, Short Films & Digital Storytelling",
    description:
      "Our in-house creative production house developing original narrative cinema, digital sketches, creator collaborations, and pop-culture video content.",
    accentGradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5" strokeLinecap="round" />
        <polygon points="10,9 15,12 10,15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "tac-capsules",
    tag: "Micro-Learning",
    title: "TAC Capsules",
    tagline: "Bite-Sized Masterclasses & Quick Creative Sprints",
    description:
      "High-impact, concentrated micro-courses designed to teach complex visual effects, speed-editing hacks, typography secrets, and audio design in under 15 minutes.",
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m8.5 8.5 7 7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "director-verse",
    tag: "Cinematic Universe",
    title: "Director Verse",
    tagline: "Cinematic Worldbuilding & Visionary Filmmaking",
    description:
      "An exclusive platform decoding the directorial craft—focusing on shot composition, subtextual blocking, actors' direction, and narrative tension from cinema masters.",
    badge: "Exclusive",
    accentGradient: "from-red-500/20 via-amber-500/10 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    id: "tac-ai-2-0",
    tag: "Next-Gen Tech",
    title: "TAC AI 2.0",
    tagline: "Next-Gen Creative Intelligence & Workflow Automation",
    description:
      "Our cutting-edge artificial intelligence suite providing creators with automated storyboard rendering, smart scene extensions, neural upscale, and voice synthesis.",
    badge: "New 2.0",
    accentGradient: "from-cyan-500/25 via-blue-500/15 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.5" fill="#22d3ee" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "ai-in-filmmaking",
    tag: "Production Lab",
    title: "AI in Filmmaking",
    tagline: "Generative VFX, Virtual Production & Script Analysis",
    description:
      "Explore how artificial intelligence is disrupting pre-production, real-time Unreal Engine backdrops, digital lighting simulation, and generative visual effects.",
    accentGradient: "from-amber-400/20 via-orange-500/10 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M23 7 16 12l7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="12" r="2.5" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "filmmaking-with-ai",
    tag: "Hands-On Pipeline",
    title: "Filmmaking with AI",
    tagline: "End-to-End Production Pipelines Powered by AI",
    description:
      "Comprehensive end-to-end training that guides you from prompt-to-premiere: writing scripts, generating cinematic keyframes, animating with diffusion models, and final audio mastering.",
    badge: "Masterclass",
    accentGradient: "from-gold/25 via-yellow-500/10 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6h10M6 10h10M6 14h6" strokeLinecap="round" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function MoreFromTac() {
  return (
    <section id="more-from-tac" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-full max-w-6xl rounded-full bg-gold/[0.05] blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/[0.04] blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-[60px]">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-gold animate-pulse" />
              <p className="text-[13px] font-semibold tracking-[0.3em] text-gold uppercase">
                THE TAC ECOSYSTEM
              </p>
            </div>
            <h2 className="mt-3 text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-tight text-white">
              More From <span className="text-gold">TAC.</span>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-gray-light sm:text-[18px]">
              Explore our specialized media wings, AI research initiatives, production blueprints, and advanced filmmaking masterclasses.
            </p>
          </div>

          <button
            type="button"
            onClick={openContactModal}
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-black hover:shadow-[0_0_20px_rgba(255,184,0,0.4)] transition-all cursor-pointer"
          >
            Inquire About Initiatives
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Dynamic Grid Showcase */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {INITIATIVES.map((item, index) => {
            // Give 7th item a wider span on xl screens for perfect balanced layout
            const isWide = index === 6;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e14]/80 p-6 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_20px_50px_rgba(255,184,0,0.18)] ${
                  isWide ? "sm:col-span-2 xl:col-span-2" : ""
                }`}
              >
                {/* Ambient Top Gradient Glow */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${item.accentGradient} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div>
                  {/* Top Row: Icon + Badge / Tag */}
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-gold/40">
                      {item.icon}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="rounded-full bg-gold/20 border border-gold/40 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-gold-bright shadow-[0_0_10px_rgba(255,184,0,0.3)]">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-muted">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="relative mt-6">
                    <h3 className="text-xl font-extrabold text-white transition-colors duration-200 group-hover:text-gold sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-gold/90 line-clamp-1">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="relative mt-3.5 text-sm leading-relaxed text-gray-light/90">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="relative mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-muted group-hover:text-gray-200 transition-colors">
                    Explore Initiative
                  </span>
                  <button
                    type="button"
                    onClick={openContactModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-200 group-hover:bg-gold group-hover:text-black group-hover:border-gold group-hover:scale-110 cursor-pointer"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile bottom button */}
        <div className="mt-8 text-center md:hidden">
          <button
            type="button"
            onClick={openContactModal}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-black transition-all cursor-pointer"
          >
            Inquire About Initiatives →
          </button>
        </div>
      </div>
    </section>
  );
}
