import type { ReactNode } from "react";
import { BriefcaseIcon, GlobeIcon, TrophyIcon, UsersIcon } from "./icons";

function StatsItem({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="group flex flex-1 items-center gap-4 px-6 py-6 transition-colors sm:px-8">
      <span className="text-gray-light transition-colors group-hover:text-gold">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[clamp(20px,2vw,26px)] font-bold text-gold">
          {value}
        </span>
        <span className="text-[13px] text-gray-light sm:text-sm">{label}</span>
      </span>
    </div>
  );
}

const stats = [
  {
    icon: <UsersIcon className="h-8 w-8" />,
    value: "350+",
    label: "Students Trained",
  },
  {
    icon: <BriefcaseIcon className="h-8 w-8" />,
    value: "1000+",
    label: "Projects Completed",
  },
  {
    icon: <TrophyIcon className="h-8 w-8" />,
    value: "50+",
    label: "Companies Hired",
  },
  {
    icon: <GlobeIcon className="h-8 w-8" />,
    value: "Industry",
    label: "Standard Curriculum",
  },
];

export default function StatsCard() {
  return (
    <div className="animate-stats grid grid-cols-1 divide-y divide-border rounded-lg border border-border bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/20 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}
