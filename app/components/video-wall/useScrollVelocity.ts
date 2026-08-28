"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface ScrollVelocityState {
  /** Always-positive speed multiplier: 1 = base speed, up to ~7x during fast scrolling. */
  intensity: number;
  /** Signed, damped bias in roughly [-1, 1] reflecting recent scroll direction. */
  bias: number;
}

/**
 * Tracks wheel velocity over `targetRef` and exposes it as a ref (not state) so
 * consumers can read it inside their own rAF loop without triggering re-renders.
 * Intensity/bias ease toward their targets and decay back to rest once scrolling
 * stops, so background speed feels physical rather than snapping instantly.
 */
export function useScrollVelocity(targetRef: RefObject<HTMLElement | null>) {
  const stateRef = useRef<ScrollVelocityState>({ intensity: 1, bias: 0 });
  const rawDeltaRef = useRef(0);

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      rawDeltaRef.current = delta;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, now - last) / 1000);
      last = now;

      const targetIntensity = 1 + Math.min(6, Math.abs(rawDeltaRef.current) / 40);
      const targetBias = Math.max(-1, Math.min(1, rawDeltaRef.current / 300));

      const decay = 1 - Math.exp(-dt / 0.35);
      const s = stateRef.current;
      s.intensity += (targetIntensity - s.intensity) * decay;
      s.bias += (targetBias - s.bias) * decay;

      rawDeltaRef.current *= 0.85;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return stateRef;
}
