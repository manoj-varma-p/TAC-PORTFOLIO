"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export interface TourStop {
  href: string;
  label: string;
  subtitle: string;
}

export const TOUR_STOPS: TourStop[] = [
  { href: "/", label: "Home", subtitle: "Creative Hub & Highlights" },
  { href: "/photoshop", label: "Photoshop", subtitle: "3D Dome Work Gallery" },
  { href: "/premiere-pro", label: "Premiere Pro", subtitle: "Cinematic Cuts & Reels" },
  { href: "/illustrator", label: "Illustrator", subtitle: "Vector Art & Brand Identity" },
  { href: "/after-effects", label: "After Effects", subtitle: "Motion Design & VFX Wheel" },
  { href: "/davinci-resolve", label: "DaVinci Resolve", subtitle: "Color Grading & Video Wall" },
  { href: "/ai", label: "AI Cinema", subtitle: "Generative Video Productions" },
  { href: "/spotlight-saturday", label: "Spotlight Saturday", subtitle: "Industry Masterclasses" },
];

const INITIAL_TOP_PAUSE_MS = 2400; // Hold at top of page for 2.4s
const BOTTOM_PAUSE_MS = 2500; // Hold at bottom of page for 2.5s
const NON_SCROLL_DURATION_MS = 10000; // Duration for single-screen pages (Photoshop, DaVinci, etc.)
const SCROLL_SPEED_PX_PER_SEC = 85; // Calibrated leisurely browsing speed (~85px/sec)

interface AutoTourContextType {
  isActive: boolean;
  isPaused: boolean;
  isTransitioning: boolean;
  currentStepIndex: number;
  totalSteps: number;
  currentStop: TourStop;
  nextStop: TourStop;
  progressPercent: number; // 0 to 100 for current page
  startTour: () => void;
  stopTour: () => void;
  togglePause: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const AutoTourContext = createContext<AutoTourContextType | null>(null);

export function AutoTourProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Derive current step from active path
  const currentStepIndex = Math.max(
    0,
    TOUR_STOPS.findIndex((s) => s.href === pathname)
  );
  const currentStop = TOUR_STOPS[currentStepIndex] || TOUR_STOPS[0];
  const nextStop = TOUR_STOPS[(currentStepIndex + 1) % TOUR_STOPS.length];

  // Ref tracking animation loop & timestamps
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const lastPauseTimestampRef = useRef<number | null>(null);
  const isNavigatingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  isPausedRef.current = isPaused;

