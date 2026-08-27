"use client";

import { useState } from "react";
import OptionWheel from "./OptionWheel";

export interface AfterEffectsItem {
  title: string;
  video?: string;
  youtubeId?: string;
  poster?: string;
}

export default function AfterEffectsShowcase({
  items,
}: {
  items: AfterEffectsItem[];
}) {
  const [selected, setSelected] = useState(Math.floor((items.length - 1) / 2));
  const current = items[selected];

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 px-6 py-10 lg:flex-row lg:gap-10 lg:px-[60px]">
      <div className="relative h-[320px] w-full shrink-0 lg:h-auto lg:w-[36%]">
        <OptionWheel
          items={items.map((item) => item.title)}
          defaultSelected={selected}
          side="left"
          fontSize={1.5}
          spacing={1.7}
          inset={8}
          tilt={14}
          curve={1.1}
          blur={1.2}
          fade={0.15}
          minOpacity={0.4}
          textColor="#5f5f5f"
          activeColor="#ffffff"
          onChange={(index) => setSelected(index)}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
          {current.youtubeId ? (
            <iframe
              key={current.youtubeId}
              src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
              title={current.title}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder={0}
            />
          ) : (
            <video
              key={current.video}
              src={current.video}
              poster={current.poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <p className="mt-5 text-[clamp(20px,2.4vw,28px)] font-semibold text-white">
          {current.title}
        </p>
      </div>
    </div>
  );
}
