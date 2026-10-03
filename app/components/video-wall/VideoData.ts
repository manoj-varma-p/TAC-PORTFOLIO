export interface VideoWallItem {
  id: string;
  youtubeId: string;
  title: string;
  /** Relative height within its row, as a fraction of the row's full height. */
  heightRatio: number;
  /** Vertical alignment within the row track, for the staggered collage look. */
  align: "start" | "center" | "end";
  aspect: "16/9" | "4/3";
}

const RAW_IDS: { id: string; title: string }[] = [
  { id: "kyE4g7qaFxI", title: "Reel 01" },
  { id: "BGwPq192CZ0", title: "Reel 02" },
  { id: "KWAHRYTZ00I", title: "Reel 03" },
  { id: "aXGYXdHMPBk", title: "Reel 04" },
  { id: "UVYyHnpn8ow", title: "Reel 05" },
  { id: "O-tQzvPHSPI", title: "Reel 06" },
  { id: "9eIznJs7wmM", title: "Reel 07" },
  { id: "6yKeoMP1cHI", title: "Reel 08" },
];

const HEIGHT_RATIOS: { heightRatio: number; align: VideoWallItem["align"]; aspect: VideoWallItem["aspect"] }[] = [
  { heightRatio: 1, align: "center", aspect: "16/9" },
  { heightRatio: 0.85, align: "end", aspect: "16/9" },
  { heightRatio: 0.95, align: "start", aspect: "16/9" },
  { heightRatio: 0.78, align: "center", aspect: "16/9" },
  { heightRatio: 0.98, align: "end", aspect: "16/9" },
];

export const VIDEO_WALL_ITEMS: VideoWallItem[] = RAW_IDS.map((entry, i) => ({
  id: `wall-${i}`,
  youtubeId: entry.id,
  title: entry.title,
  ...HEIGHT_RATIOS[i % HEIGHT_RATIOS.length],
}));

export function youtubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

export function youtubeThumbnailFallback(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function chunkIntoRows<T>(items: T[], rowCount: number): T[][] {
  const rows: T[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((item, i) => rows[i % rowCount].push(item));
  return rows;
}
