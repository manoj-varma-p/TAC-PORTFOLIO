import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import SpotlightShowcase, {
  type GuestSpotlightItem,
} from "../components/SpotlightShowcase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Spotlight Saturday | TAC",
  description:
    "Explore TAC Spotlight Saturday: Weekly weekend sessions where industry leaders and creative pioneers share their real-world experiences, workflows, and insights.",
};

const GUEST_SPEAKERS_DATA: Omit<GuestSpotlightItem, "id" | "edition" | "imageSrc">[] = [
  {
    guestName: "Sailesh Kolanu",
    role: "Film Director • Writer • Creator of the HIT Universe",
    topic: "Crafting Investigative Narratives & Cinematic World-Building",
    date: "Weekend Edition #01",
    about: [
      "With a background in optometry and a passion for filmmaking, Sailesh Kolanu transitioned into cinema to build a distinctive voice in Telugu crime thrillers. He made his feature directorial debut with HIT: The First Case in 2020, introducing a grounded investigative world that grew into the acclaimed HIT Universe.",
      "He shared insights into crafting investigative narratives, building tension through character-driven storytelling, and developing interconnected stories across a larger cinematic universe. His journey demonstrates how strong world-building, attention to detail, and a clear creative vision can transform a single film into a lasting franchise.",
    ],
    keyAdvice: [
      "Strong world-building and attention to detail transform standalone stories into lasting franchises.",
      "Root high-tension investigative narratives in grounded, relatable character motivations.",
      "Trust your unique background and perspective—unconventional journeys bring fresh storytelling.",
    ],
    quote: "A gripping crime thriller is not just about the crime; it is about the emotional toll on the investigator.",
    tags: ["FilmDirecting", "Screenwriting", "WorldBuilding", "HITUniverse", "CrimeThriller"],
  },
  {
    guestName: "R. Rajashekar Reddy",
    role: "Writer • Director • Filmmaker",
    topic: "Screenwriting Mastery & Translating Script to Film",
    date: "Weekend Edition #02",
    about: [
      "R. Rajashekar Reddy is a Telugu writer and filmmaker who made his directorial debut with The Indian Story, a 2024 action thriller that he also wrote. His work reflects a strong interest in socially relevant themes, action-driven storytelling, and creating narratives with a distinct cinematic identity.",
      "He shared insights into the craft of writing for the screen, developing compelling narratives, and translating ideas from script to film. His journey highlights how a strong writing foundation, creative conviction, and a clear directorial vision can shape stories that connect with audiences.",
    ],
    keyAdvice: [
      "A strong script is the foundation of every unforgettable frame on screen.",
      "Root socially relevant themes inside gripping, action-driven narratives.",
      "Directing is about preserving your core emotional conviction through every stage of production.",
    ],
    quote: "When your writing is grounded in truth, the camera captures magic effortlessly.",
    tags: ["Screenwriting", "Directing", "ActionThriller", "TheIndianStory", "Storytelling"],
  },
  {
    guestName: "Gurugubelli Divya Sree",
    role: "Actor • Dancer • Content Creator",
    topic: "Expressive Acting, Dance & Digital-to-Mainstream Storytelling",
    date: "Weekend Edition #03",
    about: [
      "With a strong presence across Telugu entertainment and digital content, Gurugubelli Divya Sree has built a growing audience through her work as an actor, dancer, and creator. She gained recognition through short-form digital content and has since expanded her work into professional acting, appearing in projects such as Wife Off and the upcoming historical action film Swayambhu.",
      "She brings a natural and relatable presence to her performances, combining expressive acting, dance, and digital storytelling. Her journey reflects how a strong connection with audiences and a versatile creative identity can open opportunities across social media and the wider entertainment industry.",
    ],
    keyAdvice: [
      "Authenticity and audience connection are the most powerful catalysts for creative growth.",
      "Versatility across dance, acting, and digital media creates multifaceted career opportunities.",
      "Consistency in short-form content builds the stage for mainstream cinematic roles.",
    ],
    quote: "When you stay true to your expressive energy, every platform becomes your stage.",
    tags: ["Acting", "Dance", "ContentCreation", "TeluguCinema", "Swayambhu", "DigitalCreator"],
  },
  {
    guestName: "Pooja Sundaram",
    role: "Principal Typographer & Brand Architect • Studio Form",
    topic: "Custom Typography & Visual Hierarchy in Global Identities",
    date: "Weekend Edition #04",
    about: [
      "Pooja has crafted proprietary typefaces and visual identities for Fortune 500 tech companies and luxury lifestyle brands.",
      "In her weekend session, she demonstrated optical kerning secrets, bezier curve refinement in Illustrator, and the mathematical beauty of baseline grids.",
    ],
    keyAdvice: [
      "Typography is 90% of visual design. Master type hierarchy, and your layouts will immediately look world-class.",
      "Always design at extreme scales: test your logos at 16px favicons and 100-foot billboards.",
      "Custom letterforms give brands an uncopyable visual fingerprint.",
    ],
    quote: "Type is voice made visible.",
    tags: ["Illustrator", "Typography", "Branding", "VisualSystems"],
  },
  {
    guestName: "Karthik Ravichandran",
    role: "Commercial Film Director & Cinematographer",
    topic: "Directing High-Energy Commercials & Rhythmic Editing",
    date: "Weekend Edition #05",
    about: [
      "Having directed commercials for global sports and automotive brands, Karthik shared how he choreographs fast-paced visual storytelling in Premiere Pro.",
      "He showed our students raw project timelines, dissecting audio ducking, match-action cuts, and camera movement psychology that drives high retention.",
    ],
    keyAdvice: [
      "Cut for emotion and rhythm first, continuity second.",
      "Sound design accounts for over half of your video's emotional punch.",
      "Always capture practical textures and lens flares on set whenever possible.",
    ],
    quote: "Pacing is the heartbeat of film; one frame can change the entire emotional rhythm.",
    tags: ["PremierePro", "Directing", "Editing", "SoundDesign"],
  },
  {
    guestName: "Meera Krishnan",
    role: "Principal Product & Interaction Designer • Global Fintech",
    topic: "Designing Digital Experiences That Scale to Millions",
    date: "Weekend Edition #06",
    about: [
      "Meera leads design systems for digital platforms serving tens of millions of daily active users. She shared how micro-interactions build immense trust.",
      "She revealed how design velocity, data-backed iteration, and accessible UI kits turn initial prototypes into market-dominating products.",
    ],
    keyAdvice: [
      "Simplicity is the hardest thing to design, but it delivers the highest user conversion.",
      "Prototype with motion early to test spatial relationships and user cognitive load.",
      "Design systems are living products that require constant refinement and empathy.",
    ],
    quote: "Great design is invisible; users only notice when it fails them.",
    tags: ["UIDesign", "InteractionDesign", "DesignSystems", "ProductStrategy"],
  },
  {
    guestName: "Vikramaditya Roy",
    role: "Senior Matte Painter & Concept Artist • AAA Game Studio",
    topic: "Digital Matte Painting, Atmosphere & Perspective in Photoshop",
    date: "Weekend Edition #07",
    about: [
      "Vikramaditya has painted grand sci-fi and fantasy worlds for leading AAA video games and cinematic trailers.",
      "He conducted a live Photoshop masterclass demonstrating brush dynamics, atmospheric depth fog, perspective grid alignment, and photo integration.",
    ],
    keyAdvice: [
      "Squint at your thumbnail sketch: if the value structure doesn't work in black and white, color won't save it.",
      "Maintain consistent lighting angles and bounce colors across every integrated photo asset.",
      "Gather extensive real-world reference before making your first brush stroke.",
    ],
    quote: "Worldbuilding is about convincing the mind that the impossible is tangible.",
    tags: ["Photoshop", "MattePainting", "ConceptArt", "EnvironmentDesign"],
  },
  {
    guestName: "Ananya Deshmukh",
    role: "Creative Producer & Short-Form Content Strategist",
    topic: "The Psychology of 3-Second Hooks & Viral Storytelling",
    date: "Weekend Edition #08",
    about: [
      "Ananya has produced content that garnered over 500 Million cumulative views across YouTube Shorts and Instagram Reels.",
      "She broke down retention graph analytics, visual pattern interrupts, dynamic on-screen motion typography, and sound design formulas that captivate audiences.",
    ],
    keyAdvice: [
      "The first 3 seconds determine 90% of your video's organic reach.",
      "Use visual cues and sound effects every 4 seconds to re-engage viewer attention.",
      "Study what people share, not just what they watch; shareability is the true algorithm trigger.",
    ],
    quote: "In modern media, clarity beats cleverness every single time.",
    tags: ["ShortForm", "ContentStrategy", "ViralMedia", "Retention"],
  },
  {
    guestName: "Tarun Bhatia",
    role: "Master Audio Architect & Foley Artist • Studio Sonic",
    topic: "Psychoacoustic Sound Design & Commercial Audio Production",
    date: "Weekend Edition #09",
    about: [
      "Tarun has designed audioscapes for global advertising, experiential theater, and blockbuster trailers.",
      "He demonstrated how subtle sub-bass rumbles, custom whooshes, stereo panning, and foley textures turn ordinary visual cuts into visceral experiences.",
    ],
    keyAdvice: [
      "Audio is spatial: use stereo width and frequency separation so elements never compete.",
      "Silence right before a heavy drop creates 10x more impact than non-stop loud sound.",
      "Record your own foley with simple props; unique custom sounds set your work apart.",
    ],
    quote: "Sound paints the picture you feel inside your chest.",
    tags: ["SoundDesign", "AudioProduction", "Foley", "SpatialAudio"],
  },
  {
    guestName: "Shreya Chakraborty",
    role: "VFX Compositing Lead • Red Chillies / DNEG Alum",
    topic: "Planar Tracking, Green Screen Extraction & Edge Blending",
    date: "Weekend Edition #10",
    about: [
      "Shreya has supervised compositing on major commercial blockbusters. She demonstrated advanced chroma keying and clean plate reconstruction.",
      "She revealed how she handles hair detail, motion blur, and ambient light spill to make green screen actors look organically placed in practical environments.",
    ],
    keyAdvice: [
      "Never rely on a single keyer; combine core mattes with soft edge mattes.",
      "Match the camera's grain structure and lens distortion precisely on all CGI layers.",
      "Invert your matte to check for edge halos before submitting to supervisors.",
    ],
    quote: "Compositing is the final brushstroke where technology meets illusion.",
    tags: ["Compositing", "VFX", "AfterEffects", "Mocha"],
  },
  {
    guestName: "Devendra Joshi",
    role: "Character Modeler & 3D Sculptor • Feature Animation",
    topic: "Expressive 3D Character Posing & Stylized Anatomy",
    date: "Weekend Edition #11",
    about: [
      "Devendra sculpts stylized 3D characters for animated films and high-profile commercials. He walked through his workflow from 2D silhouette to final 3D asset.",
      "He shared insights into facial topology, silhouette readability, and how caricature exaggeration brings soul to digital characters.",
    ],
    keyAdvice: [
      "A strong line of action in your character's pose tells the entire story in a glance.",
      "Clean edge flow is not just technical; it ensures natural, organic facial deformation.",
      "Study human and animal anatomy intensely before attempting stylization.",
    ],
    quote: "A great character sculpt doesn't just show anatomy; it radiates personality.",
    tags: ["3DModeling", "CharacterArt", "Animation", "Sculpting"],
  },
  {
    guestName: "Niharika Seth",
    role: "Fashion & Editorial Photographer • Vogue & Elle Contributor",
    topic: "Studio Lighting Geometry & High-End Portrait Retouching",
    date: "Weekend Edition #12",
    about: [
      "Niharika is a celebrated fashion photographer whose work graces top luxury covers. She deconstructed studio lighting setups and frequency separation in Photoshop.",
      "She demonstrated non-destructive Dodge & Burn sculpting, retaining micro skin texture, and color grading for high-fashion editorial print.",
    ],
    keyAdvice: [
      "Lighting is subtractive: shaping shadows creates more drama than throwing raw light.",
      "Never blur skin; frequency separation should preserve natural pore texture seamlessly.",
      "Build authentic rapport with your subject—their confidence directly reflects in the lens.",
    ],
    quote: "Light defines the shape, but shadow reveals the soul of a portrait.",
    tags: ["Photoshop", "Photography", "Retouching", "Editorial"],
  },
  {
    guestName: "Sameer Al-Mansoor",
    role: "Kinetic Typographer & Title Sequence Designer",
    topic: "The Art of Main Title Sequences & Procedural Kinetic Motion",
    date: "Weekend Edition #13",
    about: [
      "Sameer designs opening title sequences for television series and film festivals. He shared how title design sets the psychological tone of an entire project.",
      "He demonstrated After Effects expression sliders, custom kinetic type distortion, and analog film scan overlays.",
    ],
    keyAdvice: [
      "Title sequences are mini-movies; they must evoke curiosity without spoiling the narrative.",
      "Use physics-based easing: exponential decay and spring curves feel alive and premium.",
      "Experiment with analog distortion techniques to give digital motion human warmth.",
    ],
    quote: "Titles are the prologue that bridges the viewer from reality into the story.",
    tags: ["KineticType", "TitleDesign", "AfterEffects", "MotionGraphics"],
  },
  {
    guestName: "Ritika Sengupta",
    role: "Packaging & Brand Identity Consultant • Global Luxury Goods",
    topic: "Tactile Luxury Packaging & Sustainable Brand Systems",
    date: "Weekend Edition #14",
    about: [
      "Ritika specializes in luxury packaging design, unboxing experiences, and sustainable materials for global premium brands.",
      "She shared die-line preparation in Illustrator, foil stamping simulations in 3D, and how tactile physical textures create unforgettable brand loyalty.",
    ],
    keyAdvice: [
      "Packaging is the only advertising medium that gets invited directly into the consumer's home.",
      "Always design with print finishes (emboss, foil, spot UV) in mind from day one.",
      "Sustainable design is no longer optional; it is the ultimate hallmark of luxury today.",
    ],
    quote: "Unboxing is the physical culmination of a brand's promise.",
    tags: ["Packaging", "Illustrator", "LuxuryBranding", "PrintProduction"],
  },
  {
    guestName: "Manish Chawla",
    role: "Agency Founder & Creative Entrepreneur • 0 to $1M+ Scale",
    topic: "Pricing Your Creativity, Retainers & Winning Enterprise Clients",
    date: "Weekend Edition #15",
    about: [
      "In our milestone 15th weekend edition, Manish shared transparent frameworks on monetizing creative skills and building a high-margin design agency.",
      "He detailed value-based pricing models, client contract negotiation, portfolio curation, and how creative professionals can command 10x higher fees.",
    ],
    keyAdvice: [
      "Never charge hourly for specialized creativity; charge based on the commercial value you generate.",
      "Position yourself as a strategic problem solver, not merely an order taker.",
      "The best client relationships are built on proactive communication and measurable results.",
    ],
    quote: "When you understand the value you create, pricing ceases to be a negotiation.",
    tags: ["AgencyBuilding", "CreativeBusiness", "PricingStrategy", "CareerGrowth"],
  },
];

