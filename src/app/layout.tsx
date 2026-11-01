import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Sans_Arabic, Archivo_Black, Readex_Pro, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import Cursor from "@/components/Cursor";
import ScrollBadge from "@/components/ScrollBadge";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

const brandFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

const ar = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar",
  display: "swap",
});

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-readex",
  display: "swap",
});

// Italic accent for Latin words in headlines (Arabic has no italic).
const serif = Instrument_Serif({
  weight: "400",
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Runs before the page paints: keeps every page opening at the top.
const bootScript = `try{if("scrollRestoration" in history)history.scrollRestoration="manual"}catch(e){}`;

const siteDescription =
  "EXTRON — إكسترون فلسطين، علامة مشروبات الطاقة النظيفة. Extron Palestine energy drinks and premium beverages — for distributors, supermarkets, cafés, and restaurants across Palestine.";

export const metadata: Metadata = {
  metadataBase: new URL("https://extron.ps"),
  title: "EXTRON Palestine — Clean Energy Drink · إكسترون فلسطين",
  description: siteDescription,
  keywords: [
    "Extron",
    "Extron Palestine",
    "Extron energy drink",
    "إكسترون",
    "اكسترون",
    "إكسترون فلسطين",
    "مشروب طاقة",
    "مشروبات الطاقة فلسطين",
    "energy drink Palestine",
  ],
  openGraph: {
    type: "website",
    url: "https://extron.ps",
    siteName: "EXTRON",
    title: "EXTRON Palestine — Clean Energy Drink · إكسترون فلسطين",
    description: siteDescription,
    locale: "ar_PS",
    images: ["/brand/hero-slide-1.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EXTRON",
  alternateName: ["Extron Palestine", "إكسترون", "إكسترون فلسطين"],
  url: "https://extron.ps",
  logo: "https://extron.ps/brand/logo-black.jpg",
  description: siteDescription,
  areaServed: "Palestine",
  sameAs: [
    "https://www.instagram.com/extron.ps",
    "https://www.facebook.com/share/1GFFydHPL7/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${montserrat.variable} ${ar.variable} ${brandFont.variable} ${readexPro.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-DNS-Prefetch-Control" content="off" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <ScrollToTop />
        <SmoothScroll>
          {children}
          <ScrollBadge />
        </SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
