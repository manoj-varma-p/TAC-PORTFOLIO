"use client";

import { useEffect, useRef } from "react";
import ShowcaseCard, { type ShowcaseImage } from "./ShowcaseCard";
import { useScrollVelocity } from "../video-wall/useScrollVelocity";

const COPIES = 8;
const CARD_MARGIN = 18;
const BASE_SPEED = 110;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function MovingImageTrack({
  items,
  direction = "left",
  onImageClick,
}: {
  items: ShowcaseImage[];
  direction?: "left" | "right";
  onImageClick: (item: ShowcaseImage) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const boostRefs = useRef<number[]>([]);
  const hoveredKeyRef = useRef<string | null>(null);
  const intensityScaleRef = useRef(1);

  const offsetRef = useRef(0);
  const wrapWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const velocityRef = useScrollVelocity(stageRef);

  const copies = Array.from({ length: COPIES }, (_, c) => c);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      // Use offsetWidth/scrollWidth which is invariant to 3D transform/scale distortions
      const copyEl = firstCopyRef.current;
      if (!copyEl) return;
      const w = copyEl.offsetWidth || copyEl.scrollWidth || 0;
      if (w > 0) {
        wrapWidthRef.current = w;
      }
      intensityScaleRef.current = el.getBoundingClientRect().width < 640 ? 0.6 : 1;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (firstCopyRef.current) ro.observe(firstCopyRef.current);
    // Measure again after brief delay to catch post-render layout
    const t = setTimeout(measure, 100);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [items]);

  useEffect(() => {
    const animate = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;

      const v = velocityRef.current;
      const dirSign = direction === "left" ? 1 : -1;
      const speed = (BASE_SPEED * v.intensity + v.bias * BASE_SPEED * 1.2) * dirSign;
      const wrapWidth = wrapWidthRef.current;

      if (wrapWidth > 0) {
        offsetRef.current += speed * dt;
        const normalizedOffset =
          ((offsetRef.current % wrapWidth) + wrapWidth) % wrapWidth;
        // Anchor at -2 * wrapWidth so there are always buffer copies on both left and right
        const translateX = -(normalizedOffset + 2 * wrapWidth);
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
        }
      }

      const stage = stageRef.current;
      if (stage) {
        const stageRect = stage.getBoundingClientRect();
        const centerX = stageRect.left + stageRect.width / 2;
        const halfWidth = Math.max(stageRect.width / 2, 1);
        const intensity = intensityScaleRef.current;

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const dist = clamp(((cardCenterX - centerX) / halfWidth) * intensity, -1.25, 1.25);
          const absDist = Math.min(Math.abs(dist), 1.15);

          const isHovered = hoveredKeyRef.current === String(i);
          const targetBoost = isHovered ? 1 : 0;
          const prevBoost = boostRefs.current[i] ?? 0;
          const boost = lerp(prevBoost, targetBoost, 1 - Math.exp(-dt / 0.15));
          boostRefs.current[i] = boost;

          // Seamless 3D concave ribbon:
          const rotateY = -dist * 24 * (1 - boost * 0.5);
          const scale = lerp(0.88, 1.04, absDist) + boost * 0.04;
          const translateZ = lerp(-140, 30, absDist) + boost * 30;
          const translateY = (1 - absDist) * 6 - boost * 4;
          const opacity = lerp(0.88, 1, absDist);
          const zIndex = Math.round(absDist * 20) + (isHovered ? 50 : 0);

          card.style.transform = `translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          card.style.opacity = String(opacity);
          card.style.zIndex = String(zIndex);
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [velocityRef]);

  let flatIndex = -1;

  return (
    <div
      ref={stageRef}
      className="relative w-full py-4 sm:py-6"
      style={{
        perspective: "850px",
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {copies.map((c) => (
          <div
            key={c}
            ref={c === 0 ? firstCopyRef : undefined}
            className="flex shrink-0 items-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item) => {
              flatIndex += 1;
              const idx = flatIndex;
              return (
                <div
                  key={`${item.id}-${c}`}
                  style={{
                    marginLeft: CARD_MARGIN,
                    marginRight: CARD_MARGIN,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <ShowcaseCard
                    item={item}
                    onClick={() => onImageClick(item)}
                    onPointerEnter={() => {
                      hoveredKeyRef.current = String(idx);
                    }}
                    onPointerLeave={() => {
                      if (hoveredKeyRef.current === String(idx)) {
                        hoveredKeyRef.current = null;
                      }
                    }}
                    cardRef={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
