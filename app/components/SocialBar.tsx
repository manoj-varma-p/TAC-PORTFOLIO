import { DribbbleIcon, InstagramIcon, LinkedInIcon } from "./icons";

const brands = [
  "Runway",
  "Seedance",
  "Kling AI",
  "Xfield",
  "Meigen",
  "Magnite",
  "Getty Images",
  "Adobe",
  "Media.io",
  "ChatGPT",
  "Claude",
  "Gemini AI",
];

export default function SocialBar() {
  // Duplicate list to achieve continuous infinite marquee loop
  const tickerItems = [...brands, ...brands];

  return (
    <div className="animate-stats flex flex-col items-start gap-6 border-t border-border/70 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
      <div className="flex min-w-0 flex-1 items-center gap-6">
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-2xl font-extrabold leading-none text-gold">
            10K
          </span>
          <span className="text-[11px] font-medium leading-snug tracking-[0.1em] text-gray-muted">
            WORTH OF
            <br />
            TOOLS
          </span>
        </div>

        <div className="hidden h-8 w-px shrink-0 bg-border sm:block" />

        {/* Seamless scrolling marquee ticker with gradient masks */}
        <div className="hidden min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:block">
          <div className="animate-marquee flex items-center gap-4 py-1">
            {tickerItems.map((brand, idx) => (
              <div
                key={idx}
                className="flex shrink-0 items-center gap-4"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gradient-to-r from-gold/10 via-amber-500/5 to-gold/10 px-3.5 py-1 text-xs font-bold tracking-wide text-white shadow-[0_0_15px_rgba(255,184,0,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-gold/20 hover:text-gold-bright hover:shadow-[0_0_25px_rgba(255,184,0,0.35)] cursor-default">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_#FFB800]" />
                  {brand}
                </span>
                <span className="text-[9px] text-gold/40">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="text-[11px] font-medium tracking-[0.15em] text-gray-muted">
          FOLLOW US
        </span>
        <div className="flex items-center gap-2.5">
          <a
            href="https://www.instagram.com/tac_theartcode?igsi=dTk2NGpvb2ZoZmVx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow TAC on Instagram"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-gray-light transition-all hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(255,184,0,0.4)]"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/tac-the-art-code/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow TAC on LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-gray-light transition-all hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(255,184,0,0.4)]"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
