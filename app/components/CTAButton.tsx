import { ArrowUpRight } from "./icons";

export default function CTAButton({
  label = "EXPLORE WORK",
  href = "#work",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group inline-flex w-fit items-center gap-2 rounded-[4px] bg-gold px-7 py-3.5 text-[13px] font-bold tracking-wide text-black transition-all hover:-translate-y-0.5 hover:bg-gold-bright"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
