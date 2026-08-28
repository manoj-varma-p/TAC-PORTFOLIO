type IconProps = {
  className?: string;
};

export function PhotoshopIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(49,168,255,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(49,168,255,0.5)]">
        <defs>
          <linearGradient id="ps-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#002b47" />
            <stop offset="60%" stopColor="#001424" />
            <stop offset="100%" stopColor="#00080f" />
          </linearGradient>
          <linearGradient id="ps-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#62c4ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#31a8ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#005b99" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="ps-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Base Squircle */}
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#ps-bg)" stroke="url(#ps-border)" strokeWidth="1.5" />
        {/* Specular Gloss Overlay */}
        <path d="M2.5 10 C2.5 5.8 5.8 2.5 10 2.5 L26 2.5 C30.2 2.5 33.5 5.8 33.5 10 L33.5 17 C26 19 10 16 2.5 18 Z" fill="url(#ps-shine)" />
        {/* Icon Typography */}
        <text x="18" y="23" textAnchor="middle" fill="#31a8ff" fontSize="13.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px" filter="drop-shadow(0 0 4px rgba(49,168,255,0.6))">
          Ps
        </text>
      </svg>
    </div>
  );
}

export function PremiereIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(153,153,255,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(153,153,255,0.5)]">
        <defs>
          <linearGradient id="pr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#250059" />
            <stop offset="60%" stopColor="#120030" />
            <stop offset="100%" stopColor="#080017" />
          </linearGradient>
          <linearGradient id="pr-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c2c2ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#9999ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5500b3" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="pr-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#pr-bg)" stroke="url(#pr-border)" strokeWidth="1.5" />
        <path d="M2.5 10 C2.5 5.8 5.8 2.5 10 2.5 L26 2.5 C30.2 2.5 33.5 5.8 33.5 10 L33.5 17 C26 19 10 16 2.5 18 Z" fill="url(#pr-shine)" />
        <text x="18" y="23" textAnchor="middle" fill="#9999ff" fontSize="13.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px" filter="drop-shadow(0 0 4px rgba(153,153,255,0.6))">
          Pr
        </text>
      </svg>
    </div>
  );
}

export function IllustratorIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(255,154,0,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(255,154,0,0.5)]">
        <defs>
          <linearGradient id="ai-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#471c00" />
            <stop offset="60%" stopColor="#240c00" />
            <stop offset="100%" stopColor="#0f0500" />
          </linearGradient>
          <linearGradient id="ai-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffc566" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff9a00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#b34700" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="ai-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#ai-bg)" stroke="url(#ai-border)" strokeWidth="1.5" />
        <path d="M2.5 10 C2.5 5.8 5.8 2.5 10 2.5 L26 2.5 C30.2 2.5 33.5 5.8 33.5 10 L33.5 17 C26 19 10 16 2.5 18 Z" fill="url(#ai-shine)" />
        <text x="18" y="23" textAnchor="middle" fill="#ff9a00" fontSize="13.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px" filter="drop-shadow(0 0 4px rgba(255,154,0,0.6))">
          Ai
        </text>
      </svg>
    </div>
  );
}

export function AfterEffectsIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(200,140,255,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(200,140,255,0.5)]">
        <defs>
          <linearGradient id="ae-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e054d" />
            <stop offset="60%" stopColor="#170129" />
            <stop offset="100%" stopColor="#0a0014" />
          </linearGradient>
          <linearGradient id="ae-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e3b3ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#c574ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7a00cc" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="ae-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#ae-bg)" stroke="url(#ae-border)" strokeWidth="1.5" />
        <path d="M2.5 10 C2.5 5.8 5.8 2.5 10 2.5 L26 2.5 C30.2 2.5 33.5 5.8 33.5 10 L33.5 17 C26 19 10 16 2.5 18 Z" fill="url(#ae-shine)" />
        <text x="18" y="23" textAnchor="middle" fill="#d18fff" fontSize="13.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px" filter="drop-shadow(0 0 4px rgba(209,143,255,0.6))">
          Ae
        </text>
      </svg>
    </div>
  );
}

