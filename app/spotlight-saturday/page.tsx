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
    guestName: "Bhavani Reddy",
    role: "Digital Creator • Fashion & Lifestyle Influencer",
    topic: "Lifestyle Storytelling, Fashion & Audience Engagement",
    date: "Weekend Edition #04",
    about: [
      "With a growing presence in the digital space, Bhavani Reddy has built an engaged audience through content spanning films, fashion, food, and lifestyle. Based in Hyderabad, she has developed a distinctive creator identity that blends entertainment with relatable lifestyle storytelling.",
      "She brings together fashion, food, travel, and entertainment to create content that connects naturally with her audience. Her journey highlights how a versatile creative identity and an authentic connection with viewers can build a strong presence across today's digital entertainment landscape.",
    ],
    keyAdvice: [
      "Authenticity and relatable lifestyle storytelling build deep audience loyalty.",
      "Consistency in aesthetics and tone elevates personal branding in the digital creator space.",
      "Curate content that naturally integrates lifestyle, fashion, and cultural storytelling.",
    ],
    quote: "When your lifestyle content reflects genuine moments, connection happens effortlessly.",
    tags: ["Fashion", "Lifestyle", "ContentCreation", "DigitalCreator", "Influencer", "Storytelling"],
  },
  {
    guestName: "Mehaboob Dil Se",
    role: "Actor • Dancer • YouTuber • Digital Creator",
    topic: "Dance, High-Energy Content & Mainstream Entertainment",
    date: "Weekend Edition #05",
    about: [
      "With a strong presence in Telugu digital entertainment, Mehaboob Shaik, popularly known as Mehaboob Dil Se, built his audience through dance, music, and entertainment content on YouTube and social media. His popularity grew further through his participation in Bigg Boss Telugu 4, where he became one of the show's recognizable contestants.",
      "He has also explored acting through Telugu films and web projects, including Vijetha, S5, and the web series Guntur Mirchi. His journey highlights how creativity across dance, digital content, and performance can build a strong connection with a young audience and open doors into mainstream entertainment.",
    ],
    keyAdvice: [
      "Dynamic physical performance and dance bring unstoppable energy to digital content.",
      "Engage consistently with your audience to build a loyal, long-term community.",
      "Use digital storytelling as a launching pad for television and feature film opportunities.",
    ],
    quote: "When passion meets discipline on the dance floor, the world watches with you.",
    tags: ["MehaboobDilSe", "Dancer", "Actor", "BiggBossTelugu", "YouTubeCreator", "DigitalEntertainment"],
  },
  {
    guestName: "Jagadeesh Prathap Bandari",
    role: "Actor • Telugu Cinema",
    topic: "Character Depth, Authentic Dialect & Mainstream Breakthroughs",
    date: "Weekend Edition #06",
    about: [
      "With a journey from working as a sales executive in Warangal to becoming a recognized Telugu film actor, Jagadeesh Prathap Bandari built his career through short films, web series, and supporting roles. His breakthrough came with his portrayal of Kesava in Pushpa: The Rise, which brought him widespread recognition.",
      "He has since appeared in films including Mallesham, Palasa 1978, Sathi Gani Rendu Ekaralu, Ambajipeta Marriage Band, and Pushpa 2: The Rule. His performance as Kesava earned him the SIIMA Award for Best Supporting Actor – Telugu, highlighting his ability to bring memorable depth to supporting characters.",
    ],
    keyAdvice: [
      "Authentic grounding and local dialect mastery make supporting characters unforgettable.",
      "Every small role in short films and indie cinema prepares you for career-defining feature roles.",
      "Bring genuine vulnerability and loyalty to on-screen relationships.",
    ],
    quote: "When you believe in the truth of your character, the audience remembers you for a lifetime.",
    tags: ["Pushpa", "Kesava", "SIIMAAward", "TeluguCinema", "CharacterActor", "Pushpa2"],
  },
  {
    guestName: "Bristle Tech",
    role: "AI-Driven Digital Marketing Agency • Web Development & Creative Media",
    topic: "AI-Driven Marketing, 2D/3D Animation & Scalable Web Solutions",
    date: "Weekend Edition #07",
    about: [
      "Bristle Tech is a Hyderabad-based digital marketing and technology company focused on combining AI, creative media, digital marketing, animation, and web development to help businesses strengthen their digital presence and achieve measurable growth. Its services include SEO, PPC, social media marketing, branding, 2D/3D animation, and website and application development.",
      "The company focuses on using AI-driven strategies and creative technology to build faster, more effective digital solutions across industries including education, healthcare, real estate, e-commerce, and enterprise. Its approach highlights how the combination of technology, creativity, and data-driven marketing can help brands grow in an increasingly digital landscape.",
    ],
    keyAdvice: [
      "Combining AI-driven automation with high-end creative design delivers exponential growth.",
      "Integrate 2D/3D animation into web interfaces to create memorable, high-converting digital journeys.",
      "Data-driven marketing and strong technical infrastructure are the twin pillars of scalable digital brands.",
    ],
    quote: "When intelligence meets imagination, digital experiences become transformative engines of growth.",
    tags: ["BristleTech", "DigitalMarketing", "AIStrategy", "WebDevelopment", "3DAnimation", "EnterpriseSolutions"],
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
    guestName: "Kirak Seetha",
    role: "Actress • Digital Creator • Bigg Boss Telugu Contestant",
    topic: "Digital Authenticity, Screen Acting & Mainstream Stardom",
    date: "Weekend Edition #09",
    about: [
      "Kirak Seetha began her journey in Telugu digital entertainment through YouTube content, gaining recognition for her engaging performances and relatable screen presence. Her transition into mainstream cinema brought her roles in films including Sarkaar, Baby, and Drinker Sai, helping establish her as a rising talent in Telugu entertainment.",
      "She gained wider recognition after participating in Bigg Boss Telugu Season 8, where her personality and performances connected with audiences. Her journey from digital content creation to films and television reflects how versatility, authenticity, and a strong connection with viewers can create opportunities across the Telugu entertainment industry.",
    ],
    keyAdvice: [
      "Authenticity and expressive energy are your greatest assets when connecting with audiences.",
      "Consistently push your craft across YouTube, web series, and indie cinema to open mainstream doors.",
      "Embrace challenges on high-visibility platforms to build a resilient and versatile screen presence.",
    ],
    quote: "When you perform with pure honesty, the audience embraces every part of your journey.",
    tags: ["KirakSeetha", "BiggBossTelugu8", "BabyMovie", "TeluguActress", "DigitalCreator", "MainstreamCinema"],
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
        const list = fs.readdirSync(/*turbopackIgnore: true*/ dir);
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
