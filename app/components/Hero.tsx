import CTAButton from "./CTAButton";
import SocialBar from "./SocialBar";
import StatsCard from "./StatsCard";

export default function Hero() {
  return (
    <section className="relative overflow-x-clip lg:min-h-[calc(100dvh-80px)]">
      {/* ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-[-8%] h-[800px] w-[800px] rounded-full opacity-70 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.2) 0%, rgba(255,184,0,0.06) 45%, transparent 70%)",
        }}
      />

      {/* Desktop Hero Graphic & Refined Backlight */}
      <div className="animate-graphic pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] items-center justify-end pr-4 lg:flex lg:w-[52%] xl:w-[54%] xl:pr-10 -translate-y-28 xl:-translate-y-36 z-0">
        <div
          aria-hidden
          className="absolute h-[560px] w-[560px] rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,184,0,0.35) 0%, rgba(255,184,0,0.08) 50%, transparent 70%)",
          }}
        />
        <img
          src="/hero-graphic.png"
          alt="The Art Code Graphic"
          className="relative h-auto w-full max-w-[600px] xl:max-w-[640px] object-contain opacity-100 drop-shadow-[0_0_24px_rgba(255,184,0,0.3)]"
        />
      </div>

      <div className="relative mx-auto flex min-h-full max-w-[1400px] flex-col px-6 pb-10 pt-8 lg:justify-between lg:px-[60px] lg:pb-16 lg:pt-10">
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
            <CTAButton label="EXPLORE WORK" href="/photoshop" />
          </div>
        </div>

        {/* Mobile Hero Graphic */}
        <div className="animate-graphic pointer-events-none mt-6 flex w-full justify-center lg:hidden">
          <img
            src="/hero-graphic.png"
            alt="The Art Code Graphic"
            className="h-auto w-[88%] max-w-[360px] object-contain opacity-100 drop-shadow-[0_0_20px_rgba(255,184,0,0.25)]"
          />
        </div>

        <div>
          <div className="relative z-10 mt-20 lg:mt-24 xl:mt-28">
            <StatsCard />
            <SocialBar />
          </div>
        </div>
      </div>
    </section>
  );
}
