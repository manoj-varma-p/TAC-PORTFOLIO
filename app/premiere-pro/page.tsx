import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PremiereWall, { type PremiereWallItem } from "../components/PremiereWall";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premiere Pro | TAC",
  description: "A seamless 3-row showcase of Premiere Pro edits from TAC.",
};

const YOUTUBE_VIDEOS: { id: string; title: string; thumbnail?: string }[] = [
  { id: "Ga1Q1HOGyJc", title: "TAC" },
  { id: "IMElCCLNKkQ", title: "Spider-Man 3" },
  { id: "4ula6i2yvhk", title: "Paradise" },
  { id: "iATcYC_R88A", title: "Spider-Man Cut" },
  { id: "mtzx9IfvQtA", title: "Spider-Man 2" },
  { id: "QrxlteYACwM", title: "Spider-Man" },
  { id: "0OAh46FM4k0", title: "HIT 2" },
  { id: "cUWnnhF0kds", title: "HIT Cut by ADI" },
  { id: "HkDTSpWUJ9Q", title: "Hit Cut Sriram Final" },
];

function getLocalPremiereProVideos(): PremiereWallItem[] {
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

function getYouTubeFallbackVideos(): PremiereWallItem[] {
  return YOUTUBE_VIDEOS.map((item) => ({
    youtubeId: item.id,
    image: item.thumbnail || `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`,
    href: `https://www.youtube.com/watch?v=${item.id}`,
    title: item.title,
  }));
}

export default function PremiereProPage() {
  const localItems = getLocalPremiereProVideos();
  const items = localItems.length > 0 ? localItems : getYouTubeFallbackVideos();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col justify-center overflow-hidden py-4 sm:py-6">
        {items.length > 0 ? (
          <div className="relative mx-auto flex h-[calc(100vh-6.5rem)] min-h-[500px] max-h-[820px] w-full flex-col px-3 sm:px-6">
            <PremiereWall items={items} />
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
