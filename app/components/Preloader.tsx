"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress counter animating to 100% over 3 seconds
    const startTime = performance.now();
    const duration = 3000; // 3 seconds

    let raf: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        raf = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = prevOverflow;
        }, 150);
      }
    };

    raf = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="tac-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050508] text-white select-none"
        >
          {/* Ambient Background Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-gold/[0.08] blur-[120px]"
          />

          <div className="relative flex flex-col items-center">
            {/* Center Circular Spinner & Logo Hub */}
            <div className="relative flex h-36 w-36 items-center justify-center">
              {/* Rotating Golden Arc Ring */}
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2.5"
                />
                {/* Active Rotating Gold Arc */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#FFB800"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="276"
                  initial={{ strokeDashoffset: 276 }}
                  animate={{
                    strokeDashoffset: [276, 50, 20],
                    rotate: [0, 360, 720],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  style={{
                    filter: "drop-shadow(0 0 12px rgba(255, 184, 0, 0.85))",
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>

              {/* Inner Glow Circle Container */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-b from-[#161622] via-[#09090f] to-[#040407] shadow-[inset_0_0_20px_rgba(255,184,0,0.2),0_0_30px_rgba(0,0,0,0.9)]">
                {/* Subtle Inner Pulse Halo */}
                <div className="absolute inset-2 rounded-full bg-gold/10 blur-sm animate-pulse" />

                {/* TAC Golden Chevron */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.95, 1.05, 0.98], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <img
                    src="/logo.png"
                    alt="TAC Logo"
                    className="h-10 w-10 object-contain drop-shadow-[0_0_15px_rgba(255,184,0,0.85)]"
                  />
                </motion.div>
              </div>
            </div>

            {/* Typography */}
            <div className="mt-8 flex flex-col items-center text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-black uppercase tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold to-amber-300 drop-shadow-[0_0_25px_rgba(255,184,0,0.4)]"
              >
                THE ART CODE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.45em] text-gray-400"
              >
                PREMIUM LEARNING
              </motion.p>
            </div>

            {/* Horizontal Progress Bar */}
            <div className="mt-7 w-48 sm:w-56">
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-gold to-amber-300 rounded-full"
                  style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 15px rgba(255, 184, 0, 0.9)",
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
