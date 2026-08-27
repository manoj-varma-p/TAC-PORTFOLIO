"use client";

import { useRef, useState } from "react";
import VideoRow from "./VideoRow";
import CenterYoutubePlayer from "./CenterYoutubePlayer";
import { useScrollVelocity } from "./useScrollVelocity";
import { VIDEO_WALL_ITEMS, chunkIntoRows, type VideoWallItem } from "./VideoData";

const ROW_COUNT = 3;
const ROWS = chunkIntoRows(VIDEO_WALL_ITEMS, ROW_COUNT);

export default function VideoWall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const velocityRef = useScrollVelocity(sectionRef);
  const [activeVideo, setActiveVideo] = useState<VideoWallItem>(VIDEO_WALL_ITEMS[0]);

  return (
    <div
      ref={sectionRef}
      className="relative h-[88vh] min-h-[620px] w-full overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 flex flex-col gap-[clamp(16px,2.4vh,36px)] px-[clamp(16px,3vw,48px)] py-[clamp(16px,2.8vh,40px)]">
        {ROWS.map((rowItems, i) => (
          <div key={i} className="flex min-h-0 flex-1">
            <VideoRow
              items={rowItems}
              direction={i % 2 === 0 ? 1 : -1}
              baseSpeed={60 + i * 10}
              velocityRef={velocityRef}
              activeId={activeVideo.id}
              onSelect={setActiveVideo}
            />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="pointer-events-auto">
          <CenterYoutubePlayer
            youtubeId={activeVideo.youtubeId}
            title={activeVideo.title}
          />
        </div>
      </div>
    </div>
  );
}
