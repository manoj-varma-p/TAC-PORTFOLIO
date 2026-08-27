type IconProps = {
  className?: string;
};

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
      className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] font-bold"
      style={{ background: bg, color: fg }}
    >
      {label}
    </span>
  );
}

export function DaVinciIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none">
      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="8.4" r="2.2" fill="#3ba1ff" />
      <circle cx="18.6" cy="16.8" r="2.2" fill="#ff5c5c" />
      <circle cx="9.4" cy="16.8" r="2.2" fill="#ffcf3f" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 10.5c0-.83.67-1.5 1.5-1.5h2l1.2-2h6.6l1.2 2h2c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-13c-.83 0-1.5-.67-1.5-1.5v-9Z" strokeLinejoin="round" />
      <circle cx="14" cy="15" r="3.2" />
    </svg>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 22l.9-4.2L16.4 8.3a1.5 1.5 0 0 1 2.1 0l1.2 1.2a1.5 1.5 0 0 1 0 2.1L10.2 21.1 6 22Z" strokeLinejoin="round" />
      <path d="M14.8 9.7l3.5 3.5" />
    </svg>
  );
}

export function MegaphoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 12.5v3a1.5 1.5 0 0 0 1.5 1.5H7l2 5h2l-1.4-5h1L20 21V7l-9.4 4H7A1.5 1.5 0 0 0 5.5 12.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M20 10.2a3 3 0 0 1 0 5.6" />
    </svg>
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
