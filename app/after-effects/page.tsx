import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import AfterEffectsShowcase, { type AfterEffectsItem } from "../components/AfterEffectsShowcase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "After Effects | TAC",
  description: "A title wheel of After Effects motion design and VFX work from TAC.",
};

const AFTER_EFFECTS_VIDEOS: AfterEffectsItem[] = [
  // --- TAC VERTICAL SHORTS (9:16) ---
  {
    youtubeId: "tmKlU5ZG1LY",
    title: "DM Batch",
    format: "short",
    category: "Vertical Motion Graphic",
    description: "High-retention vertical motion graphics edit with kinetic timing.",
    poster: "https://img.youtube.com/vi/tmKlU5ZG1LY/hqdefault.jpg",
  },
  {
    youtubeId: "YJAbfCdwnAQ",
    title: "DM Batch 2",
    format: "short",
    category: "Vertical Motion Graphic",
    description: "Dynamic kinetic typography and motion design short by TAC.",
    poster: "https://img.youtube.com/vi/YJAbfCdwnAQ/hqdefault.jpg",
  },
  {
    youtubeId: "WTex-gbdLOs",
    title: "DM 1",
    format: "short",
    category: "Kinetic Motion Reel",
    description: "Dynamic text animation, speed curves, and rhythmic motion design.",
    poster: "https://img.youtube.com/vi/WTex-gbdLOs/hqdefault.jpg",
  },

  // --- TAC AFTER EFFECTS MOTION & VFX CUTS (16:9) ---
  {
    youtubeId: "y6120QOlsfU",
    title: "VFX & Compositing Reel",
    format: "normal",
    category: "VFX & Compositing",
    description: "Dynamic visual effects, camera tracking, and multi-pass layer compositing.",
    poster: "https://img.youtube.com/vi/y6120QOlsfU/hqdefault.jpg",
  },
  {
    youtubeId: "L_jWHffIx5E",
    title: "Kinetic Typography & Title Design",
    format: "normal",
    category: "Motion Graphics",
    description: "Advanced kinetic typography, expression-driven text animations, and title reveals.",
    poster: "https://img.youtube.com/vi/L_jWHffIx5E/hqdefault.jpg",
  },
  {
    youtubeId: "1w7OgIMMRc4",
    title: "3D Motion & Particle Simulation",
    format: "normal",
    category: "3D & Particles",
    description: "Complex particle systems, depth passes, and stylized 3D motion dynamics.",
    poster: "https://img.youtube.com/vi/1w7OgIMMRc4/hqdefault.jpg",
  },
  {
    youtubeId: "SlPhMPnQ58k",
    title: "Motion Identity Showcase",
    format: "normal",
    category: "Brand Motion",
    description: "Sleek broadcast package animations, brand idents, and lower thirds.",
    poster: "https://img.youtube.com/vi/SlPhMPnQ58k/hqdefault.jpg",
  },
  {
    youtubeId: "2Vv-BfVoq4g",
    title: "CGI & Motion Tracking Cut",
    format: "normal",
    category: "Motion Tracking",
    description: "Seamless screen replacements, 3D camera projections, and clean plate VFX.",
    poster: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
  },
  {
    youtubeId: "fLexgOxsZu0",
    title: "Stylized HUD & UI Animation",
    format: "normal",
    category: "FUI / HUD Design",
    description: "Futuristic digital interfaces, holographic graphs, and vector data animations.",
    poster: "https://img.youtube.com/vi/fLexgOxsZu0/hqdefault.jpg",
  },
  {
    youtubeId: "CvBfHwUxHIk",
    title: "Abstract Motion Flow",
    format: "normal",
    category: "Experimental Motion",
    description: "Rhythmic expression-driven animations and fluid morphing shapes.",
    poster: "https://img.youtube.com/vi/CvBfHwUxHIk/hqdefault.jpg",
  },
];

function getLocalAfterEffectsVideos(): AfterEffectsItem[] {
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
      format: "normal" as const,
    }));
}

export default function AfterEffectsPage() {
  const localItems = getLocalAfterEffectsVideos();
  const items = localItems.length > 0 ? [...localItems, ...AFTER_EFFECTS_VIDEOS] : AFTER_EFFECTS_VIDEOS;

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col justify-center">
        <AfterEffectsShowcase items={items} />
      </main>
    </div>
  );
}
