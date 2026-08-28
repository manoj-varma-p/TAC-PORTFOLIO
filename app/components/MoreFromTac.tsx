"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { openContactModal } from "./ContactModal";

interface InitiativeItem {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  accentColor: string;
  accentBorder: string;
  accentGlow: string;
  highlights: string[];
  graphicType: "recipes" | "entertainment" | "capsules" | "director" | "ai2" | "aifilm" | "filmmakingai";
  icon: React.ReactNode;
}

const INITIATIVES: InitiativeItem[] = [
  {
    id: "tac-recipes",
    tag: "Creative Blueprints",
    title: "TAC Recipes",
    tagline: "Design Blueprints, Color Grading LUTs & Production Presets",
    description:
      "Curated project recipes, customizable motion toolkits, film emulation .cube LUTs, and typography styleguides engineered to accelerate commercial creative delivery.",
    badge: "Toolkits",
    accentColor: "#FFB800",
    accentBorder: "border-amber-500/40",
    accentGlow: "rgba(255, 184, 0, 0.25)",
    highlights: ["Custom 3D LUTs (.CUBE)", "Motion Project Recipes", "Color Grading Blueprints", "One-Click Studio Presets"],
    graphicType: "recipes",
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
      "Our in-house creative production house developing original narrative cinema, digital sketches, creator collaborations, dynamic music videos, and pop-culture web content.",
    badge: "Studio Wing",
    accentColor: "#C084FC",
    accentBorder: "border-purple-500/40",
    accentGlow: "rgba(192, 132, 252, 0.25)",
    highlights: ["Original Narrative Shorts", "Dynamic Pop Culture Sketches", "High-Concept Music Promos", "Creator Collabs"],
    graphicType: "entertainment",
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
    badge: "15-Min Sprints",
    accentColor: "#34D399",
    accentBorder: "border-emerald-500/40",
    accentGlow: "rgba(52, 211, 153, 0.25)",
    highlights: ["Speed-Editing Hacks", "VFX Compositing Tricks", "Sound Mixing Stems", "Express Typography Sprints"],
    graphicType: "capsules",
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
      "An exclusive master platform decoding the directorial craft—focusing on shot composition, subtextual blocking, actor psychology, lighting design, and narrative tension.",
    badge: "Flagship",
    accentColor: "#F87171",
    accentBorder: "border-red-500/40",
    accentGlow: "rgba(248, 113, 113, 0.25)",
    highlights: ["Anamorphic 2.39:1 Framing", "Actor & Character Psychology", "Scene Blocking & Subtext", "Dramatic Tension Control"],
    graphicType: "director",
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
      "Our state-of-the-art artificial intelligence suite empowering creators with automated storyboard rendering, smart scene extensions, neural upscale, and voice synthesis.",
    badge: "New 2.0",
    accentColor: "#22D3EE",
    accentBorder: "border-cyan-500/40",
    accentGlow: "rgba(34, 211, 238, 0.25)",
    highlights: ["Neural Latent Diffusion", "AI Storyboard Generation", "Instant Visual Rotoscope", "Neural Voice Synthesis"],
    graphicType: "ai2",
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
      "Explore how cutting-edge AI is transforming pre-production, real-time Unreal Engine virtual stages, 3D camera tracking, digital lighting simulation, and generative visual effects.",
    badge: "VFX & Virtual Stage",
    accentColor: "#FB923C",
    accentBorder: "border-orange-500/40",
    accentGlow: "rgba(251, 146, 60, 0.25)",
    highlights: ["Unreal Engine Virtual Stage", "Generative Concept Keyframes", "Camera Tracking & Previz", "Neural Style Transfers"],
    graphicType: "aifilm",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.8">
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
      "Comprehensive prompt-to-premiere pipeline training: scripting with LLMs, generating cinematic keyframes, animating with diffusion models, spatial sound synthesis, and final 4K master delivery.",
    badge: "End-to-End Masterclass",
    accentColor: "#FACC15",
    accentBorder: "border-yellow-500/40",
    accentGlow: "rgba(250, 204, 21, 0.25)",
    highlights: ["Prompt-to-Screen Pipeline", "Generative Video Direction", "AI Foley & Score Design", "Cinema 4K Mastering"],
    graphicType: "filmmakingai",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6h10M6 10h10M6 14h6" strokeLinecap="round" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

// Interactive Dynamic Animated Visual Component for Center Stage
function InitiativeVisual({ type, accentColor }: { type: InitiativeItem["graphicType"]; accentColor: string }) {
  if (type === "recipes") {
    return (
      <div className="relative flex flex-col gap-3.5 p-5 rounded-2xl bg-black/60 border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="text-[11px] font-mono text-gray-400 ml-2">TAC_RECIPES_ENGINE.cube</span>
          </div>
          <span className="text-[10px] font-bold text-gold bg-gold/15 px-2 py-0.5 rounded border border-gold/30">PRO PRESET</span>
        </div>

        {/* Live animated color grading swatch simulator */}
        <div className="grid grid-cols-3 gap-2">
          {["Teal & Gold", "Kodak 2383", "Film Noir"].map((preset, i) => (
            <motion.div
              key={preset}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
              className="flex flex-col gap-1 p-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-center"
            >
              <div
                className="h-10 w-full rounded-md shadow-inner"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg, #0d9488 0%, #d97706 100%)"
                      : i === 1
                      ? "linear-gradient(135deg, #b45309 0%, #451a03 100%)"
                      : "linear-gradient(135deg, #18181b 0%, #71717a 100%)",
                }}
              />
              <span className="text-[10px] font-bold text-gray-200 mt-1">{preset}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated sliders */}
        <div className="space-y-2 mt-1">
          <div className="flex justify-between text-[11px] text-gray-400">
            <span>Dynamic Dynamic Range</span>
            <span className="text-gold font-mono">+2.4 EV</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              animate={{ width: ["40%", "85%", "65%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-amber-500 to-gold rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "entertainment") {
    return (
      <div className="relative flex flex-col gap-4 p-5 rounded-2xl bg-black/60 border border-purple-500/20 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs font-bold text-purple-300 font-mono">TAC_ORIGINALS_STUDIO</span>
          </div>
          <span className="text-[10px] font-extrabold text-white bg-purple-600/30 px-2 py-0.5 rounded border border-purple-400/40">4K DCI</span>
        </div>

        {/* Audio Wave Equalizer Animation */}
        <div className="flex items-center justify-center gap-1.5 h-20 px-4 bg-white/[0.03] rounded-xl border border-white/5">
          {[14, 38, 22, 54, 32, 64, 40, 72, 30, 58, 26, 48, 62, 34, 52, 28, 44, 20].map((baseH, i) => (
            <motion.span
              key={i}
              animate={{ height: [baseH * 0.4, baseH, baseH * 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9 + (i % 4) * 0.2, ease: "easeInOut" }}
              className="w-1.5 rounded-full bg-gradient-to-t from-purple-600 via-pink-500 to-amber-300"
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
          <span>SCENE 04 • TAKE 02</span>
          <span className="text-purple-300 font-bold">● AUDIO SYNC: LOCKED</span>
        </div>
      </div>
    );
  }

  if (type === "capsules") {
    return (
      <div className="relative flex flex-col gap-3 p-5 rounded-2xl bg-black/60 border border-emerald-500/20 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-xs font-mono font-bold text-emerald-400">⚡ RAPID SPRINT MODULE</span>
          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">14:59 MIN</span>
        </div>

        <div className="space-y-2.5">
          {[
            { name: "01. Anamorphic Lens Distortion", time: "3:45" },
            { name: "02. Fast 3D Planar Screen Tracking", time: "4:12" },
            { name: "03. Spatial Audio Drop & Foley Hits", time: "3:10" },
          ].map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black">
                  ✓
                </span>
                <span className="text-xs font-semibold text-gray-200">{item.name}</span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "director") {
    return (
      <div className="relative flex flex-col gap-3 p-5 rounded-2xl bg-black/70 border border-red-500/20 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Cinema Viewfinder HUD */}
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-red-400">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span>REC [RAW]</span>
          </div>
          <span>2.39:1 ANAMORPHIC</span>
        </div>

        {/* Viewfinder Frame with Crosshairs */}
        <div className="relative h-28 w-full rounded-lg border border-red-500/30 bg-white/[0.02] flex items-center justify-center">
          {/* Rule of Thirds Grid */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-30">
            <div className="border-r border-b border-red-400" />
            <div className="border-r border-b border-red-400" />
            <div className="border-b border-red-400" />
            <div className="border-r border-b border-red-400" />
            <div className="border-r border-b border-red-400" />
            <div className="border-b border-red-400" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative z-10 flex flex-col items-center"
          >
            <span className="text-xs font-extrabold tracking-widest text-white uppercase bg-black/60 px-3 py-1 rounded border border-white/20">
              DIRECTOR VERSE
            </span>
            <span className="text-[10px] font-mono text-gold mt-1">LENS: 50mm T1.5</span>
          </motion.div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-gray-400">
          <span>FPS: 24.00</span>
          <span>SHUTTER: 1/48</span>
          <span>ISO: 800</span>
        </div>
      </div>
    );
  }

  if (type === "ai2") {
    return (
      <div className="relative flex flex-col gap-3 p-5 rounded-2xl bg-black/70 border border-cyan-500/30 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            TAC_NEURAL_LATENT_v2.0
          </span>
          <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">SAMPLING: EULER</span>
        </div>

        {/* Prompt simulator */}
        <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
          <p className="text-[11px] font-mono text-gray-300">
            <span className="text-cyan-400 font-bold">&gt; prompt: </span>
            Cinematic anamorphic wide angle, golden rim light, hyperrealistic 8k...
          </p>
        </div>

        {/* Diffusion progress simulator */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-gray-400">
            <span>Neural Denoising Pass</span>
            <span className="text-cyan-300 font-bold">100% Complete</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "aifilm") {
    return (
      <div className="relative flex flex-col gap-3 p-5 rounded-2xl bg-black/70 border border-orange-500/30 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-xs font-mono font-bold text-orange-400">VIRTUAL PRODUCTION LAB</span>
          <span className="text-[10px] font-bold text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">UNREAL 5.4</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="text-[10px] font-mono text-gray-400">LED Volume Wall</span>
            <p className="text-xs font-bold text-orange-300 mt-1">Parallax Calibrated</p>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="text-[10px] font-mono text-gray-400">Neural Set Ext</span>
            <p className="text-xs font-bold text-orange-300 mt-1">Zero Latency</p>
          </div>
        </div>

        <div className="p-2 rounded bg-orange-950/20 border border-orange-500/20 text-center">
          <span className="text-[11px] font-mono text-orange-200">Real-Time Camera Spatial Tracking: ACTIVE</span>
        </div>
      </div>
    );
  }

  // default: filmmakingai
  return (
    <div className="relative flex flex-col gap-3.5 p-5 rounded-2xl bg-black/70 border border-yellow-500/30 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="text-xs font-mono font-bold text-yellow-400">PROMPT-TO-PREMIERE PIPELINE</span>
        <span className="text-[10px] font-bold text-yellow-300 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/30">5 STEPS</span>
      </div>

      <div className="flex items-center justify-between gap-1 py-1">
        {["Script", "Keyframes", "Motion", "Audio", "Master"].map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-1">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              className="h-6 w-6 flex items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-400/40 text-[10px] font-black text-yellow-300"
            >
              0{i + 1}
            </motion.span>
            <span className="text-[9px] font-bold text-gray-300">{step}</span>
          </div>
        ))}
      </div>

      <div className="p-2.5 rounded-lg bg-yellow-950/20 border border-yellow-500/20 text-center">
        <p className="text-[11px] font-mono text-yellow-200 font-semibold">End-to-End Autonomous Filmmaking Workflow</p>
      </div>
    </div>
  );
}

export default function MoreFromTac() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const activeItem = INITIATIVES[activeIndex];

  // Auto-advance tabs every 5 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % INITIATIVES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section id="more-from-tac" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[700px] w-full max-w-6xl rounded-full bg-gold/[0.06] blur-[160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/[0.04] blur-[120px]"
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
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-black hover:shadow-[0_0_25px_rgba(255,184,0,0.45)] transition-all cursor-pointer"
          >
            Inquire About Programs
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* ================= INTERACTIVE SELECTOR PILLS ================= */}
        <div className="mt-10 -mx-3 flex items-center gap-2.5 overflow-x-auto px-3 py-2 scrollbar-none">
          {INITIATIVES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`group relative flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-gold bg-gold/15 text-white shadow-[0_0_20px_rgba(255,184,0,0.35)] scale-105"
                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black"
                  style={{
                    backgroundColor: isActive ? item.accentColor : "rgba(255,255,255,0.08)",
                    color: isActive ? "#000" : "#fff",
                  }}
                >
                  {idx + 1}
                </span>
                <span className={isActive ? "text-gold-bright font-extrabold" : ""}>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* ================= MAIN INTERACTIVE 3D STAGE ================= */}
        <div
          className="mt-8 relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#12121a]/95 via-[#0a0a0f]/95 to-[#050508]/95 p-6 sm:p-10 lg:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Dynamic Top Ambient Aura for Active Item */}
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full blur-3xl"
            style={{ backgroundColor: activeItem.accentColor }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center"
            >
              {/* Left Column: Details & Feature Highlights (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Header Tag & Badge */}
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeItem.accentColor }} />
                    {activeItem.tag}
                  </span>
                  {activeItem.badge && (
                    <span
                      className="rounded-full px-3 py-0.5 text-[11px] font-black uppercase tracking-wider shadow-sm"
                      style={{
                        backgroundColor: `${activeItem.accentColor}20`,
                        color: activeItem.accentColor,
                        border: `1px solid ${activeItem.accentColor}50`,
                      }}
                    >
                      {activeItem.badge}
                    </span>
                  )}
                </div>

                {/* Main Heading */}
                <h3 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
                  {activeItem.title}
                </h3>

                {/* Tagline */}
                <p className="mt-2 text-base sm:text-lg font-semibold" style={{ color: activeItem.accentColor }}>
                  {activeItem.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 text-base sm:text-[17px] leading-relaxed text-gray-light">
                  {activeItem.description}
                </p>

                {/* Interactive Key Highlights Checklist */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeItem.highlights.map((point) => (
                    <div key={point} className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
                      <span className="text-xs font-bold" style={{ color: activeItem.accentColor }}>✦</span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-200">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={openContactModal}
                    className="rounded-xl px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black shadow-lg hover:scale-105 transition-all cursor-pointer"
                    style={{
                      backgroundColor: activeItem.accentColor,
                      boxShadow: `0 0 25px ${activeItem.accentGlow}`,
                    }}
                  >
                    Join {activeItem.title}
                  </button>

                  <button
                    type="button"
                    onClick={openContactModal}
                    className="rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:border-gold hover:text-gold transition-all cursor-pointer"
                  >
                    Request Syllabus & Details
                  </button>
                </div>
              </div>

              {/* Right Column: Live Animated Dynamic Graphic (5 cols) */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <InitiativeVisual type={activeItem.graphicType} accentColor={activeItem.accentColor} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= BENTO RAIL AT BOTTOM (7 CARDS) ================= */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
          {INITIATIVES.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-gold bg-gold/10 shadow-[0_0_20px_rgba(255,184,0,0.25)] scale-[1.03]"
                    : "border-white/10 bg-[#0e0e14]/60 hover:border-white/25 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg border transition-transform group-hover:scale-110"
                    style={{
                      borderColor: isSelected ? `${item.accentColor}60` : "rgba(255,255,255,0.1)",
                      backgroundColor: `${item.accentColor}15`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-500">0{idx + 1}</span>
                </div>

                <div className="mt-3">
                  <h4 className={`text-sm font-extrabold transition-colors ${isSelected ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-medium text-gray-400 line-clamp-1 mt-0.5">
                    {item.tag}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
