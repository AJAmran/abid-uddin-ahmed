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
            <Section animate={false} className="pt-24 pb-16 sm:pt-36 md:pt-44 md:pb-28 text-center px-4">
              <HeroMotion>
                <div className="relative group">
                  {/* Executive Badge */}
                  <div className="absolute -top-6 -right-6 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-cyan-500/20 px-4 py-2 rounded-2xl shadow-xl shadow-cyan-500/10 rotate-12 scale-90 sm:scale-100 hidden sm:block">
                    <p className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Verfied Leader</p>
                  </div>

                  <Image
                    src="https://res.cloudinary.com/dhukcjdmi/image/upload/v1771654213/612164120_4215377298700050_6164740412147692303_n_wdfitm.jpg"
                    alt="Abid Uddin Ahmed - Director"
                    width={224}
                    height={224}
                    priority
                    fetchPriority="high"
                    className="relative w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-[2.5rem] border-4 border-white/40 dark:border-white/10 shadow-3xl object-cover mx-auto"
                    sizes="(max-width: 640px) 144px, (max-width: 768px) 208px, 256px"
                  />
                </div>
              </HeroMotion>

              <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-4 sm:mb-8 font-display leading-[0.95]">
                <span className="text-gradient">
                  Abid Uddin Ahmed
                </span>
              </h1>

              <div className="flex flex-col items-center gap-3 sm:gap-4 mb-8 sm:mb-14">
                <div className="flex items-center justify-center">
                  <span className="text-[10px] xs:text-xs sm:text-lg md:text-xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                    Director
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-4 sm:gap-y-2 text-[10px] xs:text-xs sm:text-base md:text-lg text-slate-500 dark:text-slate-400 font-semibold tracking-wide max-w-[280px] xs:max-w-xs sm:max-w-2xl mx-auto uppercase opacity-95 text-center leading-relaxed">
                  <a href="https://www.x-grouprestaurant.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors whitespace-nowrap">
                    X-group
                  </a>
                  <span aria-hidden="true" className="text-cyan-500">•</span>
                  <a href="https://bcfccbd.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors whitespace-nowrap">
                    BCFCC
                  </a>
                </div>
              </div>

              <div className="max-w-3xl mx-auto border-t border-slate-200 dark:border-white/5 pt-8 sm:pt-14 px-2">
                <p className="text-lg xs:text-xl sm:text-3xl md:text-4xl leading-snug sm:leading-[1.15] font-light">
                  Defining the standard of <span className="italic font-display font-medium text-slate-900 dark:text-white underline decoration-cyan-500/30 underline-offset-4 sm:underline-offset-8">Hospitality Excellence</span> and strategic visionary leadership.
                </p>
              </div>
            </Section>
          </div>

          {/* ── Overview & Education Bento ── */}
          <div id="about">
            <Section delay={0.1} className="max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
                {/* Profile Text (Bento Large) */}
                <SpotlightCard className="md:col-span-8 p-6 xs:p-8 sm:p-12 hoverEffect">
                  <div className="flex items-center gap-3 mb-5 sm:mb-6">
                    <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold">Professional Vision</h2>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base xs:text-lg sm:text-2xl font-light">
                    Transforming organizational landscapes through strategic operational mastery.
                    <span className="block mt-3 sm:mt-4 text-slate-500 dark:text-slate-400 text-sm xs:text-base sm:text-xl leading-relaxed">
                      At X-group and BCFCC, I drive sustainable growth by fusing traditional service excellence with modern strategic innovation.
                    </span>
                  </p>
                  <ul className="mt-6 sm:mt-8 flex flex-wrap gap-2" aria-label="Professional focus areas">
                    {tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-slate-900 dark:bg-white text-slate-50 dark:text-slate-950 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>

                {/* Education (Bento Small) */}
                <SpotlightCard id="education" className="md:col-span-4 p-6 xs:p-8 flex flex-col justify-center bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/10 dark:to-transparent border-amber-500/10 hoverEffect dark:hover:border-amber-500/20">
                  <div className="p-2 w-fit rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mb-5 sm:mb-6">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-tighter uppercase text-amber-900/80 dark:text-amber-200 font-display">Education</h3>
                  <p className="text-slate-900 dark:text-white text-base xs:text-lg font-bold leading-tight">
                    BA (Hons) International Business Management
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-[10px] xs:text-xs mt-2 xs:mt-3 font-medium uppercase tracking-wider">
                    Asia Pacific University — APU
                  </p>
                </SpotlightCard>

                {/* Key Highlights Focus - Unified with Bento Design */}
                <div className="md:col-span-12 mt-12 sm:mt-20">
                  <div className="flex items-center gap-4 mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                      Key Highlights
                    </h2>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <SpotlightCard className="p-8 sm:p-12 hoverEffect" hoverEffect>
                      <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400">
                          <Zap className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                          Visionary Leadership
                        </h3>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-base sm:text-xl font-light leading-relaxed">
                        Spearheaded initiatives that significantly increased operational efficiency across multiple departments.
                      </p>
                    </SpotlightCard>

                    <SpotlightCard className="p-8 sm:p-12 hoverEffect" hoverEffect>
                      <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                          <Users className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                          Team Leadership
                        </h3>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-base sm:text-xl font-light leading-relaxed">
                        Managed cross-functional teams, delivering projects under budget and ahead of schedule.
                      </p>
                    </SpotlightCard>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* ── Connect ── */}
          <div id="connect">
            <Section delay={0.05} className="max-w-5xl px-4">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                </div>
                <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tighter uppercase font-display">Direct Connect</h2>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {socialLinks.map((link) => (
                  <SocialLink key={link.label} {...link} />
                ))}
              </div>
            </Section>
          </div>

          {/* ── CTA ── */}
          <Section delay={0.1} className="max-w-4xl text-center px-4">
            <div className="glass-card p-6 xs:p-8 sm:p-14 md:p-24 rounded-[2rem] xs:rounded-[3rem] group glass-shine">
              <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tighter font-display leading-tight">
                Ready to <span className="text-gradient-cyan">Collaborate?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 sm:mb-10 max-w-xl mx-auto text-base xs:text-lg sm:text-2xl font-light leading-relaxed px-2">
                I am open to discussing new ventures, high-impact speaking engagements, and global strategic partnerships.
              </p>

              <div className="flex flex-col items-center gap-2 sm:gap-3 mb-10 sm:mb-12">
                <a
                  href="mailto:abidahmedrulz@gmail.com"
                  className="text-lg xs:text-xl sm:text-3xl font-bold text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors tracking-tight truncate max-w-full px-2"
                >
                  abidahmedrulz@gmail.com
                </a>
                <a
                  href="tel:+8801730715191"
                  className="text-lg xs:text-xl sm:text-3xl font-bold text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors tracking-tight"
                >
                  +880 1730-715191
                </a>
              </div>

              <a
                href="mailto:abidahmedrulz@gmail.com"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-4 sm:px-14 sm:py-6 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl xs:rounded-2xl font-black text-base sm:text-2xl hover:bg-slate-800 dark:hover:bg-cyan-50 transition-all shadow-2xl shadow-cyan-500/10 w-full sm:w-auto min-h-[56px] sm:min-h-[64px]"
              >
                <Mail className="w-5 h-5 sm:w-8 sm:h-8" aria-hidden="true" />
                <span>Get in Touch</span>
                <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" aria-hidden="true" />
              </a>
            </div>
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
