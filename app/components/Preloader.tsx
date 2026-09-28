"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  // activeStep:
  // 0: Initial ambient atmosphere
  // 1: Center Golden Chevron Logo impacts
  // 2: Word "The" appears
  // 3: Word "Art" appears
  // 4: Word "Code" appears
  // 5: Complete lockup, shimmer sweep & 100% charged
  // 6: Dissolve & load site
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Fast 1-second sequential timers
    const logoTimer = setTimeout(() => setActiveStep(1), 50);
    const theTimer = setTimeout(() => setActiveStep(2), 220);
    const artTimer = setTimeout(() => setActiveStep(3), 420);
    const codeTimer = setTimeout(() => setActiveStep(4), 620);
    const fullTimer = setTimeout(() => setActiveStep(5), 780);

    // Progress counter animating to 100% over exactly 1 second
    const startProgressTime = performance.now();
    const duration = 1000; // 1.0 second total sequence

    let raf: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startProgressTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        raf = requestAnimationFrame(updateProgress);
      } else {
        setActiveStep(6);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = prevOverflow;
        }, 150);
      }
    };

    raf = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(theTimer);
      clearTimeout(artTimer);
      clearTimeout(codeTimer);
      clearTimeout(fullTimer);
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const words = [
    { text: "THE", step: 2 },
    { text: "ART", step: 3 },
    { text: "CODE", step: 4 },
  ];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="tac-cinematic-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(4px)",
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#040406] text-white select-none overflow-hidden"
        >
          {/* Subtle Cinematic Film Grain Texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-screen bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
          />

          {/* Cinematic Letterbox Bars */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 sm:h-12 bg-gradient-to-b from-black/80 to-transparent z-20" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-gradient-to-t from-black/80 to-transparent z-20" />

          {/* Soft, Subdued Ambient Radial Glow */}
          <motion.div
            aria-hidden
            animate={{
              opacity: activeStep >= 5 ? 0.08 : 0.04,
            }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] rounded-full bg-gold/15 blur-[80px]"
          />

          {/* Very Subtle Horizontal Flare Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: activeStep >= 1 ? 0.1 : 0,
              scaleX: activeStep >= 1 ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FFB800]/25 to-transparent"
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Hero Golden Chevron Logo (Image 2) */}
            <div className="relative flex items-center justify-center my-2 sm:my-3">
              {/* Very Subtle Ambient Glow directly behind logo */}
              <motion.div
                animate={{
                  opacity: activeStep >= 1 ? 0.2 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-full bg-gold/15 blur-lg"
              />

              {/* The Chevron Logo Object */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  filter: "blur(6px)",
                  y: -4,
                }}
                animate={
                  activeStep >= 1
                    ? {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        scale: 0.85,
                        filter: "blur(6px)",
                        y: -4,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex items-center justify-center"
              >
                {/* Logo Image with Gleam / Shimmer effect strictly on the object */}
                <motion.img
                  src="/logo.png"
                  alt="The Art Code Emblem"
                  animate={
                    activeStep >= 5
                      ? {
                          filter: [
                            "drop-shadow(0 0 10px rgba(255,184,0,0.3)) brightness(1)",
                            "drop-shadow(0 0 18px rgba(255,200,50,0.75)) brightness(1.35)",
                            "drop-shadow(0 0 10px rgba(255,184,0,0.3)) brightness(1)",
                          ],
                        }
                      : {
                          filter: "drop-shadow(0 0 10px rgba(255,184,0,0.3)) brightness(1)",
                        }
                  }
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain select-none"
                  draggable={false}
                />

                {/* Shimmer sweep STRICTLY masked to the exact logo pixels */}
                {activeStep >= 5 && (
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    style={{
                      WebkitMaskImage: "url(/logo.png)",
                      maskImage: "url(/logo.png)",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  >
                    <motion.div
                      initial={{ left: "-100%", opacity: 0 }}
                      animate={{ left: "150%", opacity: [0, 0.9, 0] }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-25deg]"
                    />
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sequential "The" "Art" "Code" Words */}
            <div className="relative mt-3 sm:mt-5 flex flex-col items-center text-center">
              {/* Subtle Horizontal Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: activeStep >= 2 ? 1 : 0,
                  opacity: activeStep >= 2 ? 0.8 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] w-36 sm:w-48 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3 sm:mb-4"
              />

              {/* The Words Row: "THE", "ART", "CODE" */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5">
                {words.map((w) => {
                  const isWordVisible = activeStep >= w.step;
                  return (
                    <div key={w.text} className="relative flex items-center justify-center">
                      {/* Word Text */}
                      <motion.span
                        initial={{
                          opacity: 0,
                          y: 8,
                          filter: "blur(6px)",
                          scale: 0.95,
                        }}
                        animate={
                          isWordVisible
                            ? {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                scale: 1,
                              }
                            : {
                                opacity: 0,
                                y: 8,
                                filter: "blur(6px)",
                                scale: 0.95,
                              }
                        }
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white select-none"
                        style={{
                          fontFamily: "var(--font-sans), sans-serif",
                        }}
                      >
                        {w.text}
                      </motion.span>
                    </div>
                  );
                })}
              </div>

              {/* Sub-tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeStep >= 4 ? 0.75 : 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-2 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-zinc-400 font-medium"
              >
                PORTFOLIO
              </motion.p>
            </div>

            {/* Cinematic Laser Progress Bar & Status */}
            <div className="mt-7 sm:mt-9 flex flex-col items-center w-48 sm:w-56">
              <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/[0.08] shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-gold to-[#FFE79A] rounded-full"
                  style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 16px rgba(255, 184, 0, 1)",
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <div className="mt-3 flex w-full items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500">
                <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">
                  {progress < 100 ? "INITIALIZING" : "READY"}
                </span>
                <span className="text-gold font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Cinematic Corner Monograms */}
          <div className="pointer-events-none absolute top-6 left-6 text-zinc-700 font-mono text-[9px] tracking-widest flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold/60 animate-pulse" />
            <span>TAC_SYS // 2026</span>
          </div>
          <div className="pointer-events-none absolute top-6 right-6 text-zinc-700 font-mono text-[9px] tracking-widest">
            <span>EXPERIENCE</span>
          </div>
          <div className="pointer-events-none absolute bottom-6 left-6 text-zinc-700 font-mono text-[9px] tracking-widest">
            <span>[ 01 // 03 ]</span>
          </div>
          <div className="pointer-events-none absolute bottom-6 right-6 text-zinc-700 font-mono text-[9px] tracking-widest">
            <span>PRODUCTION</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


