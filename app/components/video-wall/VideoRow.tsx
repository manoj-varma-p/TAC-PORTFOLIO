"use client";

import { useEffect, useRef, type RefObject } from "react";
import VideoThumbnail from "./VideoThumbnail";
import type { VideoWallItem } from "./VideoData";
import type { ScrollVelocityState } from "./useScrollVelocity";

const COPIES = 6;
const ROW_GAP = 28;
const COPY_INDICES = Array.from({ length: COPIES }, (_, c) => c);

export default function VideoRow({
  items,
  direction,
  baseSpeed,
  velocityRef,
  activeId,
  onSelect,
}: {
  items: VideoWallItem[];
  direction: 1 | -1;
  baseSpeed: number;
  velocityRef: RefObject<ScrollVelocityState>;
  activeId: string;
  onSelect: (item: VideoWallItem) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const wrapWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const w = firstCopyRef.current?.getBoundingClientRect().width || 0;
      wrapWidthRef.current = w > 0 ? w + ROW_GAP : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (firstCopyRef.current) ro.observe(firstCopyRef.current);
    return () => ro.disconnect();
  }, [items]);

  useEffect(() => {
    const animate = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;

      const v = velocityRef.current;
      const speed = baseSpeed * v.intensity + v.bias * baseSpeed * 1.5;
      const wrapWidth = wrapWidthRef.current;

      if (wrapWidth > 0) {
        let next = offsetRef.current + direction * speed * dt;
        next = ((next % wrapWidth) + wrapWidth) % wrapWidth;
        offsetRef.current = next;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-next}px, 0, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [direction, baseSpeed, velocityRef]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex h-full w-max items-stretch will-change-transform"
        style={{ gap: ROW_GAP }}
      >
        {COPY_INDICES.map((c) => (
          <div
            key={c}
            ref={c === 0 ? firstCopyRef : undefined}
            className="flex h-full shrink-0 items-stretch"
            style={{ gap: ROW_GAP }}
          >
            {items.map((item) => (
              <VideoThumbnail
                key={`${item.id}-${c}`}
                item={item}
                isActive={item.id === activeId}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
