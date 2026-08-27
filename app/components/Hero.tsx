import CTAButton from "./CTAButton";
import HeroGraphic from "./HeroGraphic";
import SocialBar from "./SocialBar";
import StatsCard from "./StatsCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden lg:h-[calc(100dvh-80px)]">
      {/* ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-0 h-[720px] w-[720px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.14) 0%, rgba(255,184,0,0.05) 40%, transparent 70%)",
        }}
      />

      <HeroGraphic variant="desktop" />

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col px-6 pb-8 pt-10 lg:justify-between lg:px-[60px] lg:pb-10 lg:pt-12">
        <div className="max-w-[640px]">
          <p className="animate-eyebrow text-[13px] font-semibold tracking-[0.3em] text-gold">
            WE DESIGN. WE CODE. WE CREATE.
          </p>

          <h1 className="animate-heading mt-5 text-[clamp(38px,5.4vw,72px)] font-extrabold leading-[1.05] tracking-tight">
            <span className="block text-white">Where Creativity</span>
            <span className="block text-white">Meets</span>
            <span className="block text-gold">Excellence.</span>
          </h1>

          <p className="animate-description mt-5 max-w-[500px] text-[16px] leading-relaxed text-gray-light sm:text-[18px]">
            TAC is a creative learning ecosystem where design thinkers turn
            ideas into impactful digital experiences.
          </p>

          <div className="animate-cta mt-7">
            <CTAButton />
          </div>
        </div>

        <div className="mt-6 lg:hidden">
          <HeroGraphic variant="mobile" />
        </div>

        <div>
          {/* script tagline, lower-right */}
          <div className="animate-graphic relative z-10 hidden text-right lg:mb-8 lg:block">
            <p className="font-script text-3xl text-white/90">The Art Code</p>
            <p className="mt-2 text-[11px] font-medium leading-relaxed tracking-[0.2em] text-gray-light">
              DESIGN IS THINKING
              <br />
              MADE VISUAL.
            </p>
          </div>

          <div className="relative z-10 mt-6 lg:mt-[10px]">
            <StatsCard />
            <SocialBar />
          </div>
        </div>
      </div>
    </section>
  );
}
