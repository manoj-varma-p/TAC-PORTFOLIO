import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import AfterEffectsShowcase from "../components/AfterEffectsShowcase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "After Effects | TAC",
  description: "A title wheel of After Effects work from TAC.",
};

const YOUTUBE_FALLBACK_IDS = [
  "y6120QOlsfU",
  "L_jWHffIx5E",
  "1w7OgIMMRc4",
  "SlPhMPnQ58k",
  "2Vv-BfVoq4g",
  "fLexgOxsZu0",
  "CvBfHwUxHIk",
];

function getLocalAfterEffectsVideos() {
  const dir = path.join(process.cwd(), "public", "gallery", "after-effects");
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
      video: `/gallery/after-effects/${file}`,
      title: file.replace(/\.(mp4|webm|mov)$/i, "").replace(/[-_]/g, " "),
    }));
}

function getYouTubeFallbackVideos() {
  return YOUTUBE_FALLBACK_IDS.map((id, i) => ({
    youtubeId: id,
    poster: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    title: `After Effects Reel ${String(i + 1).padStart(2, "0")}`,
  }));
}

export default function AfterEffectsPage() {
  const localItems = getLocalAfterEffectsVideos();
  const items = localItems.length > 0 ? localItems : getYouTubeFallbackVideos();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        <AfterEffectsShowcase items={items} />
      </main>
    </div>
  );
}
