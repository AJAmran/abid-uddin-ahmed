// app/page.tsx — Server Component (no 'use client')
// Static content rendered server-side; Client Components are small isolated islands.
// next/image with priority and sizes for LCP optimization.

import Image from "next/image";
import {
  Mail,
  ArrowRight,
  Briefcase,
  Zap,
  Users,
  GraduationCap,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Section } from "@/components/Section";
import { SocialLink } from "@/components/SocialLink";
import { BottomDock } from "@/components/BottomDock";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { HeroMotion } from "@/components/HeroMotion";
import { HighlightCards } from "@/components/HighlightCards";

// ── JSON-LD Structured Data ────────────────────────────────────
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abid Uddin Ahmed",
  jobTitle: "Director",
  worksFor: [
    {
      "@type": "Organization",
      name: "X-group Chain Restaurant & Hospitality Management",
      url: "https://www.x-grouprestaurant.com/",
    },
    { "@type": "Organization", name: "BCFCC", url: "https://bcfccbd.com/" },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Asia Pacific University of Technology & Innovation - APU",
  },
  email: "abidahmedrulz@gmail.com",
  telephone: "+8801730715191",
  sameAs: [
    "https://www.facebook.com/abid.ahmed.101054",
    "https://www.instagram.com/ahmed_abid_uddin/",
  ],
  image:
    "https://res.cloudinary.com/dhukcjdmi/image/upload/v1771654213/612164120_4215377298700050_6164740412147692303_n_wdfitm.jpg",
};

// ── Static data (plain objects — RSC-safe) ─────────────────────
const socialLinks = [
  { href: "https://www.facebook.com/abid.ahmed.101054", iconName: "Facebook" as const, label: "Facebook", username: "Social Connection" },
  { href: "https://linkedin.com", iconName: "Linkedin" as const, label: "LinkedIn", username: "Professional Network" },
  { href: "https://www.instagram.com/ahmed_abid_uddin/", iconName: "Instagram" as const, label: "Instagram", username: "Personal Insights" },
  { href: "https://wa.me/8801730715191", iconName: "MessageCircle" as const, label: "WhatsApp", username: "Direct Message" },
];

const tags = ["Hospitality Management", "Strategic Operations", "Brand Growth", "Team Leadership"];

