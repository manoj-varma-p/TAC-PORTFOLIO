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
  title: "TAC | The Art Code",
  description:
    "TAC is a creative learning ecosystem where design thinkers turn ideas into impactful digital experiences.",
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
