"use client";

/**
 * HeroMotion — Client Component island for hero avatar animations.
 *
 * LCP Fix: initial opacity is 1 (not 0).
 * The image is visible immediately on first paint — the browser can
 * measure and record LCP without waiting for JS hydration.
 * Only transform (scale) is animated — a composited-only property.
 *
 * Uses `m.*` instead of `motion.*` — works with the root LazyMotion
 * in MotionProvider. No per-component LazyMotion needed.
 */

import { m } from "motion/react";
import { ReactNode } from "react";

interface HeroMotionProps {
    children: ReactNode;
}

export function HeroMotion({ children }: HeroMotionProps) {
    return (
        <m.div
            // opacity stays at 1 — never hidden from the browser
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative inline-block mb-8 md:mb-12 group"
        >
            {/* Decorative glow ring — CSS animation, compositor-only (opacity) */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 hero-glow"
            />

            {/* Float animation — only translate Y — fully composited */}
            <m.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                {children}
            </m.div>
        </m.div>
    );
}
