"use client";

export interface CompanyItem {
  id: string;
  name: string;
  industry?: string;
  logo: string;
}

const DEFAULT_COMPANIES: CompanyItem[] = [
  { id: "cgs", name: "CGS", industry: "Global Tech Solutions", logo: "/gallery/companies/cgs.png" },
  { id: "citta-ai", name: "Citta AI", industry: "AI & Neural Systems", logo: "/gallery/companies/citta-ai.png" },
  { id: "brochill", name: "Brochill", industry: "Media & Social App", logo: "/gallery/companies/brochill.png" },
  { id: "luk-studio", name: "LUK Studio", industry: "Cinematography & Studio", logo: "/gallery/companies/luk-studio.png" },
  { id: "rare-cafe", name: "Raré Café", industry: "Boutique Hospitality", logo: "/gallery/companies/rare-cafe.png" },
  { id: "ozrit", name: "Ozrit", industry: "Creative Digital Studio", logo: "/gallery/companies/ozrit.png" },
  { id: "bristle-tech", name: "Bristle Tech", industry: "Hyperreality & VFX", logo: "/gallery/companies/bristle-tech.png" },
  { id: "theory-consulting", name: "Theory Consulting", industry: "Brand Consulting", logo: "/gallery/companies/theory-consulting.png" },
  { id: "the-big-day", name: "The Big Day By Chai", industry: "Cinematic Productions", logo: "/gallery/companies/the-big-day.png" },
  { id: "reginald-men", name: "Reginald Men", industry: "Fashion & Lifestyle", logo: "/gallery/companies/reginald-men.png" },
  { id: "dakshin-stories", name: "Dakshin Stories", industry: "Media & Content", logo: "/gallery/companies/dakshin-stories.png" },
  { id: "digital-yuvi", name: "Digital Yuvi", industry: "Creative Marketing", logo: "/gallery/companies/digital-yuvi.png" },
  { id: "reds-antz", name: "Reds Antz Studios", industry: "Animation & Motion", logo: "/gallery/companies/reds-antz.png" },
  { id: "al-oka", name: "Al-Oka Media", industry: "Media Solutions", logo: "/gallery/companies/al-oka.png" },
  { id: "nikhila-constructions", name: "Nikhila Constructions", industry: "Infrastructure & Dev", logo: "/gallery/companies/nikhila-constructions.png" },
  { id: "property-edge", name: "Property Edge", industry: "Real Estate & Infra", logo: "/gallery/companies/property-edge.png" },
  { id: "fialg-rentals", name: "FialG Rentals", industry: "Production Rentals", logo: "/gallery/companies/fialg-rentals.png" },
  { id: "nurturing-growth", name: "Walls & Trends", industry: "Interior & Architecture", logo: "/gallery/companies/nurturing-growth.png" },
  { id: "conduira", name: "Conduira", industry: "EdTech & Career Prep", logo: "/gallery/companies/conduira.png" },
  { id: "b-hub-media", name: "B-Hub Media", industry: "Entertainment & Media", logo: "/gallery/companies/b-hub-media.png" },
  { id: "cloud-realty", name: "Cloud Realty", industry: "Real Estate & Housing", logo: "/gallery/companies/cloud-realty.png" },
  { id: "hyderabad-talkies", name: "Hyderabad Talkies", industry: "Events & Cinema", logo: "/gallery/companies/hyderabad-talkies.png" },
  { id: "samvya-photography", name: "Samvya Photography", industry: "Luxury Photography", logo: "/gallery/companies/samvya-photography.png" },
  { id: "honasa", name: "Honasa Consumer", industry: "FMCG & Beauty Giant", logo: "/gallery/companies/honasa.png" },
  { id: "medigita", name: "Medigita Technologies", industry: "Healthcare & Digital Tech", logo: "/gallery/companies/medigita.png" },
  { id: "rk-media", name: "RK Media", industry: "Digital & Video Production", logo: "/gallery/companies/rk-media.png" },
  { id: "yaas", name: "YAAS", industry: "Creative & Lifestyle", logo: "/gallery/companies/yaas.png" },
  { id: "keus", name: "Keus Smart Home", industry: "Smart Living & IoT", logo: "/gallery/companies/keus.png" },
  { id: "sri-sreenivasa-infra", name: "Sri Sreenivasa Infra", industry: "Infrastructure & Realty", logo: "/gallery/companies/sri-sreenivasa-infra.png" },
  { id: "obladi-creatives", name: "Obladi Creatives", industry: "Advertising & Creatives", logo: "/gallery/companies/obladi-creatives.png" },
  { id: "vayura-solutions", name: "Vayura Solutions", industry: "Global Tech Services", logo: "/gallery/companies/vayura-solutions.png" },
  { id: "student-tribe", name: "Student Tribe", industry: "Youth Community & Media", logo: "/gallery/companies/student-tribe.png" },
  { id: "wilson", name: "Wilson", industry: "Global Brand & Apparel", logo: "/gallery/companies/wilson.png" },
  { id: "cloud-sync", name: "CloudSync", industry: "Cloud & Data Systems", logo: "/gallery/companies/cloud-sync.png" },
  { id: "k-creatives", name: "K-Creatives", industry: "Design & Brand Studio", logo: "/gallery/companies/k-creatives.png" },
  { id: "onegrasp", name: "OneGrasp", industry: "AI & Software Tech", logo: "/gallery/companies/onegrasp.png" },
  { id: "ekam", name: "Ekam", industry: "Community & Media Network", logo: "/gallery/companies/ekam.png" },
  { id: "starbuzz-ai", name: "Starbuzz.ai", industry: "Influencer Marketing AI", logo: "/gallery/companies/starbuzz-ai.png" },
  { id: "zyro-lifts", name: "Zyro Lifts", industry: "Mobility & Infrastructure", logo: "/gallery/companies/zyro-lifts.png" },
];

