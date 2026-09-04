import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ContentShootShowcase, { type ContentShootItem } from "../components/ContentShootShowcase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content Shoot | TAC",
  description: "Interactive production showcase of commercial film shoots, camera rigs, and high-end video productions by TAC.",
};

const SAMPLE_CONTENT_SHOOTS: ContentShootItem[] = [
  // --- 16:9 CINEMATIC & COMMERCIAL PRODUCTIONS ---
  {
    id: "cs-1",
    title: "Apex Velocity - Luxury Automotive Commercial",
    category: "Commercial",
    client: "Apex Motors",
    camera: "RED V-Raptor 8K VV",
    lens: "Cooke Anamorphic /i Full Frame Plus",
    location: "Tokyo Shuto Expressway & Studio",
    format: "normal",
    youtubeId: "y6120QOlsfU",
    description: "High-octane commercial shoot capturing dynamic motion tracking, night reflections, and high-speed car choreography.",
    tags: ["Automotive", "Commercial", "8K Cinema", "Anamorphic"],
  },
  {
    id: "cs-2",
    title: "Noir Atelier - High Fashion Studio Lookbook",
    category: "Fashion & Studio",
    client: "Noir Couture Paris",
    camera: "Sony FX6 Cinema Line",
    lens: "Sony G Master 50mm F1.2 & 85mm F1.4",
    location: "Studio Lumière Soundstage",
    format: "normal",
    youtubeId: "SlPhMPnQ58k",
    description: "Avant-garde studio lighting setup featuring dramatic continuous lighting, high-contrast rim glows, and slow-motion silk textures.",
    tags: ["Fashion", "Studio Lighting", "4K 120fps", "Slow Motion"],
  },
  {
    id: "cs-3",
    title: "Cybernetic Pulse - Hardware Brand Film",
    category: "Brand Campaign",
    client: "Nexus Tech International",
    camera: "ARRI Alexa Mini LF",
    lens: "Zeiss Supreme Prime Radiance",
    location: "Cyber District Soundstage",
    format: "normal",
    youtubeId: "1w7OgIMMRc4",
    description: "Futuristic brand film with precision robotic camera arm movements, macro hardware reveals, and neon ambient color grading.",
    tags: ["Tech", "Motion Control", "Cine Primes", "Robotic Arm"],
  },
  {
    id: "cs-4",
    title: "Artisan Aroma - Specialty Coffee Masterclass",
    category: "Cinematic B-Roll",
    client: "Heritage Roast Co.",
    camera: "Blackmagic Cinema Camera 6K",
    lens: "Laowa 24mm T14 2X Macro Probe",
    location: "Sonoma Coffee Roastery",
    format: "normal",
    youtubeId: "2Vv-BfVoq4g",
    description: "Extreme macro probe lens cinematography capturing fluid dynamics, crema textures, and warm artisan roasting atmosphere.",
    tags: ["Macro", "Culinary", "Probe Lens", "B-Roll"],
  },
  {
    id: "cs-5",
    title: "Urban Nocturne - Streetwear Capsule Shoot",
    category: "Commercial",
    client: "Vandal Streetwear",
    camera: "Sony FX3 Full-Frame",
    lens: "Sirui 35mm & 50mm Anamorphic",
    location: "Brooklyn Underground",
    format: "normal",
    youtubeId: "L_jWHffIx5E",
    description: "Guerilla-style run-and-gun street fashion shoot with handheld gimbal tracking and authentic neon flare lighting.",
    tags: ["Streetwear", "Anamorphic Flares", "Gimbal", "Night Shoot"],
  },
  {
    id: "cs-6",
    title: "Echoes of Silence - Atmospheric Documentary Cut",
    category: "Cinematic B-Roll",
    client: "Terra Vista Productions",
    camera: "Canon C500 Mark II",
    lens: "Canon Sumire Prime Set",
    location: "Iceland Highlands",
    format: "normal",
    youtubeId: "CvBfHwUxHIk",
    description: "Breathtaking landscape cinematography with aerial FPV drone tracking and dramatic low-light coastal mist captures.",
    tags: ["Landscape", "FPV Drone", "Documentary", "Natural Light"],
  },

  // --- 9:16 VERTICAL CREATOR & BRAND REELS ---
  {
    id: "cs-7",
    title: "Kinetic Drip - High-Energy Apparel Reel",
    category: "Creator Reel",
    client: "Volt Athletics",
    camera: "Sony FX3 Rigged Vertical",
    lens: "Sony GM 24-70mm F2.8 II",
    location: "Metropolis Rooftop",
    format: "short",
    youtubeId: "tmKlU5ZG1LY",
    description: "Fast-hook vertical format production tailored for social campaigns with speed ramping and beat-synced athlete moves.",
    tags: ["Vertical 9:16", "Fitness", "Speed Ramp", "Social First"],
  },
  {
    id: "cs-8",
    title: "Glow & Radiance - Luxury Skincare Macro Shoot",
    category: "Fashion & Studio",
    client: "Aura Botanicals",
    camera: "RED Komodo 6K",
    lens: "Venus Optics 100mm F2.8 2X Macro",
    location: "Studio Daylight Room",
    format: "short",
    youtubeId: "YJAbfCdwnAQ",
    description: "Crisp macro serum drops and skin texture lighting on a custom vertical motorized turntable rig.",
    tags: ["Skincare", "Turntable", "Beauty", "High Resolution"],
  },
  {
    id: "cs-9",
    title: "Soundstage Sessions - Studio Music Production Reel",
    category: "Creator Reel",
    client: "Apex Sound Lab",
    camera: "Blackmagic Pocket 6K Pro",
    lens: "Sigma Cine 18-35mm T2.0",
    location: "Live Room Studio B",
    format: "short",
    youtubeId: "WTex-gbdLOs",
    description: "Intimate studio music performance reel featuring dynamic handheld parallax movement and moody vintage tube lighting.",
    tags: ["Music", "Studio Session", "Vintage Lighting", "Handheld"],
  },
  {
    id: "cs-10",
    title: "Midnight Shift - Cyberpunk Tech Unboxing",
    category: "Brand Campaign",
    client: "Kuro Gaming",
    camera: "Sony FX3 + DJI RS3 Pro",
    lens: "Viltrox 16mm F1.8 Cine",
    location: "Neon Soundstage",
    format: "short",
    youtubeId: "4RVBQFP5upY",
    description: "Punchy short-form product reveal designed for viral reach with quick match cuts and custom audio foley.",
    tags: ["Product Reveal", "Shorts", "RGB Lighting", "Fast Pacing"],
  },
];

