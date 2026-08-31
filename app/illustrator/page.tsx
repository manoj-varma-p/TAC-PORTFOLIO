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

function getIllustratorProjects(): IllustratorProject[] {
  const dir = path.join(process.cwd(), "public", "gallery", "illustrator");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const validFiles = files
    .filter((file) => /\.(svg|jpe?g|png|webp)$/i.test(file) && file !== "README.txt")
    .sort();

  if (validFiles.length === 0) return [];

  // Group files by base timestamp or project name
  const groupMap = new Map<string, string[]>();
  for (const file of validFiles) {
    const match = file.match(/^(WhatsApp Image \d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2})/);
    const key = match ? match[1] : file.replace(/\.[^.]+$/, "").replace(/\s*\(\d+\)$/, "");
    if (!groupMap.has(key)) {
      groupMap.set(key, []);
    }
    groupMap.get(key)!.push(`/gallery/illustrator/${file}`);
  }

  const projects: IllustratorProject[] = [];
  let index = 1;
  for (const [key, imgs] of groupMap.entries()) {
    projects.push({
      id: `illustrator-set-${index}`,
      title: `Vector Concept ${String(index).padStart(2, "0")}`,
      coverImage: imgs[0],
      images: imgs,
    });
    index++;
  }

  return projects;
}

export default function IllustratorPage() {
  const projects = getIllustratorProjects();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col py-10 sm:py-14">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 lg:px-[60px]">
          {projects.length > 0 ? (
            <IllustratorGallery projects={projects} />
          ) : (
            <div className="flex flex-1 items-center justify-center py-20">
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
        </div>
      </main>
    </div>
  );
}
