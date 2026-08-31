"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

export interface PremiereWallItem {
  image?: string;
  video?: string;
  youtubeId?: string;
  poster?: string;
  title?: string;
  href?: string;
}

interface PremiereWallProps {
  items: PremiereWallItem[];
}

function VideoTile({
  item,
  onOpen,
}: {
  item: PremiereWallItem;
  onOpen: (item: PremiereWallItem) => void;
}) {
  const defaultThumb =
    item.image ||
    (item.youtubeId
      ? `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`
      : item.poster || "");

  const [imgSrc, setImgSrc] = useState(defaultThumb);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleError = () => {
    if (!item.youtubeId) {
      setHasError(true);
      return;
    }
    if (imgSrc.includes("maxresdefault")) {
      setImgSrc(`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`);
    } else if (imgSrc.includes("hqdefault")) {
      setImgSrc(`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`);
    } else {
      setHasError(true);
    }
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full aspect-[9/16] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl transition-all duration-300 hover:z-30 hover:scale-[1.04] hover:border-gold hover:shadow-[0_0_35px_rgba(255,184,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={item.title || "Play reel"}
    >
      {item.video ? (
        <video
          src={item.video}
          poster={item.poster}
          muted
          loop
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
      ) : !hasError && imgSrc ? (
        <img
          src={imgSrc}
          alt={item.title || "Video thumbnail"}
          loading="lazy"
          decoding="async"
          onError={handleError}
          onLoad={(e) => {
            if (e.currentTarget.naturalWidth === 120) {
              if (imgSrc.includes("maxresdefault") && item.youtubeId) {
                setImgSrc(`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`);
              } else {
                setHasError(true);
              }
            }
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-4 text-center">
          <span className="text-xs font-semibold tracking-wider text-gold/80 uppercase">
            TAC Showcase
          </span>
        </div>
      )}

      {/* Dark gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-20" />

      {/* Play Icon */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-gold/90 bg-black/70 text-gold shadow-lg backdrop-blur-md transition-all duration-300 ${
            isHovered ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function VerticalColumn({
  items,
  direction,
  speed = 36,
  onOpen,
}: {
  items: PremiereWallItem[];
  direction: "up" | "down";
  speed?: number;
  onOpen: (item: PremiereWallItem) => void;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const setHeightRef = useRef(0);

  const copies = [0, 1, 2, 3, 4];

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
      ref={colRef}
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
        className="flex flex-col w-full gap-4 sm:gap-6 will-change-transform"
      >
        {copies.map((c) => (
          <div
            key={c}
            ref={c === 0 ? firstSetRef : undefined}
            className="flex flex-col w-full gap-4 sm:gap-6 shrink-0"
          >
            {items.map((item, idx) => (
              <VideoTile
                key={`${item.youtubeId || item.video || idx}-${c}-${idx}`}
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

export default function PremiereWall({ items }: PremiereWallProps) {
  const [openItem, setOpenItem] = useState<PremiereWallItem | null>(null);

  const closeLightbox = useCallback(() => setOpenItem(null), []);

  useEffect(() => {
    if (!openItem) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openItem, closeLightbox]);

  // Distribute items across 4 vertical columns
  const columnCount = 4;
  const columns: PremiereWallItem[][] = useMemo(() => {
    const cols: PremiereWallItem[][] = Array.from({ length: columnCount }, () => []);
    items.forEach((item, index) => {
      cols[index % columnCount].push(item);
    });
    return cols.map((col) => (col.length > 0 ? col : items));
  }, [items]);

  const columnConfigs: { direction: "up" | "down"; speed: number }[] = [
    { direction: "up", speed: 36 },
    { direction: "down", speed: 30 },
    { direction: "up", speed: 38 },
    { direction: "down", speed: 32 },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Top & Bottom Soft Fade Masks so cards enter and exit gracefully with zero harsh cuts */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-bg via-bg/60 to-transparent sm:h-24" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-bg via-bg/60 to-transparent sm:h-24" />

      {/* 4 Vertical Up/Down Columns */}
      <div className="flex h-full w-full max-w-6xl mx-auto items-stretch gap-3 sm:gap-5 lg:gap-6 px-1">
        {columns.map((colItems, idx) => (
          <VerticalColumn
            key={`col-${idx}`}
            items={colItems}
            direction={columnConfigs[idx].direction}
            speed={columnConfigs[idx].speed}
            onOpen={setOpenItem}
          />
        ))}
      </div>

      {/* Video Lightbox Modal */}
      {openItem && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <div
            className="relative aspect-[9/16] h-full max-h-[85vh] w-auto max-w-sm sm:max-w-md overflow-hidden rounded-2xl border border-white/20 bg-black shadow-[0_0_60px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-lg text-white backdrop-blur transition hover:border-gold hover:text-gold hover:bg-black/90 cursor-pointer"
            >
              ×
            </button>
            {openItem.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${openItem.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={openItem.title || "YouTube video"}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder={0}
              />
            ) : (
              <video
                src={openItem.video}
                poster={openItem.poster}
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
