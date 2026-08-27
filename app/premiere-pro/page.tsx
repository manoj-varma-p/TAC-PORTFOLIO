import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import DriftWall from "../components/DriftWall";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premiere Pro | TAC",
  description: "A drifting wall of Premiere Pro edits from TAC.",
};

const YOUTUBE_FALLBACK_IDS = [
  "jNQXAC9IVRw",
  "kJQP7kiw5Fk",
  "9bZkp7q19f0",
  "YQHsXMglC9A",
  "RgKAFK5djSk",
  "OPf0YbXqDm0",
  "fJ9rUzIMcZQ",
  "hT_nvWreIhg",
  "JGwWNGJdvx8",
  "CevxZvSJLk8",
  "60ItHLz5WEA",
  "pRpeEdMmmQ0",
  "09R8_2nJtjg",
  "ru0K8uYEZWw",
  "papuvlVeZg8",
];

function getLocalPremiereProVideos() {
  const dir = path.join(process.cwd(), "public", "gallery", "premiere-pro");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((file) => /\.(mp4|webm|mov)$/i.test(file))
    .sort()
    .map((file) => ({
      video: `/gallery/premiere-pro/${file}`,
      title: file.replace(/\.(mp4|webm|mov)$/i, "").replace(/[-_]/g, " "),
    }));
}

function getYouTubeFallbackVideos() {
  return YOUTUBE_FALLBACK_IDS.map((id) => ({
    youtubeId: id,
    image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    href: `https://www.youtube.com/watch?v=${id}`,
    title: "YouTube video",
  }));
}

export default function PremiereProPage() {
  const localItems = getLocalPremiereProVideos();
  const items = localItems.length > 0 ? localItems : getYouTubeFallbackVideos();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        {items.length > 0 ? (
          <div className="relative mt-8 h-[75vh] min-h-[560px] w-full">
            <DriftWall
              items={items}
              columns={5}
              tileWidth={280}
              tileHeight={178}
              gap={22}
              tilt={0}
              turn={0}
              perspective={1200}
              depth={0}
              speed={36}
              direction="up"
              variance={0.45}
              parallax={0}
              lift={64}
              fade={0.6}
              dim={1}
              overlayColor="transparent"
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6 pb-24">
            <div className="max-w-md rounded-lg border border-border bg-white/[0.03] px-8 py-12 text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-gold">
                NO VIDEOS YET
              </p>
              <p className="mt-3 text-gray-light">
                Add .mp4, .webm, or .mov files to{" "}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-white">
                  public/gallery/premiere-pro
                </code>{" "}
                and refresh this page — they will populate the wall
                automatically.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
