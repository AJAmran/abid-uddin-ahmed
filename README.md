# Abid Uddin Ahmed | Director Portfolio

A premium, high-performance professional portfolio built for **Abid Uddin Ahmed**, Director at X-group Chain Restaurant & Hospitality Management and BCFCC. This application is engineered for maximum visual impact, accessibility, and industry-leading performance metrics.

![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Motion](https://img.shields.io/badge/Motion-React-ff0055?style=for-the-badge&logo=framer)

---

## 🚀 Performance Excellence

This project is meticulously optimized for **Core Web Vitals**, consistently aiming for high Lighthouse scores across all categories.

### Key Optimization Strategies:

- **Zero-Hydration FCP**: Critical Hero content is visible immediately on first paint by disabling entry animations for above-the-fold components.
- **LCP Speed**: Hero images are optimized via `next/image` with `priority`, `fetchPriority="high"`, and `preconnect` hints for Cloudinary.
- **Compositor-Only Animations**: All continuous animations (orbs, glows, floating effects) utilize only `opacity` and `transform` to avoid main-thread jank and non-composited repaints.
- **LazyMotion Integration**: Uses a centralized `LazyMotion` features bundle (~18KB) instead of the full Framer Motion library, significantly reducing JavaScript execution time.
- **FOUC Prevention**: A synchronous inline theme-detection script in the `<head>` prevents "Flash of Unstyled Content" for dark/light mode.

## ♿ Accessibility First (A11y)

Built with inclusivity as a core requirement:

- **WCAG 2.1 Compliance**: Contrast ratios for all text elements meet or exceed AA standards.
- **Semantic Navigation**: The floating BottomDock is built using semantic `<nav>`, `<ul>`, and `<li>` elements for perfect screen reader compatibility.
- **Interactive Targets**: All buttons and links maintain a minimum 44x44px tap target area.
- **Focus Management**: Customized `focus-visible` rings ensure clear visual feedback for keyboard users without affecting mouse users.

## 🛠️ Technical Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/)
- **Interactions**: [Motion (React)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Manrope (Body) & Fraunces (Display Serif) via `next/font`
- **Asset Management**: Cloudinary for high-performance image delivery

## 📦 Project Structure

```text
├── app/                  # Next.js App Router (Layouts, Pages, Metadata)
├── components/           # Reusable UI components (SpotlightCard, Section, etc.)
│   ├── BottomDock.tsx    # Semantic floating navigation
│   ├── HeroMotion.tsx    # Optimized LCP container
│   └── MotionProvider.tsx # Centralized Framer Motion provider
├── public/               # Static assets and PWA manifest
└── next.config.ts        # Optimized caching and security headers
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm / pnpm / bun

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🌐 SEO & Social

- **Dynamic Meta Tags**: Automated OpenGraph and Twitter card generation.
- **JSON-LD**: Embedded Schema.org structured data for enhanced Search Engine presence.
- **Robots & Sitemap**: Dynamically generated files for optimal crawling performance.

---

Built with precision by **Antigravity**.
