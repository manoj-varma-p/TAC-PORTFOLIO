"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

export type VideoFormat = "normal" | "short";

export interface PremiereItem {
  id: string;
  youtubeId?: string;
  video?: string;
  poster?: string;
  title: string;
  format: VideoFormat;
  category?: string;
  description?: string;
}

interface PremiereShowcaseProps {
  items: PremiereItem[];
}

function ThumbnailImage({
  youtubeId,
  poster,
  title,
}: {
  youtubeId?: string;
  poster?: string;
  title: string;
}) {
  const defaultThumb =
    poster ||
    (youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      : "");

  const [imgSrc, setImgSrc] = useState(defaultThumb);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!youtubeId) {
      setHasError(true);
      return;
    }
    if (imgSrc.includes("maxresdefault")) {
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    } else if (imgSrc.includes("hqdefault")) {
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !imgSrc) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-4 text-center">
        <span className="text-xs font-semibold tracking-wider text-gold/80 uppercase">
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={title}
      loading="lazy"
      decoding="async"
      onError={handleError}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 120 && imgSrc.includes("maxresdefault") && youtubeId) {
          setImgSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
        }
      }}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

function MixedVideoCard({
  item,
  onOpen,
}: {
  item: PremiereItem;
  onOpen: (item: PremiereItem) => void;
}) {
  const isShort = item.format === "short";
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    pointerStartRef.current = null;

    // Only open if pointer moved less than 8px (intentional click, not drag/scroll)
    if (dx < 8 && dy < 8) {
      onOpen(item);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
      className={`group relative w-full shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-950/90 text-left transition-all duration-300 hover:z-20 hover:border-gold/80 hover:shadow-[0_0_30px_rgba(255,184,0,0.3)] cursor-pointer select-none ${
        isShort ? "aspect-[9/15]" : "aspect-video"
      }`}
    >
      <ThumbnailImage
        youtubeId={item.youtubeId}
        poster={item.poster}
        title={item.title}
      />

      {/* Dark gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Play Icon */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/90 bg-black/75 text-gold shadow-xl backdrop-blur-md transition-all duration-300 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-[0_0_25px_rgba(255,184,0,0.5)]">
          <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ContinuousColumn({
  items,
  direction,
  speed = 32,
  onOpen,
}: {
  items: PremiereItem[];
  direction: "up" | "down";
  speed?: number;
  onOpen: (item: PremiereItem) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const setHeightRef = useRef(0);

  const copies = [0, 1, 2, 3];

  useEffect(() => {
    const measure = () => {
      if (firstSetRef.current) {
        setHeightRef.current = firstSetRef.current.offsetHeight || 0;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (firstSetRef.current) ro.observe(firstSetRef.current);
    return () => ro.disconnect();
  }, [items]);

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const setHeight = setHeightRef.current;
      if (!isPausedRef.current && setHeight > 0) {
        const move = speed * dt;
        if (direction === "up") {
          offsetRef.current += move;
          if (offsetRef.current >= setHeight) {
            offsetRef.current -= setHeight;
          }
        } else {
          offsetRef.current -= move;
          if (offsetRef.current <= 0) {
            offsetRef.current += setHeight;
          }
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [direction, speed]);

  return (
    <div
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      className="relative flex-1 min-w-0 h-full overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex flex-col w-full gap-4 sm:gap-5 will-change-transform"
      >
        {copies.map((c) => (
          <div
            key={c}
            ref={c === 0 ? firstSetRef : undefined}
            className="flex flex-col w-full gap-4 sm:gap-5 shrink-0"
          >
            {items.map((item, idx) => (
              <MixedVideoCard
                key={`${item.id}-${c}-${idx}`}
                item={item}
                onOpen={onOpen}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PremiereShowcase({ items }: PremiereShowcaseProps) {
  const [activeItem, setActiveItem] = useState<PremiereItem | null>(null);

  const columnCount = 4;

  // Strictly deduplicate and partition items so NO video ever repeats in another column
  const mixedColumns = useMemo(() => {
    const seen = new Set<string>();

    // Separate unique normals and shorts
    const normals: PremiereItem[] = [];
    const shorts: PremiereItem[] = [];

    for (const it of items) {
      const key = it.youtubeId || it.video || it.id;
      if (key && !seen.has(key)) {
        seen.add(key);
        if (it.format === "short") {
          shorts.push(it);
        } else {
          normals.push(it);
        }
      }
    }

    const cols: PremiereItem[][] = Array.from({ length: columnCount }, () => []);

    // Distribute evenly across columns without ANY duplicates
    let curCol = 0;
    shorts.forEach((s) => {
      cols[curCol % columnCount].push(s);
      curCol++;
    });

    normals.forEach((n) => {
      cols[curCol % columnCount].push(n);
      curCol++;
    });

    return cols;
  }, [items]);

  const columnConfigs: { direction: "up" | "down"; speed: number }[] = [
    { direction: "up", speed: 34 },
    { direction: "down", speed: 28 },
    { direction: "up", speed: 36 },
    { direction: "down", speed: 30 },
  ];

  const closeModal = useCallback(() => setActiveItem(null), []);

  useEffect(() => {
    if (!activeItem) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeItem, closeModal]);

  return (
    <div className="relative h-[calc(100vh-5.5rem)] min-h-[580px] max-h-[920px] w-full overflow-hidden px-3 sm:px-6">
      {/* Top & Bottom Soft Fade Masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 sm:h-24 bg-gradient-to-b from-bg via-bg/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 sm:h-24 bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      {/* 4 Continuous Looping Columns Moving in Opposite Directions with Mixed Reel & Normal Cards */}
      <div className="flex h-full w-full max-w-7xl mx-auto items-stretch gap-3 sm:gap-5 lg:gap-6">
        {mixedColumns.map((colItems, idx) => (
          <ContinuousColumn
            key={`mixed-col-${idx}`}
            items={colItems}
            direction={columnConfigs[idx].direction}
            speed={columnConfigs[idx].speed}
            onOpen={setActiveItem}
          />
        ))}
      </div>

      {/* Adaptive Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-8 backdrop-blur-md animate-fade-in"
          onClick={closeModal}
        >
          <div
            className={`relative w-full overflow-hidden rounded-2xl border border-white/20 bg-black shadow-[0_0_80px_rgba(0,0,0,0.95)] ${
              activeItem.format === "normal"
                ? "max-w-4xl aspect-video"
                : "max-w-xs sm:max-w-sm aspect-[9/16] max-h-[86vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close"
              onClick={closeModal}
              className="absolute right-3.5 top-3.5 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-xl font-bold text-white backdrop-blur transition hover:border-gold hover:text-gold hover:bg-black cursor-pointer shadow-lg"
            >
              ×
            </button>

            {/* Video Player Frame with absolute filling */}
            {activeItem.youtubeId ? (
              <div
                className={`relative w-full ${
                  activeItem.format === "normal"
                    ? "aspect-video"
                    : "aspect-[9/16] h-[80vh] max-h-[800px]"
                }`}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${activeItem.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                  title={activeItem.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder={0}
                />
              </div>
            ) : (
              <video
                src={activeItem.video}
                poster={activeItem.poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