export default function HiresBySection({
  companies = DEFAULT_COMPANIES,
}: {
  companies?: CompanyItem[];
}) {
  const items = companies.length > 0 ? companies : DEFAULT_COMPANIES;

  // Split all companies across 4 balanced scrolling tracks
  const quarter = Math.ceil(items.length / 4);
  const lane1 = items.slice(0, quarter);
  const lane2 = items.slice(quarter, quarter * 2);
  const lane3 = items.slice(quarter * 2, quarter * 3);
  const lane4 = items.slice(quarter * 3);

  // Replicate each lane for seamless continuous infinite marquee
  const track1 = [...lane1, ...lane1, ...lane1, ...lane1];
  const track2 = [...lane2, ...lane2, ...lane2, ...lane2];
  const track3 = [...lane3, ...lane3, ...lane3, ...lane3];
  const track4 = [...lane4, ...lane4, ...lane4, ...lane4];

  return (
    <section
      id="hires-by"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-transparent via-[#0d0d14]/70 to-transparent"
    >
      {/* Ambient background gold glow backlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/3 -translate-y-1/2 h-[450px] w-[500px] rounded-full bg-gold/[0.05] blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[500px] rounded-full bg-gold/[0.04] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-[60px]">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold shadow-[0_0_20px_rgba(255,184,0,0.15)]">
          <span>★</span>
          <span>RECRUITMENT ECOSYSTEM</span>
        </div>

        {/* Section Heading */}
        <h2 className="mx-auto mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          Hires <span className="text-gold">By</span>
        </h2>

        {/* Replaced Subtitle with 4 Prominent Stat Cards featuring Large Icons */}
        <div className="mx-auto mt-7 sm:mt-9 max-w-4xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {/* Card 1: 40+ Hiring Studios */}
            <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,184,0,0.25)] hover:-translate-y-1">
              <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="3" width="20" height="18" rx="3" />
                  <path d="M2 9h20M7 3v6M12 3v6M17 3v6" strokeLinecap="round" />
                  <circle cx="12" cy="15" r="2.5" fill="currentColor" fillOpacity="0.25" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-gold">40+</p>
              <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-light">
                Hiring Studios
              </p>
            </div>

            {/* Card 2: 100% Placement Support */}
            <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,184,0,0.25)] hover:-translate-y-1">
              <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-[#10b981] transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">100%</p>
              <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-light">
                Placement Support
              </p>
            </div>

            {/* Card 3: ₹7.2L Top Package */}
            <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,184,0,0.25)] hover:-translate-y-1">
              <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2M4 5h16v6a8 8 0 0 1-16 0V5zM12 17v4M8 21h8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-gold">₹7.2L</p>
              <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-light">
                Top Package
              </p>
            </div>

            {/* Card 4: 60 Days Avg Placement Time */}
            <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,184,0,0.25)] hover:-translate-y-1">
              <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-[#38bdf8] transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2v2M20 4l-1.5 1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">60 Days</p>
              <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-light">
                Avg Placement Time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Lane Kinetic Scroller */}
      <div className="relative mt-12 sm:mt-16 flex flex-col gap-3.5 sm:gap-4">
        {/* Soft edge gradient fades for seamless edge entrance/exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-36 lg:w-56 bg-gradient-to-r from-bg via-bg/95 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-36 lg:w-56 bg-gradient-to-l from-bg via-bg/95 to-transparent" />

        {/* Lane 1: Scrolling Left */}
        <div className="overflow-hidden py-1">
          <div
            className="animate-company-lane-1 flex items-center gap-4 will-change-transform"
            style={{ animationPlayState: "running" }}
          >
            {track1.map((item, idx) => (
              <CompanyCard key={`lane1-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Lane 2: Scrolling Right */}
        <div className="overflow-hidden py-1">
          <div
            className="animate-company-lane-2 flex items-center gap-4 will-change-transform"
            style={{ animationPlayState: "running" }}
          >
            {track2.map((item, idx) => (
              <CompanyCard key={`lane2-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Lane 3: Scrolling Left */}
        <div className="overflow-hidden py-1">
          <div
            className="animate-company-lane-3 flex items-center gap-4 will-change-transform"
            style={{ animationPlayState: "running" }}
          >
            {track3.map((item, idx) => (
              <CompanyCard key={`lane3-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Lane 4: Scrolling Right */}
        <div className="overflow-hidden py-1">
          <div
            className="animate-company-lane-4 flex items-center gap-4 will-change-transform"
            style={{ animationPlayState: "running" }}
          >
            {track4.map((item, idx) => (
              <CompanyCard key={`lane4-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Uniform Standardized Company Card:
 * - Identical fixed dimensions for EVERY card
 * - Identical uniform logo container box
 * - Soft hover lift and gold aura glow
 */
function CompanyCard({ item }: { item: CompanyItem }) {
  return (
    <div
      className="group relative flex h-[92px] sm:h-[102px] w-[230px] sm:w-[260px] shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/95 px-6 py-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 hover:bg-white hover:border-gold hover:shadow-[0_0_35px_rgba(255,184,0,0.4)] cursor-pointer overflow-hidden"
      title={`${item.name} (${item.industry || "Hiring Partner"})`}
    >
      {/* Subtle Specular Shine sweep effect on hover */}
      <div className="pointer-events-none absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-out" />

      {/* Standardized Uniform Logo Container */}
      <div className="relative flex h-[58px] sm:h-[66px] w-[180px] sm:w-[200px] items-center justify-center">
        <img
          src={item.logo}
          alt={item.name}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Subtle Bottom Floating Industry Badge on hover */}
      {item.industry && (
        <span className="pointer-events-none absolute bottom-1 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[9px] sm:text-[9.5px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/90 text-gold border border-gold/40 shadow-lg whitespace-nowrap">
          {item.industry}
        </span>
      )}
    </div>
  );
}
