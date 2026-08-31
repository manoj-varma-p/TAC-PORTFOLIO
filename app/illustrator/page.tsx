import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import IllustratorGallery, { type IllustratorProject } from "../components/IllustratorGallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Illustrator | TAC",
  description: "A showcase of Adobe Illustrator vector artwork and design collections from TAC.",
};

// Curated thematic groupings of the Illustrator works
interface ThemeDefinition {
  id: string;
  title: string;
  coverImageFile: string;
  filePatterns: string[];
}

const THEME_DEFINITIONS: ThemeDefinition[] = [
  {
    id: "kabab-nation-identity",
    title: "Kabab Nation — Brand & Restaurant Identity",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.18 (2).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.18 (2).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.18 (3).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.19.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.19 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.19 (2).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.20.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.20 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.20 (2).jpeg",
    ],
  },
  {
    id: "starbucks-campaign",
    title: "Starbucks — Pumpkin Spice Campaign",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.01 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.00 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.00 (2).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.01.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.01 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.01 (2).jpeg",
    ],
  },
  {
    id: "vogue-editorial-series",
    title: "VOGUE — Editorial Cover Series",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.02 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.02 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.03.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.03 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.03 (2).jpeg",
    ],
  },
  {
    id: "giggles-baby-care",
    title: "Giggles — Baby Care Brand & Packaging",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.11.56.jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.11.56.jpeg",
      "WhatsApp Image 2026-08-31 at 13.11.56 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.11.57.jpeg",
      "WhatsApp Image 2026-08-31 at 13.11.57 (1).jpeg",
    ],
  },
  {
    id: "cadbury-silk-indulgence",
    title: "Cadbury Silk — Sweet Love Campaign",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.11.59 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.11.59 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.11.59 (2).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.00.jpeg",
    ],
  },
  {
    id: "urban-cargo-streetwear",
    title: "Cargo Streetwear — Modern Apparel Series",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.11.58 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.11.58 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.11.59.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.11.jpeg",
    ],
  },
  {
    id: "craft-beer-happy-hours",
    title: "Craft Beer & Pub Happy Hour Series",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.17.jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.17.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.10 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.05.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.05 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.09 (2).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.11 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.16.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.16 (1).jpeg",
    ],
  },
  {
    id: "architecture-construction",
    title: "Architecture & Infrastructure Design",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.08.jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.08.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.05 (2).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.13 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.18.jpeg",
    ],
  },
  {
    id: "gourmet-culinary-adverts",
    title: "Gourmet Dining & Restaurant Adverts",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.13.jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.13.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.11 (3).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.07.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.09.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.06.jpeg",
    ],
  },
  {
    id: "the-grill-american-lamb",
    title: "The Grill — American Lamb Chops Campaign",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.04.jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.04.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.04 (1).jpeg",
    ],
  },
  {
    id: "ojas-gambeera-merch",
    title: "OJAS Gambeera — Streetwear Merch Line",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.11.58.jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.11.57 (2).jpeg",
      "WhatsApp Image 2026-08-31 at 13.11.58.jpeg",
    ],
  },
  {
    id: "fashion-store-editorials",
    title: "Menswear & Retail Campaign Posters",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.12 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.10.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.12 (1).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.15.jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.02.jpeg",
    ],
  },
  {
    id: "healthcare-cardiology",
    title: "Healthcare & Cardiology Medical Series",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.06 (2).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.06 (2).jpeg",
      "WhatsApp Image 2026-08-31 at 13.12.13 (2).jpeg",
    ],
  },
  {
    id: "porsche-gt3rs-poster",
    title: "Porsche 911 GT3 RS — Motorsport Spec Poster",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.03 (3).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.03 (3).jpeg",
    ],
  },
  {
    id: "nike-air-flex",
    title: "Nike Air Flex — Neon Kinetic Ad",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.09 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.09 (1).jpeg",
    ],
  },
  {
    id: "soybal-tofu-packaging",
    title: "SoyBal — Organic Tofu Package Design",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.21.jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.21.jpeg",
    ],
  },
  {
    id: "highway-vintage-cinema",
    title: "Highway — Vintage Automotive Cinema Poster",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.12.jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.12.jpeg",
    ],
  },
  {
    id: "mana-tandoori-adda",
    title: "Mana Tandoori Adda — Restaurant Promo",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.04 (2).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.04 (2).jpeg",
    ],
  },
  {
    id: "live-in-varanasi",
    title: "Live In Varanasi — Music Festival Poster",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.06 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.06 (1).jpeg",
    ],
  },
  {
    id: "barber-shop-salon",
    title: "The Barber Shop — Grooming Studio Promo",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.17 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.17 (1).jpeg",
    ],
  },
  {
    id: "berry-drift-cocktail",
    title: "Berry Drift — Jeju Okinawa Mixology",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.11 (2).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.11 (2).jpeg",
    ],
  },
  {
    id: "varahi-fincare-car-loan",
    title: "Varahi Fincare — Auto Finance Campaign",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.10 (2).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.10 (2).jpeg",
    ],
  },
  {
    id: "digital-media-spotlight",
    title: "Digital Media — Video Feature Cover",
    coverImageFile: "WhatsApp Image 2026-08-31 at 13.12.18 (1).jpeg",
    filePatterns: [
      "WhatsApp Image 2026-08-31 at 13.12.18 (1).jpeg",
    ],
  },
];

