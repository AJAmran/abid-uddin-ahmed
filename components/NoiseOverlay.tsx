"use client";

import { memo } from "react";

/**
 * NoiseOverlay — optimized for mobile performance.
 * Instead of a full-screen SVG filter (which is heavy on mobile GPUs),
 * we use a small, repeated noise pattern.
 */
export const NoiseOverlay = memo(function NoiseOverlay() {
    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.45] mix-blend-soft-light"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px",
            }}
        />
    );
});