export function DaVinciIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(255,184,0,0.2)] transition-all duration-300 group-hover:drop-shadow-[0_6px_18px_rgba(255,184,0,0.4)]">
        <defs>
          <linearGradient id="dv-rim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a3a46" />
            <stop offset="50%" stopColor="#1a1a22" />
            <stop offset="100%" stopColor="#0d0d12" />
          </linearGradient>
          <radialGradient id="dv-blue" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#a8e0ff" />
            <stop offset="40%" stopColor="#3ba1ff" />
            <stop offset="100%" stopColor="#005bb5" />
          </radialGradient>
          <radialGradient id="dv-red" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffa3a3" />
            <stop offset="40%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#b30000" />
          </radialGradient>
          <radialGradient id="dv-yellow" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="40%" stopColor="#ffc000" />
            <stop offset="100%" stopColor="#b37d00" />
          </radialGradient>
          <linearGradient id="dv-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Outer Dial */}
        <circle cx="18" cy="18" r="16" fill="url(#dv-rim)" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="13.5" fill="#08080c" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.8" />
        {/* Top Gloss Arc */}
        <path d="M4 18 A14 14 0 0 1 32 18 Z" fill="url(#dv-shine)" opacity="0.25" />
        {/* 3 Color Gems */}
        <circle cx="18" cy="10.8" r="3.6" fill="url(#dv-blue)" filter="drop-shadow(0 0 4px rgba(59,161,255,0.7))" />
        <circle cx="23.8" cy="21.8" r="3.6" fill="url(#dv-red)" filter="drop-shadow(0 0 4px rgba(255,77,77,0.7))" />
        <circle cx="12.2" cy="21.8" r="3.6" fill="url(#dv-yellow)" filter="drop-shadow(0 0 4px rgba(255,192,0,0.7))" />
      </svg>
    </div>
  );
}

export function CameraIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(255,255,255,0.3)]">
        <defs>
          <linearGradient id="cam-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c2d38" />
            <stop offset="60%" stopColor="#15161c" />
            <stop offset="100%" stopColor="#0a0a0e" />
          </linearGradient>
          <radialGradient id="cam-lens" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="35%" stopColor="#0d9488" />
            <stop offset="75%" stopColor="#115e59" />
            <stop offset="100%" stopColor="#042f2e" />
          </radialGradient>
          <linearGradient id="cam-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Camera Base */}
        <rect x="3" y="11" width="30" height="20" rx="6" fill="url(#cam-body)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
        {/* Top Prism Viewfinder */}
        <path d="M12 11 L14.5 6 L21.5 6 L24 11 Z" fill="#1e1f26" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        {/* Red REC tally dot */}
        <circle cx="28.5" cy="15.5" r="1.8" fill="#ff3b30" filter="drop-shadow(0 0 3px #ff3b30)" />
        {/* Camera Lens Outer Ring */}
        <circle cx="18" cy="21" r="7.5" fill="#121318" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* Camera Glass Element */}
        <circle cx="18" cy="21" r="5.2" fill="url(#cam-lens)" filter="drop-shadow(0 0 5px rgba(13,148,136,0.6))" />
        {/* Specular Lens Reflection */}
        <circle cx="16.5" cy="19.5" r="1.6" fill="#ffffff" opacity="0.75" />
      </svg>
    </div>
  );
}

export function SpotlightIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(255,184,0,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(255,184,0,0.5)]">
        <defs>
          <linearGradient id="sp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#382200" />
            <stop offset="60%" stopColor="#1a0f00" />
            <stop offset="100%" stopColor="#0a0500" />
          </linearGradient>
          <linearGradient id="sp-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe680" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffb800" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#996e00" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="sp-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="sp-beam" cx="50%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ffb800" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffb800" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#sp-bg)" stroke="url(#sp-border)" strokeWidth="1.5" />
        <path d="M2.5 10 C2.5 5.8 5.8 2.5 10 2.5 L26 2.5 C30.2 2.5 33.5 5.8 33.5 10 L33.5 17 C26 19 10 16 2.5 18 Z" fill="url(#sp-shine)" />
        {/* Spotlight Beam & Light Source */}
        <path d="M18 7 L28 29 L8 29 Z" fill="url(#sp-beam)" opacity="0.4" />
        <circle cx="18" cy="10" r="2.8" fill="#ffe680" filter="drop-shadow(0 0 5px rgba(255,230,128,0.9))" />
        {/* Sparkle / Star in Beam */}
        <path d="M18 16.5 L19.2 20.2 L23 21.4 L19.2 22.6 L18 26.5 L16.8 22.6 L13 21.4 L16.8 20.2 Z" fill="#ffb800" filter="drop-shadow(0 0 4px rgba(255,184,0,0.8))" />
      </svg>
    </div>
  );
}

