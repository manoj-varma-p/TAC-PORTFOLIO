import fs from "node:fs";
import path from "node:path";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ImageShowcase from "./components/image-showcase/ImageShowcase";
import MoreFromTac from "./components/MoreFromTac";
import TutorsSection from "./components/TutorsSection";
import PlacementStatsSection from "./components/PlacementStatsSection";
import Footer from "./components/Footer";
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

const TUTOR_FULL_NAMES: Record<string, string> = {
  lokesh: "Lokesh Dama",
  vali: "Vali Sayyad",
  durga: "Durga Sai",
  jagadesh: "Jagadeesh",
  raj: "Raj Krish",
  sai: "Sai Somayajulu",
  sasi: "Seshi Kiran",
};

const TUTOR_ORDER = ["lokesh", "vali", "durga", "jagadesh", "raj", "sai", "sasi"];

function getTutorImages(): MorphItem[] {
  const dir = path.join(process.cwd(), "public", "gallery", "tutors");
  let files: string[] = [];
  try {
    files = fs.readdirSync(/*turbopackIgnore: true*/ dir);
  } catch {
    return [];
  }
  return files
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort((a, b) => {
      const keyA = a.replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase();
      const keyB = b.replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase();
      const idxA = TUTOR_ORDER.indexOf(keyA);
      const idxB = TUTOR_ORDER.indexOf(keyB);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return keyA.localeCompare(keyB);
    })
    .map((file) => {
      const key = file.replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase();
      const fullName = TUTOR_FULL_NAMES[key] || file.replace(/\.(jpe?g|png|webp)$/i, "").replace(/[-_]/g, " ");
      return {
        image: `/gallery/tutors/${file}`,
        caption: fullName,
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
        <MoreFromTac />
        <TutorsSection items={localTutors.length > 0 ? localTutors : undefined} />
        <PlacementStatsSection />
      </main>
      <Footer />
    </div>
  );
}
