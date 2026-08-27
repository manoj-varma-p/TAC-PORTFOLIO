import fs from "node:fs";
import path from "node:path";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ImageShowcase from "./components/image-showcase/ImageShowcase";
import { getPlaceholderStudents } from "./components/image-showcase/ImageData";
import type { ShowcaseImage } from "./components/image-showcase/ShowcaseCard";

export const dynamic = "force-dynamic";

function getStudentImages(): ShowcaseImage[] {
  const dir = path.join(process.cwd(), "public", "gallery", "student");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => ({
      id: file,
      src: `/gallery/student/${file}`,
      title: file.replace(/\.(jpe?g|png|webp)$/i, "").replace(/[-_]/g, " "),
    }));
}

export default function Home() {
  const localStudents = getStudentImages();
  const students =
    localStudents.length > 0 ? localStudents : getPlaceholderStudents();

  return (
    <div className="flex min-h-full flex-col bg-bg text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ImageShowcase items={students} />
      </main>
    </div>
  );
}
