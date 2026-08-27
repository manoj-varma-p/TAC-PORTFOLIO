import { DribbbleIcon, InstagramIcon, LinkedInIcon } from "./icons";

const brands = ["behance", "dribbble", "AWWWARDS", "awwwards.", "Be"];

export default function SocialBar() {
  return (
    <div className="animate-stats flex flex-col items-start gap-6 border-t border-border/70 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-gold">07+</span>
          <span className="text-[11px] font-medium leading-tight tracking-[0.1em] text-gray-muted">
            YEARS OF
            <br />
            EXPERIENCE
          </span>
        </div>
        <div className="hidden h-8 w-px bg-border sm:block" />
        <div className="hidden flex-wrap items-center gap-6 text-gray-muted md:flex">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-sm font-semibold tracking-wide opacity-80"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[11px] font-medium tracking-[0.15em] text-gray-muted">
          FOLLOW ME
        </span>
        <div className="flex items-center gap-2.5">
          {[InstagramIcon, LinkedInIcon, DribbbleIcon].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-gray-light transition-colors hover:border-gold hover:text-gold"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
