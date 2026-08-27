"use client";

import { useEffect, useState } from "react";
import CTAButton from "../CTAButton";
import MovingImageTrack from "./MovingImageTrack";
import type { ShowcaseImage } from "./ShowcaseCard";

export default function ImageShowcase({
  items,
  onImageClick,
}: {
  items: ShowcaseImage[];
  onImageClick?: (item: ShowcaseImage) => void;
}) {
  const [openItem, setOpenItem] = useState<ShowcaseImage | null>(null);
  const closeLightbox = () => setOpenItem(null);

  useEffect(() => {
    if (!openItem) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openItem]);

  const handleClick = onImageClick ?? ((item: ShowcaseImage) => setOpenItem(item));

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
      <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-[60px]">
        <p className="animate-eyebrow text-[13px] font-semibold tracking-[0.3em] text-gold">
          OUR COMMUNITY
        </p>
        <h2 className="animate-heading mx-auto mt-5 max-w-[640px] text-[clamp(30px,4.2vw,48px)] font-extrabold leading-tight tracking-tight text-white">
          Faces Behind The Craft.
        </h2>
        <p className="animate-description mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-gray-light sm:text-[18px]">
          A living archive of the designers, coders, and creators shaping TAC
          — one project at a time.
        </p>
        <div className="animate-cta mt-7 flex justify-center">
          <CTAButton label="MEET OUR STUDENTS" href="#students" />
        </div>
      </div>

      <div className="mt-6">
        <MovingImageTrack items={items} onImageClick={handleClick} />
      </div>

      {openItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-lg border border-border bg-black shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg text-white transition hover:bg-black/80"
            >
              ×
            </button>
            <img
              src={openItem.src}
              alt={openItem.title ?? ""}
              className="h-full w-full object-cover"
            />
            {openItem.title && (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-10 text-[13px] font-medium tracking-[0.08em] text-white">
                {openItem.title.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