function getIllustratorProjects(): IllustratorProject[] {
  const dir = path.join(process.cwd(), "public", "gallery", "illustrator");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const validFiles = new Set(
    files.filter((file) => /\.(svg|jpe?g|png|webp)$/i.test(file) && file !== "README.txt")
  );

  if (validFiles.size === 0) return [];

  const matchedFiles = new Set<string>();
  const projects: IllustratorProject[] = [];

  // 1. Build projects from our explicit thematic definitions
  for (const theme of THEME_DEFINITIONS) {
    const existingImages: string[] = [];
    for (const pattern of theme.filePatterns) {
      if (validFiles.has(pattern)) {
        existingImages.push(`/gallery/illustrator/${pattern}`);
        matchedFiles.add(pattern);
      }
    }

    if (existingImages.length > 0) {
      const cover = validFiles.has(theme.coverImageFile)
        ? `/gallery/illustrator/${theme.coverImageFile}`
        : existingImages[0];

      projects.push({
        id: theme.id,
        title: theme.title,
        coverImage: cover,
        images: existingImages,
      });
    }
  }

  // 2. Handle any unmatched files gracefully (e.g. newly added images in the future)
  const remainingFiles = Array.from(validFiles).filter((f) => !matchedFiles.has(f)).sort();
  if (remainingFiles.length > 0) {
    const groupMap = new Map<string, string[]>();
    for (const file of remainingFiles) {
      const match = file.match(/^(WhatsApp Image \d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2})/);
      const key = match ? match[1] : file.replace(/\.[^.]+$/, "").replace(/\s*\(\d+\)$/, "");
      if (!groupMap.has(key)) {
        groupMap.set(key, []);
      }
      groupMap.get(key)!.push(`/gallery/illustrator/${file}`);
    }

    let extraIdx = projects.length + 1;
    for (const [, imgs] of groupMap.entries()) {
      projects.push({
        id: `illustrator-set-${extraIdx}`,
        title: `Design Collection ${String(extraIdx).padStart(2, "0")}`,
        coverImage: imgs[0],
        images: imgs,
      });
      extraIdx++;
    }
  }

  return projects;
}

export default function IllustratorPage() {
  const projects = getIllustratorProjects();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col justify-center overflow-hidden py-4 sm:py-6">
        {projects.length > 0 ? (
          <div className="relative mx-auto flex h-[calc(100vh-6.5rem)] min-h-[500px] max-h-[840px] w-full flex-col px-3 sm:px-6">
            <IllustratorGallery projects={projects} />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6 pb-24">
            <div className="max-w-md rounded-2xl border border-border bg-white/[0.03] px-8 py-12 text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-gold">
                NO ILLUSTRATIONS YET
              </p>
              <p className="mt-3 text-gray-light text-sm">
                Add image files to{" "}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-white">
                  public/gallery/illustrator
                </code>{" "}
                and refresh this page.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
