import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionProvider } from "@/components/MotionProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ── Metadata API ──────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://abiduddinahmed.com"),
  title: {
    default: "Abid Uddin Ahmed | Director",
    template: "%s | Abid Uddin Ahmed",
  },
  description:
    "Professional portfolio of Abid Uddin Ahmed — Director of X-group Chain Restaurant & Hospitality Management and BCFCC. Visionary leadership in hospitality and strategic operations.",
  keywords: [
    "Abid Uddin Ahmed",
    "Director",
    "X-group Restaurant",
    "BCFCC",
    "Hospitality Management",
    "Bangladesh",
  ],
  authors: [{ name: "Abid Uddin Ahmed" }],
  creator: "Abid Uddin Ahmed",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://abiduddinahmed.com",
    siteName: "Abid Uddin Ahmed",
    title: "Abid Uddin Ahmed | Director",
    description:
      "Director of X-group Chain Restaurant & Hospitality Management. Visionary leadership, strategic operations, and hospitality excellence.",
    images: [
      {
        url: "https://res.cloudinary.com/dhukcjdmi/image/upload/v1771654213/612164120_4215377298700050_6164740412147692303_n_wdfitm.jpg",
        width: 1200,
        height: 630,
        alt: "Abid Uddin Ahmed - Director",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abid Uddin Ahmed | Director",
    description:
      "Director of X-group Chain Restaurant & Hospitality Management.",
    images: [
      "https://res.cloudinary.com/dhukcjdmi/image/upload/v1771654213/612164120_4215377298700050_6164740412147692303_n_wdfitm.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://abiduddinahmed.com" },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

// ── Viewport — Next.js 16: must be a separate export ─────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

// Inline script — runs synchronously before React hydrates.
// Applies .dark class immediately so there is ZERO flash of wrong theme (FOUC).
// Strategy: check localStorage → system preference → default dark.
const themeScript = `
(function(){
  try{
    var s=localStorage.getItem('theme');
    var d=window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(s==='dark'||(s===null&&d)||s===null){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  }catch(e){}
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${fraunces.variable}`}
    >
      <head>
        {/*
          FOUC prevention — must be the FIRST script in <head>.
          Runs synchronously before any paint so the correct theme class
          is applied before the browser renders a single pixel.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/*
          Preconnect to Cloudinary — hints the browser to open the TCP
          connection early, reducing TTFB for the LCP hero image.
        */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body>
        {/* ThemeProvider syncs React state; MotionProvider sets up LazyMotion once */}
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
