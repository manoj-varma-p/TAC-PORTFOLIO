import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import AccordionGallery from "../components/AccordionGallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Illustrator | TAC",
  description: "An accordion gallery of Illustrator work from TAC.",
};

function getIllustratorImages() {
  const dir = path.join(process.cwd(), "public", "gallery", "illustrator");
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
      image: `/gallery/illustrator/${file}`,
      label: file.replace(/\.(svg|jpe?g)$/i, "").replace(/[-_]/g, " "),
    }));
}

const PLACEHOLDER_IDS = [1015, 1018, 1039, 1043, 1044, 1050, 1062, 1069, 1074, 1080];

function getPlaceholderIllustratorImages() {
  return PLACEHOLDER_IDS.map((id, i) => ({
    image: `https://picsum.photos/id/${id}/900/1200`,
    label: `Illustrator Concept ${i + 1}`,
  }));
}

function splitIntoRows(images: ReturnType<typeof getIllustratorImages>) {
  const rowOne: typeof images = [];
  const rowTwo: typeof images = [];
  images.forEach((image, i) => (i % 2 === 0 ? rowOne : rowTwo).push(image));
  return [rowOne, rowTwo] as const;
}

export default function IllustratorPage() {
  const localImages = getIllustratorImages();
  const images =
    localImages.length > 0 ? localImages : getPlaceholderIllustratorImages();
  const [rowOne, rowTwo] = splitIntoRows(images);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center gap-6 px-6 py-12 lg:px-[60px]">
          <AccordionGallery
            items={rowOne}
            defaultIndex={Math.floor(rowOne.length / 2)}
            height={360}
            overlayColor="#050505"
          />
          {rowTwo.length > 0 && (
            <AccordionGallery
              items={rowTwo}
              defaultIndex={Math.floor(rowTwo.length / 2)}
              height={360}
              overlayColor="#050505"
            />
          )}
        </div>
      </main>
    </div>
  );
}
