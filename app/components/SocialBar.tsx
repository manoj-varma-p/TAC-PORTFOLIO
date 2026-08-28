import type { ReactNode } from "react";
import { DribbbleIcon, InstagramIcon, LinkedInIcon } from "./icons";

type ToolItem = {
  name: string;
  color: string;
  borderHover: string;
  glowHover: string;
  icon: ReactNode;
};

const toolsData: ToolItem[] = [
  {
    name: "ChatGPT",
    color: "#10a37f",
    borderHover: "hover:border-[#10a37f]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(16,163,127,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <path
          d="M20.5 10.2a5.4 5.4 0 0 0-.4-4.2 5.5 5.5 0 0 0-4.8-2.7 5.6 5.6 0 0 0-1.8.3A5.4 5.4 0 0 0 9.2 2a5.5 5.5 0 0 0-5.1 3.7 5.4 5.4 0 0 0-2.3 3.6 5.5 5.5 0 0 0 1.2 5.4 5.4 5.4 0 0 0 .4 4.2 5.5 5.5 0 0 0 4.8 2.7c.6 0 1.2-.1 1.8-.3a5.4 5.4 0 0 0 4.3 1.6 5.5 5.5 0 0 0 5.1-3.7 5.4 5.4 0 0 0 2.3-3.6 5.5 5.5 0 0 0-1.2-5.4z"
          stroke="#10a37f"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" fill="#10a37f" />
      </svg>
    ),
  },
  {
    name: "Claude",
    color: "#d97757",
    borderHover: "hover:border-[#d97757]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(217,119,87,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
        <path
          d="M12 2l2.3 6.9L21.2 12l-6.9 2.3L12 21.2l-2.3-6.9L2.8 12l6.9-2.3L12 2z"
          fill="#d97757"
        />
      </svg>
    ),
  },
  {
    name: "Gemini AI",
    color: "#4e82ee",
    borderHover: "hover:border-[#7b61ff]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(123,97,255,0.45)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
        <defs>
          <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e82ee" />
            <stop offset="50%" stopColor="#7b61ff" />
            <stop offset="100%" stopColor="#ba68c8" />
          </linearGradient>
        </defs>
        <path
          d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
          fill="url(#gemini-grad)"
        />
      </svg>
    ),
  },
  {
    name: "Adobe",
    color: "#eb1000",
    borderHover: "hover:border-[#eb1000]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(235,16,0,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="#eb1000">
        <path d="M14.5 3H22v18L14.5 3zm-5 0H2v18L9.5 3zm2.5 7.3l3.6 8.7h-2.5l-1.3-3.2H9.2l2.8-5.5z" />
      </svg>
    ),
  },
  {
    name: "Runway",
    color: "#22d3ee",
    borderHover: "hover:border-[#22d3ee]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="#09090b" stroke="#22d3ee" strokeWidth="1.5" />
        <path d="M8 8h4.5a3 3 0 0 1 0 6H8V8zm0 6l5 5" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Kling AI",
    color: "#ff007f",
    borderHover: "hover:border-[#ff007f]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(255,0,127,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
        <defs>
          <linearGradient id="kling-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#ff007f" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" stroke="url(#kling-grad)" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="4.5" fill="url(#kling-grad)" />
      </svg>
    ),
  },
  {
    name: "Seedance",
    color: "#10b981",
    borderHover: "hover:border-[#10b981]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke="#10b981" strokeWidth="1.5" />
        <path d="M8 12c1-3 4-4 6-2s1 5-2 6-4 0-4-4z" fill="#10b981" />
      </svg>
    ),
  },
  {
    name: "Xfield",
    color: "#38bdf8",
    borderHover: "hover:border-[#38bdf8]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <path d="M6 6l12 12M18 6L6 18" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#38bdf8" />
      </svg>
    ),
  },
  {
    name: "Meigen",
    color: "#f43f5e",
    borderHover: "hover:border-[#f43f5e]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <path d="M4 18V6l8 6 8-6v12" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Magnite",
    color: "#f97316",
    borderHover: "hover:border-[#f97316]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <circle cx="12" cy="12" r="8" stroke="#f97316" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Getty Images",
    color: "#ffffff",
    borderHover: "hover:border-white/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M8 12a4 4 0 1 1 4 4h-2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Media.io",
    color: "#6366f1",
    borderHover: "hover:border-[#6366f1]/70",
    glowHover: "hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <polygon points="6,4 20,12 6,20" fill="#6366f1" />
      </svg>
    ),
  },
];

export default function SocialBar() {
  // Duplicate list to achieve continuous infinite marquee loop
  const tickerItems = [...toolsData, ...toolsData];

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
            {tickerItems.map((tool, idx) => (
              <div key={idx} className="flex shrink-0 items-center gap-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-bold tracking-wide text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 ${tool.borderHover} ${tool.glowHover} cursor-default`}
                >
                  {tool.icon}
                  <span className="text-[13px]">{tool.name}</span>
                </span>
                <span className="text-[9px] text-white/20">✦</span>
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
