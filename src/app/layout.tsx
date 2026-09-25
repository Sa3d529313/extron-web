import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Sans_Arabic, Archivo_Black, Readex_Pro } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

// Wider display font for the E [X] TRON header wordmark
const brandFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

// Arabic body — clean, engineered, matches "clean energy" tone
const ar = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar",
  display: "swap",
});

// Readable Arabic body text paired with Montserrat
const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-readex",
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
      className={`${montserrat.variable} ${ar.variable} ${brandFont.variable} ${readexPro.variable}`}
    >
      <body><ScrollToTop /><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
