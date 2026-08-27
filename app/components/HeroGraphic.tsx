export default function HeroGraphic({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const gradId = `outerAFade-${variant}`;
  const glowId = `innerGlow-${variant}`;
  const outerGlowId = `outerGlow-${variant}`;

  const wrapperClass =
    variant === "desktop"
      ? "animate-graphic pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] min-w-[380px] items-center justify-start overflow-visible lg:flex lg:w-[58%]"
      : "animate-graphic pointer-events-none flex h-[300px] w-full items-start justify-center overflow-hidden sm:h-[380px] lg:hidden";

  return (
    <div className={wrapperClass}>
      <svg
        viewBox="0 0 900 1000"
        className="h-full w-full max-w-[1100px] translate-y-[-4%]"
        preserveAspectRatio="xMidYMin meet"
        fill="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb800" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#ffb800" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffb800" stopOpacity="0" />
          </linearGradient>
          <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={outerGlowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* outer A — large, thin, subtle, now with a soft exterior glow */}
        <path
          d="M450 90 L150 1000 M450 90 L750 1000"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          filter={`url(#${outerGlowId})`}
        />

        {/* inner A — bright, glowing */}
        <g className="glow-pulse" filter={`url(#${glowId})`}>
          <path
            d="M450 300 L294 1000 M450 300 L606 1000"
            stroke="#ffc928"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