function getLocalContentShootVideos(): ContentShootItem[] {
  const dir = path.join(process.cwd(), "public", "gallery", "content-shoot");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((file) => /\.(mp4|webm|mov)$/i.test(file))
    .sort()
    .map((file, index) => ({
      id: `local-${index}`,
      video: `/gallery/content-shoot/${file}`,
      title: file.replace(/\.(mp4|webm|mov)$/i, "").replace(/[-_]/g, " "),
      category: "Commercial" as const,
      format: "normal" as const,
      camera: "Cinema Rig",
      description: "Local content shoot production project from TAC studio archives.",
    }));
}

export default function ContentShootPage() {
  const localItems = getLocalContentShootVideos();
  const items = localItems.length > 0 ? [...localItems, ...SAMPLE_CONTENT_SHOOTS] : SAMPLE_CONTENT_SHOOTS;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bg text-foreground">
      {/* Cinematic Ambient Glow Backdrops */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[5%] top-[10%] h-[600px] w-[600px] rounded-full opacity-60 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.14) 0%, rgba(255,140,0,0.04) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[5%] top-[30%] h-[500px] w-[500px] rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(120,60,220,0.12) 0%, transparent 70%)",
        }}
      />

      <Navbar />

      <main className="relative flex flex-1 flex-col justify-start px-4 pt-4 pb-12 sm:px-6 sm:pt-6 lg:px-10 lg:pt-6 z-10">
        <ContentShootShowcase items={items} />
      </main>
    </div>
  );
}
