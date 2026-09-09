import type { Metadata } from "next";
import { Anton, Inter, Rubik, IBM_Plex_Sans_Arabic, Archivo_Black } from "next/font/google";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Wider display font for the E [X] TRON header wordmark
const brandFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

// Arabic body — clean, engineered, matches "clean energy" tone
const ar = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar",
  display: "swap",
});

// Arabic display — geometric, bold, sits next to Anton confidently
const arDisplay = Rubik({
  subsets: ["arabic", "latin"],
  weight: ["700", "800", "900"],
  variable: "--font-ar-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EXTRON — Clean Energy Drink · طاقة نظيفة",
  description:
    "EXTRON — علامة مشروبات الطاقة النظيفة. Extron energy drinks and premium beverages — for distributors, supermarkets, cafés, and restaurants across Palestine.",
  icons: { icon: "/brand/logo-black.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${display.variable} ${body.variable} ${ar.variable} ${arDisplay.variable} ${brandFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
