"use client";

import { useState } from "react";
import {
  youtubeThumbnail,
  youtubeThumbnailFallback,
  type VideoWallItem,
} from "./VideoData";

const ALIGN_CLASS: Record<VideoWallItem["align"], string> = {
  start: "self-start",
  center: "self-center",
  end: "self-end",
};

export default function VideoThumbnail({
  item,
  isActive,
  onSelect,
}: {
  item: VideoWallItem;
  isActive: boolean;
  onSelect: (item: VideoWallItem) => void;
}) {
  const [src, setSrc] = useState(() => youtubeThumbnail(item.youtubeId));
  const fallbackSrc = youtubeThumbnailFallback(item.youtubeId);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-label={`Play ${item.title}`}
      aria-current={isActive ? "true" : undefined}
      className={`group relative h-full shrink-0 cursor-pointer overflow-hidden rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${ALIGN_CLASS[item.align]} ${
        isActive ? "ring-2 ring-white/80" : ""
      }`}
      style={{
        height: `${item.heightRatio * 100}%`,
        aspectRatio: item.aspect,
      }}
    >
      <img
        src={src}
        onError={() => setSrc((s) => (s === fallbackSrc ? s : fallbackSrc))}
        onLoad={(e) => {
          // maxresdefault.jpg returns HTTP 200 with a 120x90 gray
          // placeholder (not a 404) when a video has no maxres thumbnail.
          if (e.currentTarget.naturalWidth === 120 && src !== fallbackSrc) {
            setSrc(fallbackSrc);
          }
        }}
        alt={item.title}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover opacity-[0.8] blur-[0.3px] brightness-[0.6] transition-[filter,opacity,transform] duration-[420ms] ease-out will-change-transform group-hover:scale-105 group-hover:opacity-100 group-hover:blur-none group-hover:brightness-90 group-focus-visible:scale-105 group-focus-visible:opacity-100 group-focus-visible:blur-none group-focus-visible:brightness-90"
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/30 text-white backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
