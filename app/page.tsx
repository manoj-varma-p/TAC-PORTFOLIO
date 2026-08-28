import fs from "node:fs";
import path from "node:path";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ImageShowcase from "./components/image-showcase/ImageShowcase";
import TutorsSection from "./components/TutorsSection";
import type { MorphItem } from "./components/MorphSlider";
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

function getTutorImages(): MorphItem[] {
  const dir = path.join(process.cwd(), "public", "gallery", "tutors");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  const preferredOrder = ["lokesh", "vali", "durga"];
  return files
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort((a, b) => {
      const nameA = a.replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase();
      const nameB = b.replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase();
      const idxA = preferredOrder.indexOf(nameA);
      const idxB = preferredOrder.indexOf(nameB);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return nameA.localeCompare(nameB);
    })
    .map((file) => {
      const rawName = file.replace(/\.(jpe?g|png|webp)$/i, "").replace(/[-_]/g, " ");
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      return {
        image: `/gallery/tutors/${file}`,
        caption: formattedName.length > 0 ? formattedName : "TAC Instructor & Mentor",
      };
    });
}

export default function Home() {
  const localStudents = getStudentImages();
  const students =
    localStudents.length > 0 ? localStudents : getPlaceholderStudents();
  const localTutors = getTutorImages();

  return (
    <div className="flex min-h-full flex-col bg-bg text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ImageShowcase items={students} />
        <TutorsSection items={localTutors.length > 0 ? localTutors : undefined} />
      </main>
    </div>
  );
}
