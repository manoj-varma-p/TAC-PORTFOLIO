"use client";

import { useEffect, useRef } from "react";
import ShowcaseCard, { type ShowcaseImage } from "./ShowcaseCard";
import { useScrollVelocity } from "../video-wall/useScrollVelocity";

const COPIES = 6;
const OVERLAP = -14;
const BASE_SPEED = 34;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function MovingImageTrack({
  items,
  onImageClick,
}: {
  items: ShowcaseImage[];
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
      const w = firstCopyRef.current?.getBoundingClientRect().width || 0;
      wrapWidthRef.current = w > 0 ? w - OVERLAP : 0;
      intensityScaleRef.current = el.getBoundingClientRect().width < 640 ? 0.5 : 1;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (firstCopyRef.current) ro.observe(firstCopyRef.current);
    return () => ro.disconnect();
  }, [items]);

  useEffect(() => {
    const animate = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;

      const v = velocityRef.current;
      const speed = BASE_SPEED * v.intensity + v.bias * BASE_SPEED * 1.2;
      const wrapWidth = wrapWidthRef.current;

      if (wrapWidth > 0) {
        let next = offsetRef.current + speed * dt;
        next = ((next % wrapWidth) + wrapWidth) % wrapWidth;
        offsetRef.current = next;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-next}px, 0, 0)`;
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
          const dist = clamp(((cardCenterX - centerX) / halfWidth) * intensity, -1.4, 1.4);
          const absDist = Math.min(Math.abs(dist), 1);

          const isHovered = hoveredKeyRef.current === String(i);
          const targetBoost = isHovered ? 1 : 0;
          const prevBoost = boostRefs.current[i] ?? 0;
          const boost = lerp(prevBoost, targetBoost, 1 - Math.exp(-dt / 0.15));
          boostRefs.current[i] = boost;

          const rotateY = dist * 30 * (1 - boost * 0.5);
          const scale = 1 - absDist * 0.3 + boost * 0.08;
          const translateY = absDist * 22 - boost * 10;
          const translateZ = -absDist * 120;
          const opacity = 1 - absDist * 0.3;
          const zIndex = Math.round((1 - absDist) * 10) + (isHovered ? 20 : 0);

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
      className="relative w-full overflow-hidden py-6"
      style={{
        perspective: "1000px",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {copies.map((c) => (
          <div
            key={c}
            ref={c === 0 ? firstCopyRef : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => {
              flatIndex += 1;
              const idx = flatIndex;
              return (
                <div key={`${item.id}-${c}`} style={{ marginLeft: OVERLAP }}>
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