  const performTransitionTo = useCallback(
    (targetHref: string) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      // 1. Start cinematic dark fade-out transition
      setIsTransitioning(true);

      setTimeout(() => {
        // 2. Reset scroll to top while obscured
        window.scrollTo({ top: 0, behavior: "instant" });
        // 3. Route to target page
        router.push(targetHref);

        // 4. Fade back in once navigation is initiated
        setTimeout(() => {
          setIsTransitioning(false);
          isNavigatingRef.current = false;
        }, 500);
      }, 450);
    },
    [router]
  );

  const goToIndex = useCallback(
    (index: number) => {
      const normalized = (index + TOUR_STOPS.length) % TOUR_STOPS.length;
      performTransitionTo(TOUR_STOPS[normalized].href);
    },
    [performTransitionTo]
  );

  const startTour = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    setProgressPercent(0);
    const currentIndex = TOUR_STOPS.findIndex((s) => s.href === pathname);
    if (currentIndex === -1) {
      performTransitionTo(TOUR_STOPS[0].href);
    }
  }, [pathname, performTransitionTo]);

  const stopTour = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setIsTransitioning(false);
    setProgressPercent(0);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      if (next) {
        lastPauseTimestampRef.current = performance.now();
      } else if (lastPauseTimestampRef.current !== null) {
        pausedTimeRef.current += performance.now() - lastPauseTimestampRef.current;
        lastPauseTimestampRef.current = null;
      }
      return next;
    });
  }, []);

  const nextStep = useCallback(() => {
    goToIndex(currentStepIndex + 1);
  }, [currentStepIndex, goToIndex]);

  const prevStep = useCallback(() => {
    goToIndex(currentStepIndex - 1);
  }, [currentStepIndex, goToIndex]);

  // Main automated page tour and smooth scroll orchestrator
  useEffect(() => {
    if (!isActive) return;

    // Reset loop state when page route changes
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    lastPauseTimestampRef.current = null;
    setProgressPercent(0);
    window.scrollTo({ top: 0, behavior: "instant" });

    // Allow page DOM / images to mount and calculate heights
    let readyTimer: NodeJS.Timeout | null = setTimeout(() => {
      let isCompleted = false;

      const loop = (timestamp: number) => {
        if (!isActive) return;

        if (isPausedRef.current) {
          animFrameRef.current = requestAnimationFrame(loop);
          return;
        }

        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const effectiveElapsed = timestamp - startTimeRef.current - pausedTimeRef.current;

        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );

        if (maxScroll <= 80) {
          // Case A: Page is single-screen / non-scrollable (Photoshop 3D dome, DaVinci wall, etc.)
          const totalDuration = NON_SCROLL_DURATION_MS;
          const pct = Math.min(100, (effectiveElapsed / totalDuration) * 100);
          setProgressPercent(pct);

          if (effectiveElapsed >= totalDuration && !isCompleted) {
            isCompleted = true;
            goToIndex(currentStepIndex + 1);
            return;
          }
        } else {
          // Case B: Page is scrollable (Home, Premiere Pro, Illustrator, Spotlight Saturday)
          // Total phase calculation:
          // 1. Top glance: INITIAL_TOP_PAUSE_MS
          // 2. Full scroll: scrollDuration = (maxScroll / SCROLL_SPEED_PX_PER_SEC) * 1000
          // 3. Bottom glance: BOTTOM_PAUSE_MS
          const scrollDuration = Math.max(
            6000,
            Math.min(36000, (maxScroll / SCROLL_SPEED_PX_PER_SEC) * 1000)
          );
          const totalDuration = INITIAL_TOP_PAUSE_MS + scrollDuration + BOTTOM_PAUSE_MS;
          const pct = Math.min(100, (effectiveElapsed / totalDuration) * 100);
          setProgressPercent(pct);

          if (effectiveElapsed < INITIAL_TOP_PAUSE_MS) {
            // Phase 1: Stay at top
            window.scrollTo({ top: 0, behavior: "instant" });
          } else if (effectiveElapsed < INITIAL_TOP_PAUSE_MS + scrollDuration) {
            // Phase 2: Smoothly scroll down the complete page
            const scrollElapsed = effectiveElapsed - INITIAL_TOP_PAUSE_MS;
            const scrollProgress = scrollElapsed / scrollDuration;
            // Smooth easeInOutQuad easing for ultra-natural motion
            const easeProgress =
              scrollProgress < 0.5
                ? 2 * scrollProgress * scrollProgress
                : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2;

            const targetY = easeProgress * maxScroll;
            window.scrollTo({ top: targetY, behavior: "instant" });
          } else {
            // Phase 3: Hold at bottom of page
            window.scrollTo({ top: maxScroll, behavior: "instant" });

            if (effectiveElapsed >= totalDuration && !isCompleted) {
              isCompleted = true;
              goToIndex(currentStepIndex + 1);
              return;
            }
          }
        }

        animFrameRef.current = requestAnimationFrame(loop);
      };

      animFrameRef.current = requestAnimationFrame(loop);
    }, 400);

    return () => {
      if (readyTimer) clearTimeout(readyTimer);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [pathname, isActive, currentStepIndex, goToIndex]);

  // Keyboard shortcut listeners (Escape = stop, Space = pause/resume)
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stopTour();
      } else if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        togglePause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, stopTour, togglePause]);

  return (
    <AutoTourContext.Provider
      value={{
        isActive,
        isPaused,
        isTransitioning,
        currentStepIndex,
        totalSteps: TOUR_STOPS.length,
        currentStop,
        nextStop,
        progressPercent,
        startTour,
        stopTour,
        togglePause,
        nextStep,
        prevStep,
      }}
    >
      {/* Cinematic smooth transition curtain between showcase pages */}
      <div
        className={`fixed inset-0 z-40 bg-black pointer-events-none transition-opacity duration-400 ease-in-out flex items-center justify-center ${
          isTransitioning ? "opacity-95" : "opacity-0"
        }`}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-3">
          <span className="h-6 w-6 rounded-full border-2 border-gold border-t-transparent animate-spin" />
          <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase drop-shadow-[0_0_8px_rgba(255,184,0,0.6)]">
            Exploring {nextStop.label}
          </p>
        </div>
      </div>

      {children}
    </AutoTourContext.Provider>
  );
}

export function useAutoTour() {
  const ctx = useContext(AutoTourContext);
  if (!ctx) {
    throw new Error("useAutoTour must be used within an AutoTourProvider");
  }
  return ctx;
}
