import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PremiereShowcase, { type PremiereItem } from "../components/PremiereShowcase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premiere Pro | TAC",
  description: "A dynamic showcase of Premiere Pro edits from TAC, featuring mixed widescreen cinematic cuts and vertical reels.",
};

const PREMIERE_VIDEOS: PremiereItem[] = [
  // --- NORMAL VIDEOS (16:9 Landscape) ---
  {
    id: "tCcv5Co_QE8",
    youtubeId: "tCcv5Co_QE8",
    title: "SPYDER TEASER RECUT",
    format: "normal",
    category: "Teaser Recut",
    description: "High-octane teaser recut with suspenseful build-up and kinetic transitions.",
  },
  {
    id: "FlJNvB6oSk8",
    youtubeId: "FlJNvB6oSk8",
    title: "D&D REMASTERED",
    format: "normal",
    category: "Remastered Edit",
    description: "Cinematic remastered visual pacing and high-energy sequence cutting.",
  },
  {
    id: "MTh6aqJSlto",
    youtubeId: "MTh6aqJSlto",
    title: "DUDE BLUD ON THE WAY",
    format: "normal",
    category: "Cinematic Action Cut",
    description: "High-intensity action and rhythmic pacing cut.",
  },
  {
    id: "0eeti_3e9vM",
    youtubeId: "0eeti_3e9vM",
    title: "MONSTER",
    format: "normal",
    category: "Action Trailer Cut",
    description: "High-octane rhythmic editing with fast-paced cuts and intense cinematic pacing.",
  },
  {
    id: "9M5Ub6ZZM4U",
    youtubeId: "9M5Ub6ZZM4U",
    title: "OG SAHOO",
    format: "normal",
    category: "Cinematic Mashup",
    description: "Dynamic crossover edit blending punchy sound design with explosive scene transitions.",
  },
  {
    id: "sW42rQSaNpo",
    youtubeId: "sW42rQSaNpo",
    title: "MIRAI x KALKI",
    format: "normal",
    category: "Sci-Fi Action Edit",
    description: "Futuristic visual storytelling featuring seamless VFX integration and beat-synced tempo.",
  },
  {
    id: "OGg5Rg4M5eU",
    youtubeId: "OGg5Rg4M5eU",
    title: "MAGADHEERA x DAAKU",
    format: "normal",
    category: "Epic Period Action",
    description: "Grand scale narrative cut pairing historical grandeur with gritty action sequences.",
  },
  {
    id: "3lWKKh6nPSA",
    youtubeId: "3lWKKh6nPSA",
    title: "KHALEJA 2",
    format: "normal",
    category: "High-Energy Cut",
    description: "Masterclass in tempo control, dialogue-action synchronization, and kinetic flow.",
  },
  {
    id: "0OAh46FM4k0",
    youtubeId: "0OAh46FM4k0",
    title: "HIT 2",
    format: "normal",
    category: "Crime Thriller Cut",
    description: "Atmospheric suspense building with tense sound design and precision cuts.",
  },
  {
    id: "cUWnnhF0kds",
    youtubeId: "cUWnnhF0kds",
    title: "HIT Cut by ADI",
    format: "normal",
    category: "Trailer Cut",
    description: "Adrenaline-fueled teaser cut balancing mystery, dialogue, and sharp impact points.",
  },
  {
    id: "HkDTSpWUJ9Q",
    youtubeId: "HkDTSpWUJ9Q",
    title: "Hit Cut Sriram Final",
    format: "normal",
    category: "Action Teaser",
    description: "Punchy promo reel edited for maximum theatrical anticipation.",
  },
  {
    id: "xWdWu0ZUN20",
    youtubeId: "xWdWu0ZUN20",
    title: "Highlights Reel",
    format: "normal",
    category: "Showcase Reel",
    description: "Curated sequence of premier transitions and multi-cam storytelling.",
  },
  {
    id: "lPvfx_cUOY8",
    youtubeId: "lPvfx_cUOY8",
    title: "Creative Cut",
    format: "normal",
    category: "Promo Edit",
    description: "Stylized pacing, speed ramping, and creative visual texture manipulation.",
  },
  {
    id: "7Fj4w0TycEo",
    youtubeId: "7Fj4w0TycEo",
    title: "Action Reel",
    format: "normal",
    category: "Dynamic Edit",
    description: "Precision combat scene cutting with enhanced audio punch.",
  },
  {
    id: "yBgg2fXbO8o",
    youtubeId: "yBgg2fXbO8o",
    title: "Cinematic Edit",
    format: "normal",
    category: "Color & Flow",
    description: "Deep contrast color grading harmonized with subtle motion pacing.",
  },
  {
    id: "uMtWHUsEKtM",
    youtubeId: "uMtWHUsEKtM",
    title: "Motion Cut",
    format: "normal",
    category: "Rhythmic Edit",
    description: "Multi-track audio dynamics synced with velocity curve cuts.",
  },
  {
    id: "hAhlm8Yp2m0",
    youtubeId: "hAhlm8Yp2m0",
    title: "Visual Cut",
    format: "normal",
    category: "Visual Story",
    description: "Seamless match cuts and visual continuity across dynamic frames.",
  },
  {
    id: "dWcS0FOTlBA",
    youtubeId: "dWcS0FOTlBA",
    title: "Premiere Pro Edit",
    format: "normal",
    category: "Signature Cut",
    description: "Advanced timeline organization and sound FX staging.",
  },
  {
    id: "4ula6i2yvhk",
    youtubeId: "4ula6i2yvhk",
    title: "Paradise",
    format: "normal",
    category: "Montage Edit",
    description: "Scenic rhythm and atmosphere editing.",
  },
  {
    id: "mtzx9IfvQtA",
    youtubeId: "mtzx9IfvQtA",
    title: "Spider-Man 2",
    format: "normal",
    category: "Blockbuster Edit",
    description: "Hero cut pacing with rapid impact frames.",
  },
  {
    id: "QrxlteYACwM",
    youtubeId: "QrxlteYACwM",
    title: "Spider-Man",
    format: "normal",
    category: "Action Showcase",
    description: "Cinematic scene flow and transition choreography.",
  },

  // --- SHORT VIDEOS (9:16 Vertical Reels) ---
  {
    id: "4RVBQFP5upY",
    youtubeId: "4RVBQFP5upY",
    title: "Final Cut",
    format: "short",
    category: "Cinematic Short",
    description: "Vertical 9:16 mobile edit built with punchy transitions and fast hooks.",
  },
  {
    id: "Ga1Q1HOGyJc",
    youtubeId: "Ga1Q1HOGyJc",
    title: "TAC Motion Reel",
    format: "short",
    category: "Reels / TikTok",
    description: "Quick-cut vertical reel crafted for mobile engagement and high retention.",
  },
  {
    id: "IMElCCLNKkQ",
    youtubeId: "IMElCCLNKkQ",
    title: "Spider-Man 3 Reel",
    format: "short",
    category: "Vertical Edit",
    description: "Split-second motion matching and bass-boosted sound transitions.",
  },
  {
    id: "iATcYC_R88A",
    youtubeId: "iATcYC_R88A",
    title: "Spider-Man Cut",
    format: "short",
    category: "Short Reel",
    description: "Cinematic character portrait edit in 9:16 vertical smartphone format.",
  },
];

function getLocalPremiereProVideos(): PremiereItem[] {
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
      id: file,
      video: `/gallery/premiere-pro/${file}`,
      title: file.replace(/\.(mp4|webm|mov)$/i, "").replace(/[-_]/g, " "),
      format: "normal" as const,
      category: "Local Project",
    }));
}

export default function PremiereProPage() {
  const localItems = getLocalPremiereProVideos();
  const items = localItems.length > 0 ? [...localItems, ...PREMIERE_VIDEOS] : PREMIERE_VIDEOS;

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col justify-center overflow-hidden py-3 sm:py-5">
        <PremiereShowcase items={items} />
      </main>
    </div>
  );
}