function getSpotlightImages(): string[] {
  const candidateDirs = [
    path.join(process.cwd(), "public", "gallery", "spotlight-saturday"),
    path.join(process.cwd(), "public", "spotlight-saturday"),
  ];

  let files: { dir: string; file: string }[] = [];

  for (const dir of candidateDirs) {
    try {
      if (fs.existsSync(dir)) {
        const list = fs.readdirSync(dir);
        const valid = list
          .filter((f) => /\.(jpe?g|png|webp|svg)$/i.test(f))
          .map((file) => ({ dir, file }));
        files.push(...valid);
      }
    } catch {
      // Directory may not exist yet
    }
  }

  files.sort((a, b) => {
    const numA = parseInt(a.file.replace(/\D/g, ""), 10);
    const numB = parseInt(b.file.replace(/\D/g, ""), 10);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return a.file.localeCompare(b.file, undefined, { numeric: true });
  });

  return files.map((f) => {
    const isGallery = f.dir.includes("gallery");
    return isGallery
      ? `/gallery/spotlight-saturday/${f.file}`
      : `/spotlight-saturday/${f.file}`;
  });
}

export default function SpotlightSaturdayPage() {
  const images = getSpotlightImages();

  const items: GuestSpotlightItem[] = GUEST_SPEAKERS_DATA.map((data, index) => {
    const id = index + 1;
    const edition = `Edition #${String(id).padStart(2, "0")}`;
    const imageSrc = images[index] ?? undefined;

    return {
      id,
      edition,
      imageSrc,
      ...data,
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        <SpotlightShowcase items={items} />
      </main>
    </div>
  );
}
