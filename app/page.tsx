import fs from "node:fs";
import path from "node:path";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ImageShowcase from "./components/image-showcase/ImageShowcase";
import HiresBySection, { type CompanyItem } from "./components/HiresBySection";
import MoreFromTac from "./components/MoreFromTac";
import TutorsSection from "./components/TutorsSection";
import PlacementStatsSection from "./components/PlacementStatsSection";
import Footer from "./components/Footer";
import type { MorphItem } from "./components/MorphSlider";
import { getPlaceholderStudents } from "./components/image-showcase/ImageData";
import type { ShowcaseImage } from "./components/image-showcase/ShowcaseCard";

export const dynamic = "force-dynamic";

const COMPANY_META: Record<string, { name: string; industry: string }> = {
  "cgs": { name: "CGS", industry: "Global Tech Solutions" },
  "citta-ai": { name: "Citta AI", industry: "AI & Neural Systems" },
  "brochill": { name: "Brochill", industry: "Media & Social App" },
  "luk-studio": { name: "LUK Studio", industry: "Cinematography & Studio" },
  "rare-cafe": { name: "Raré Café", industry: "Boutique Hospitality" },
  "ozrit": { name: "Ozrit", industry: "Creative Digital Studio" },
  "bristle-tech": { name: "Bristle Tech", industry: "Hyperreality & VFX" },
  "theory-consulting": { name: "Theory Consulting", industry: "Brand Consulting" },
  "the-big-day": { name: "The Big Day By Chai", industry: "Cinematic Productions" },
  "reginald-men": { name: "Reginald Men", industry: "Fashion & Lifestyle" },
  "dakshin-stories": { name: "Dakshin Stories", industry: "Media & Content" },
  "digital-yuvi": { name: "Digital Yuvi", industry: "Creative Marketing" },
  "reds-antz": { name: "Reds Antz Studios", industry: "Animation & Motion" },
  "al-oka": { name: "Al-Oka Media", industry: "Media Solutions" },
  "nikhila-constructions": { name: "Nikhila Constructions", industry: "Infrastructure & Dev" },
  "property-edge": { name: "Property Edge", industry: "Real Estate & Infra" },
  "fialg-rentals": { name: "FialG Rentals", industry: "Production Rentals" },
  "nurturing-growth": { name: "Walls & Trends", industry: "Interior & Architecture" },
  "conduira": { name: "Conduira", industry: "EdTech & Career Prep" },
  "b-hub-media": { name: "B-Hub Media", industry: "Entertainment & Media" },
  "cloud-realty": { name: "Cloud Realty", industry: "Real Estate & Housing" },
  "hyderabad-talkies": { name: "Hyderabad Talkies", industry: "Events & Cinema" },
  "samvya-photography": { name: "Samvya Photography", industry: "Luxury Photography" },
  "honasa": { name: "Honasa Consumer", industry: "FMCG & Beauty Giant" },
  "medigita": { name: "Medigita Technologies", industry: "Healthcare & Digital Tech" },
  "rk-media": { name: "RK Media", industry: "Digital & Video Production" },
  "yaas": { name: "YAAS", industry: "Creative & Lifestyle" },
  "keus": { name: "Keus Smart Home", industry: "Smart Living & IoT" },
  "sri-sreenivasa-infra": { name: "Sri Sreenivasa Infra", industry: "Infrastructure & Realty" },
  "obladi-creatives": { name: "Obladi Creatives", industry: "Advertising & Creatives" },
  "vayura-solutions": { name: "Vayura Solutions", industry: "Global Tech Services" },
  "student-tribe": { name: "Student Tribe", industry: "Youth Community & Media" },
  "wilson": { name: "Wilson", industry: "Global Brand & Apparel" },
  "cloud-sync": { name: "CloudSync", industry: "Cloud & Data Systems" },
  "k-creatives": { name: "K-Creatives", industry: "Design & Brand Studio" },
  "onegrasp": { name: "OneGrasp", industry: "AI & Software Tech" },
  "ekam": { name: "Ekam", industry: "Community & Media Network" },
  "starbuzz-ai": { name: "Starbuzz.ai", industry: "Influencer Marketing AI" },
  "zyro-lifts": { name: "Zyro Lifts", industry: "Mobility & Infrastructure" },
};

function getCompanyImages(): CompanyItem[] {
  const dir = path.join(process.cwd(), "public", "gallery", "companies");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((file) => /\.(png|webp)$/i.test(file))
    .sort()
    .map((file) => {
      const baseKey = file.replace(/\.(png|webp)$/i, "").toLowerCase();
      const meta = COMPANY_META[baseKey];
      return {
        id: file,
        name: meta?.name || file.replace(/\.(png|webp)$/i, "").replace(/[-_]/g, " "),
        industry: meta?.industry,
        logo: `/gallery/companies/${file}`,
      };
    });
}

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
  sai: "Sai Somayajulu",
  sasi: "Seshi Kiran",
  basha: "Nagoor Basha Sk",
  bhanu: "J. Bhanuchandar",
  rajesh: "V. Rajesh",
  jagadesh: "Jagadeesh",
  raj: "Raj Krish",
};

const TUTOR_ORDER = [
  "lokesh",
  "vali",
  "durga",
  "sai",
  "sasi",
  "basha",
  "bhanu",
  "rajesh",
];

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
  const companies = getCompanyImages();

  return (
    <div className="flex min-h-full flex-col bg-bg text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ImageShowcase items={students} />
        <HiresBySection companies={companies} />
        <MoreFromTac />
        <TutorsSection items={localTutors.length > 0 ? localTutors : undefined} />
        <PlacementStatsSection />
      </main>
      <Footer />
    </div>
  );
}
