import type { ShowcaseImage } from "./ShowcaseCard";

const PLACEHOLDER_IDS = [1005, 1011, 1012, 1027, 1025, 1062, 1074, 1084];

const PLACEHOLDER_NAMES = [
  "Creative Collaboration",
  "Team Performance",
  "Learning Together",
  "Better Workflows",
  "Design Thinking",
  "Studio Sessions",
  "Portfolio Reviews",
  "Late Night Builds",
];

export function getPlaceholderStudents(): ShowcaseImage[] {
  return PLACEHOLDER_IDS.map((id, i) => ({
    id: `placeholder-${id}`,
    src: `https://picsum.photos/id/${id}/600/800`,
    title: PLACEHOLDER_NAMES[i % PLACEHOLDER_NAMES.length],
  }));
}