export function PencilIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(255,184,0,0.2)] transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(255,184,0,0.4)]">
        <defs>
          <linearGradient id="pen-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe680" />
            <stop offset="40%" stopColor="#ffb800" />
            <stop offset="100%" stopColor="#996e00" />
          </linearGradient>
          <linearGradient id="pen-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d2e38" />
            <stop offset="60%" stopColor="#171821" />
            <stop offset="100%" stopColor="#0c0d12" />
          </linearGradient>
        </defs>
        {/* Pen Barrel */}
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#pen-body)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
        {/* Golden Fountain Nib / Stylus */}
        <g transform="translate(18, 18) rotate(-45) translate(-18, -18)">
          <path d="M16 6 L20 6 L20 20 L18 27 L16 20 Z" fill="url(#pen-gold)" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="18" y1="10" x2="18" y2="23" stroke="#523a00" strokeWidth="1" />
          <circle cx="18" cy="19" r="1" fill="#523a00" />
          <rect x="15" y="4.5" width="6" height="2" rx="0.5" fill="#ffffff" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

export function MegaphoneIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full drop-shadow-[0_4px_12px_rgba(244,63,94,0.2)] transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(244,63,94,0.45)]">
        <defs>
          <linearGradient id="mk-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c1a24" />
            <stop offset="60%" stopColor="#170c12" />
            <stop offset="100%" stopColor="#0c0509" />
          </linearGradient>
          <linearGradient id="mk-horn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="40%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#mk-bg)" stroke="rgba(244,63,94,0.35)" strokeWidth="1.2" />
        {/* Megaphone Cone & Handle */}
        <path d="M10 14 L14 14 L21 9 L21 23 L14 18 L10 18 Z" fill="url(#mk-horn)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.8" />
        <rect x="8" y="13.5" width="2.5" height="5" rx="0.8" fill="#fda4af" />
        <path d="M12.5 18 L14 24 L16.5 24 L15 18 Z" fill="#9f1239" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.6" />
        {/* Glossy Soundwaves */}
        <path d="M24 13 C25.5 14.5 25.5 17.5 24 19" stroke="#ffb800" strokeWidth="1.8" strokeLinecap="round" fill="none" filter="drop-shadow(0 0 3px #ffb800)" />
        <path d="M27 10.5 C29.5 13 29.5 19 27 21.5" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" fill="none" filter="drop-shadow(0 0 3px #f43f5e)" />
      </svg>
    </div>
  );
}

export function AppBadge({
  label,
  bg,
  fg = "#ffffff",
}: {
  label: string;
  bg: string;
  fg?: string;
}) {
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] font-bold shadow-md"
      style={{ background: bg, color: fg }}
    >
      {label}
    </span>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="10.5" cy="10" r="3.2" />
      <path d="M4.5 22c0-3.6 2.7-6 6-6s6 2.4 6 6" strokeLinecap="round" />
      <path d="M17 8.4a3.1 3.1 0 0 1 0 6" strokeLinecap="round" />
      <path d="M17.5 16.3c2.8.4 4.9 2.6 4.9 5.7" strokeLinecap="round" />
    </svg>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="4" y="9.5" width="20" height="12" rx="1.6" />
      <path d="M10 9.5V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2.5" />
      <path d="M4 14.5h20" />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M9 5h10v6a5 5 0 0 1-5 5 5 5 0 0 1-5-5V5Z" strokeLinejoin="round" />
      <path d="M9 6.5H5.5a1 1 0 0 0-1 1V9a3.5 3.5 0 0 0 3.5 3.5" />
      <path d="M19 6.5h3.5a1 1 0 0 1 1 1V9A3.5 3.5 0 0 1 20 12.5" />
      <path d="M14 16v3.5" strokeLinecap="round" />
      <path d="M10 23h8" strokeLinecap="round" />
      <path d="M11.5 19.5h5L17 23h-6l.5-3.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="14" cy="14" r="9.5" />
      <path d="M14 4.5c2.7 2.6 4.2 6 4.2 9.5s-1.5 6.9-4.2 9.5c-2.7-2.6-4.2-6-4.2-9.5s1.5-6.9 4.2-9.5Z" />
      <path d="M5 11h18M5 17h18" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4.5 11.5l7-7" strokeLinecap="round" />
      <path d="M5.5 4.5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="9" r="1.2" />
      <path d="M7.2 11.5h1.6v6H7.2v-6Z" />
      <path d="M11 11.5h1.6v.9c.4-.6 1-1 1.9-1 1.6 0 2.3 1 2.3 2.7v3.4h-1.6v-3c0-.9-.3-1.5-1.1-1.5-.6 0-1 .4-1.2.8-.1.2-.1.4-.1.7v3h-1.6v-6Z" />
    </svg>
  );
}

export function DribbbleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M4.2 9.5c4.4 1.4 9.6 1.4 15 .3" />
      <path d="M6.5 19c2-3.3 4.3-6.7 6.4-9.3 1.8-2.2 3.6-3.9 5.2-5" />
      <path d="M4 13.7c3 .1 7.3.6 9.6 3 1.4 1.4 2.4 3.3 2.9 5" />
    </svg>
  );
}
