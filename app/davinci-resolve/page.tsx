import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import VideoWall from "../components/video-wall/VideoWall";

export const metadata: Metadata = {
  title: "DaVinci Resolve | TAC",
  description: "A cinematic video wall of DaVinci Resolve work from TAC.",
};

export default function DaVinciResolvePage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        <VideoWall />
      </main>
    </div>
  );
}
