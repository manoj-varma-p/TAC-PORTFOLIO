import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import DomeGallery from "../components/DomeGallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photoshop | TAC",
  description: "A rotating dome gallery of Photoshop work from TAC.",
};

function getPhotoshopImages() {
  const dir = path.join(process.cwd(), "public", "gallery", "photoshop");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((file) => /\.(svg|jpe?g)$/i.test(file))
    .sort()
    .map((file) => ({
      src: `/gallery/photoshop/${file}`,
      alt: file.replace(/\.(svg|jpe?g)$/i, "").replace(/[-_]/g, " "),
    }));
}

export default function PhotoshopPage() {
  const images = getPhotoshopImages();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        {images.length > 0 ? (
          <div className="relative h-[calc(100vh-100px)] min-h-[600px] w-full">
            <DomeGallery
              images={images}
              fit={1.05}
              minRadius={900}
              padFactor={0.15}
              maxVerticalRotationDeg={12}
              segments={22}
              dragDampening={1}
              grayscale={false}
              overlayBlurColor="#050505"
              autoRotate
              autoRotateSpeed={6}
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6 pb-24">
            <div className="max-w-md rounded-lg border border-border bg-white/[0.03] px-8 py-12 text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-gold">
                NO IMAGES YET
              </p>
              <p className="mt-3 text-gray-light">
                Add .svg, .jpg, or .jpeg files to{" "}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-white">
                  public/gallery/photoshop
                </code>{" "}
                and refresh this page — they will populate the gallery
                automatically.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
