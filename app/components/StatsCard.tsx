import type { ReactNode } from "react";
import { BriefcaseIcon, GlobeIcon, TrophyIcon, UsersIcon } from "./icons";

const stats = [
  {
    icon: <UsersIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
    value: "350+",
    label: "Students Trained",
  },
  {
    icon: <BriefcaseIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
    value: "1000+",
    label: "Projects Completed",
  },
  {
    icon: <TrophyIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
    value: "50+",
    label: "Companies Hired",
  },
  {
    icon: <GlobeIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
    value: "Industry",
    label: "Standard Curriculum",
  },
];

export default function StatsCard() {
  return (
    <div className="animate-stats grid grid-cols-2 rounded-xl border border-border bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/20 overflow-hidden lg:grid-cols-4">
      {stats.map((stat, idx) => {
        const borderClasses = [
          "border-r border-b lg:border-b-0 border-border", // Top-Left
          "border-b lg:border-b-0 lg:border-r border-border", // Top-Right
          "border-r border-border", // Bottom-Left
          "", // Bottom-Right
        ][idx];

        return (
          <div
            key={stat.label}
            className={`group flex flex-col justify-center gap-2 p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-6 transition-colors hover:bg-white/[0.02] ${borderClasses}`}
          >
            <span className="text-gray-light transition-colors group-hover:text-gold shrink-0">
              {stat.icon}
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[clamp(18px,2.2vw,26px)] font-bold text-gold leading-tight">
                {stat.value}
              </span>
              <span className="text-[11.5px] text-gray-light sm:text-[13px] leading-snug">
                {stat.label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
