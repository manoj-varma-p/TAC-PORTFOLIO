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
  { id: "y6120QOlsfU", title: "Reel 01" },
  { id: "L_jWHffIx5E", title: "Reel 02" },
  { id: "1w7OgIMMRc4", title: "Reel 03" },
  { id: "SlPhMPnQ58k", title: "Reel 04" },
  { id: "2Vv-BfVoq4g", title: "Reel 05" },
  { id: "fLexgOxsZu0", title: "Reel 06" },
  { id: "CvBfHwUxHIk", title: "Reel 07" },
  { id: "jNQXAC9IVRw", title: "Reel 08" },
  { id: "kJQP7kiw5Fk", title: "Reel 09" },
  { id: "9bZkp7q19f0", title: "Reel 10" },
  { id: "YQHsXMglC9A", title: "Reel 11" },
  { id: "RgKAFK5djSk", title: "Reel 12" },
  { id: "OPf0YbXqDm0", title: "Reel 13" },
  { id: "fJ9rUzIMcZQ", title: "Reel 14" },
  { id: "hT_nvWreIhg", title: "Reel 15" },
  { id: "JGwWNGJdvx8", title: "Reel 16" },
  { id: "CevxZvSJLk8", title: "Reel 17" },
  { id: "60ItHLz5WEA", title: "Reel 18" },
  { id: "pRpeEdMmmQ0", title: "Reel 19" },
  { id: "09R8_2nJtjg", title: "Reel 20" },
  { id: "ru0K8uYEZWw", title: "Reel 21" },
  { id: "papuvlVeZg8", title: "Reel 22" },
  { id: "y6120QOlsfU", title: "Reel 23" },
  { id: "2Vv-BfVoq4g", title: "Reel 24" },
  { id: "SlPhMPnQ58k", title: "Reel 25" },
  { id: "kJQP7kiw5Fk", title: "Reel 26" },
  { id: "fJ9rUzIMcZQ", title: "Reel 27" },
  { id: "60ItHLz5WEA", title: "Reel 28" },
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
