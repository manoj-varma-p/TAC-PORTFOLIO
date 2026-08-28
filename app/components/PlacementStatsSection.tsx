"use client";

import { motion } from "motion/react";
import { openContactModal } from "./ContactModal";

interface StatBlock {
  value: string;
  label: string;
  isHighlighted?: boolean;
}

const STATS_DATA: StatBlock[] = [
  {
    value: "9",
    label: "BATCHES COMPLETED",
    isHighlighted: false,
  },
  {
    value: "₹7.2 LPA",
    label: "HIGHEST PACKAGE",
    isHighlighted: true,
  },
  {
    value: "100%",
    label: "PLACEMENT ASSISTANCE",
    isHighlighted: false,
  },
  {
    value: "8",
    label: "SKILLS PER STUDENT",
    isHighlighted: false,
  },
  {
    value: "₹1L",
    label: "MONTH-12 FREELANCE TARGET",
    isHighlighted: true,
  },
  {
    value: "10",
    label: "INDUSTRY PORTFOLIO PROJECTS",
    isHighlighted: false,
  },
];

export default function PlacementStatsSection() {
  return (
    <section id="placements" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-full max-w-5xl rounded-full bg-gold/[0.05] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-[60px]">
        {/* Top Header Row */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          {/* Eyebrow */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <span>★</span>
              <span>FIRST REAL PLACEMENT CERTIFICATE</span>
            </div>
          </div>

          {/* Big Bold Headline & Subtitle */}
          <div className="text-left md:text-right">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none">
              REAL JOBS. <span className="text-gold">REAL MONEY.</span>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm font-medium text-gray-light max-w-md md:ml-auto">
              Numbers from all 9 completed cohorts. Students placed successfully within 60 days of course completion.
            </p>
          </div>
        </div>

        {/* 6-Block Interactive Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-3xl border border-white/15 bg-white/[0.02] shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-white/10">
            {STATS_DATA.map((item, index) => {
              // Add row divider between first 3 and last 3 on desktop
              const isSecondRow = index >= 3;

              return (
                <div
                  key={index}
                  className={`group relative flex flex-col items-center justify-center p-8 sm:p-10 lg:p-12 text-center transition-all duration-300 ${
                    item.isHighlighted
                      ? "bg-gradient-to-b from-gold/25 via-gold/15 to-gold/25 text-white shadow-[inset_0_0_40px_rgba(255,184,0,0.15)]"
                      : "bg-[#0b0b10]/60 hover:bg-white/[0.04]"
                  } ${isSecondRow ? "sm:border-t sm:border-white/10" : ""}`}
                >
                  {/* Subtle hover specular glare */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,184,0,0.15),_transparent_70%)] transition-opacity duration-300" />

                  {/* Value */}
                  <span
                    className={`relative z-10 font-black tracking-tight leading-none text-4xl sm:text-5xl lg:text-[54px] ${
                      item.isHighlighted ? "text-gold-bright drop-shadow-[0_0_20px_rgba(255,184,0,0.5)]" : "text-white group-hover:text-gold transition-colors"
                    }`}
                  >
                    {item.value}
                  </span>

                  {/* Label */}
                  <span
                    className={`relative z-10 mt-3.5 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase ${
                      item.isHighlighted ? "text-amber-200" : "text-gray-muted group-hover:text-gray-200 transition-colors"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Highlighted Verification Content */}
        <div className="mt-8 flex items-center justify-center text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-gold/40 bg-gradient-to-r from-gold/15 via-gold/25 to-gold/15 px-6 py-3 shadow-[0_0_30px_rgba(255,184,0,0.25)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse shrink-0" />
            <p className="text-xs sm:text-sm font-bold tracking-wide text-white">
              <span className="text-gold-bright font-extrabold">Verified Student Hiring Records</span>
              <span className="mx-2 text-gold/60">&bull;</span>
              <span>Verified Alumni Network Across <span className="text-gold-bright font-extrabold">50+ Media Agencies &amp; Film Studios</span></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