// ── Page ───────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="min-h-screen w-full relative overflow-x-hidden pb-28 sm:pb-32">
        <NoiseOverlay />
        <BottomDock />

        {/*
          Background orbs — FIXED non-composited animation issue.
          Previously: used `animate-pulse` on elements with `blur-[120px]`.
          CSS `filter: blur()` creates new stacking context — animating it
          triggers repaint on every frame (Lighthouse flag: non-composited).
          Fix: use `.orb-pulse` which only animates `opacity` (compositor-safe).
          The blur stays static — visually identical, no jank.
        */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {/* Dark mode orbs */}
          <div className="hidden dark:block">
            <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-cyan-900/20 rounded-full blur-[80px] sm:blur-[120px] opacity-50 mix-blend-screen orb-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] bg-violet-900/20 rounded-full blur-[80px] sm:blur-[120px] opacity-40 mix-blend-screen" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-slate-900/50 rounded-full blur-[80px] sm:blur-[100px] opacity-30" />
          </div>
          {/* Light mode orbs */}
          <div className="block dark:hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-cyan-200/40 rounded-full blur-[60px] sm:blur-[100px] opacity-60 mix-blend-multiply" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] bg-violet-200/40 rounded-full blur-[60px] sm:blur-[100px] opacity-60 mix-blend-multiply" />
            <div className="absolute top-[30%] left-[60%] w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-blue-100/50 rounded-full blur-[50px] sm:blur-[80px] opacity-50" />
          </div>
        </div>

        {/* ── Main ── */}
        <main className="relative z-10">

          {/* ── Hero ── */}
          <div id="home">
            <Section animate={false} className="pt-20 pb-10 sm:pt-28 md:pt-36 md:pb-20 text-center px-4">
              {/*
                LCP element: next/image with priority + fetchPriority="high".
                Wrapped in HeroMotion which uses initial={{ scale: 0.92 }} only —
                NO initial opacity:0 — so image is visible on first paint.
              */}
              <HeroMotion>
                <Image
                  src="https://res.cloudinary.com/dhukcjdmi/image/upload/v1771654213/612164120_4215377298700050_6164740412147692303_n_wdfitm.jpg"
                  alt="Abid Uddin Ahmed - Director"
                  width={224}
                  height={224}
                  priority
                  fetchPriority="high"
                  className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full border-4 border-white/20 dark:border-white/10 shadow-2xl object-cover mx-auto"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, 224px"
                />
              </HeroMotion>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-cyan-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-sm pb-1">
                  Abid Uddin Ahmed
                </span>
              </h1>

              <div className="flex flex-col items-center gap-3 mb-8 sm:mb-10">
                <div className="flex items-center justify-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                  <span className="text-base sm:text-2xl md:text-3xl font-bold text-cyan-700 dark:text-cyan-200 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                    Director
                  </span>
                  <span aria-hidden="true" className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-cyan-500" />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base md:text-lg text-slate-700 dark:text-slate-300 font-semibold tracking-wide max-w-xs sm:max-w-3xl mx-auto leading-relaxed uppercase opacity-90 text-center">
                  <a
                    href="https://www.x-grouprestaurant.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors underline-offset-2"
                  >
                    X-group Chain Restaurant &amp; Hospitality Management
                  </a>
                  <span aria-hidden="true" className="hidden md:inline text-cyan-500">•</span>
                  <a
                    href="https://bcfccbd.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
                  >
                    BCFCC
                  </a>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 max-w-sm sm:max-w-2xl mx-auto text-base sm:text-xl md:text-2xl leading-relaxed px-2 sm:px-4 font-light">
                Leadership. Vision. Impact.{" "}
                <br className="hidden md:block" />
                Building the future through calm authority and strategic innovation.
              </p>
            </Section>
          </div>

          {/* ── Professional Overview ── */}
          <div id="about">
            <Section delay={0.1} className="px-4">
              <div className="flex items-center gap-3 mb-5 md:mb-8">
                <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Professional Overview
                </h2>
              </div>
              <SpotlightCard className="p-6 sm:p-8 md:p-12">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg md:text-xl font-light text-justify">
                  As the Director of{" "}
                  <a href="https://www.x-grouprestaurant.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">
                    X-group
                  </a>{" "}
                  and{" "}
                  <a href="https://bcfccbd.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">
                    BCFCC
                  </a>
                  , I oversee strategic operations across the chain restaurant and hospitality sector. With a focus on operational excellence and guest experience, I drive sustainable growth while fostering a culture of innovation and service leadership.
                </p>
                <ul className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3" aria-label="Professional focus areas">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wide hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors cursor-default">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Section>
          </div>

          {/* ── Education ── */}
          <div id="education">
            <Section delay={0.15} className="px-4">
              <div className="flex items-center gap-3 mb-5 md:mb-8">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Education
                </h2>
              </div>
              <SpotlightCard className="p-6 sm:p-8 md:p-12">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Bachelor of Arts (Honours) in International Business Management
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-lg font-medium">
                  Asia Pacific University of Technology &amp; Innovation — APU
                </p>
              </SpotlightCard>
            </Section>
          </div>

          {/* ── Key Highlights ── */}
          <div id="highlights">
            <Section delay={0.2} className="px-4">
              <div className="flex items-center gap-3 mb-5 md:mb-8">
                <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Key Highlights
                </h2>
              </div>
              <HighlightCards />
            </Section>
          </div>

          {/* ── Connect ── */}
          <div id="connect">
            <Section delay={0.25} className="px-4">
              <div className="flex items-center gap-3 mb-5 md:mb-8">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Connect
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((link) => (
                  <SocialLink key={link.label} {...link} />
                ))}
              </div>
            </Section>
          </div>

          {/* ── CTA ── */}
          <Section delay={0.3} className="text-center px-4">
            <SpotlightCard className="p-5 sm:p-10 md:p-20 bg-gradient-to-b from-slate-50 to-white dark:from-white/5 dark:to-white/[0.02]">
              <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-6">
                Ready to Collaborate?
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-6 sm:mb-10 max-w-xs sm:max-w-xl mx-auto text-sm sm:text-lg md:text-xl font-light text-center leading-relaxed">
                I am always open to discussing new ventures, speaking engagements, and strategic partnerships.
              </p>

              <div className="flex flex-col items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                <a
                  href="mailto:abidahmedrulz@gmail.com"
                  className="text-base sm:text-xl font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
                >
                  abidahmedrulz@gmail.com
                </a>
                <a
                  href="tel:+8801730715191"
                  className="text-base sm:text-xl font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
                >
                  +880 1730-715191
                </a>
              </div>

              <a
                href="mailto:abidahmedrulz@gmail.com"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3.5 sm:px-10 sm:py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full font-bold text-sm sm:text-xl hover:bg-slate-800 dark:hover:bg-cyan-50 transition-all shadow-xl shadow-slate-900/20 dark:shadow-white/10 w-full sm:w-auto min-h-[48px]"
              >
                <Mail className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" />
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" />
              </a>
            </SpotlightCard>
          </Section>

          {/* ── Footer ── */}
          <footer className="text-center text-slate-600 dark:text-slate-400 text-xs sm:text-sm py-6 sm:py-8 border-t border-slate-100 dark:border-white/5 mt-10">
            <p>&copy; {new Date().getFullYear()} Abid Uddin Ahmed • Director Portfolio</p>
          </footer>
        </main>
      </div>
    </>
  );
}
