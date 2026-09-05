import type { Metadata } from "next";
import { Manrope, Dancing_Script } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TAC | The Art Code",
    template: "%s | TAC",
  },
  description:
    "TAC is a premier creative ecosystem where design thinkers, motion artists, and editors turn ideas into impactful digital experiences.",
  keywords: [
    "The Art Code",
    "TAC",
    "Design Academy",
    "Video Editing",
    "Motion Graphics",
    "Photoshop",
    "Premiere Pro",
    "After Effects",
    "Illustrator",
    "DaVinci Resolve",
    "Creative Portfolio",
  ],
  authors: [{ name: "The Art Code" }],
  creator: "The Art Code",
  metadataBase: new URL("https://theartcode.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theartcode.in",
    siteName: "TAC - The Art Code",
    title: "TAC | The Art Code — Creative Learning Ecosystem",
    description:
      "TAC is a premier creative ecosystem where design thinkers, motion artists, and editors turn ideas into impactful digital experiences.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "TAC - The Art Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAC | The Art Code",
    description:
      "TAC is a premier creative ecosystem where design thinkers, motion artists, and editors turn ideas into impactful digital experiences.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

import ContactModal from "./components/ContactModal";
import Preloader from "./components/Preloader";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader />
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
