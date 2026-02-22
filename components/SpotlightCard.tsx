"use client";

/**
 * SpotlightCard — glassmorphism card with mouse-tracking spotlight effect.
 * Features:
 * - Geometric glassmorphism (glass-card)
 * - Interactive mouse-following radial glow.
 * - Glass-shine micro-interaction.
 */
import { m, useMotionTemplate, useMotionValue } from "motion/react";
import { MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    id?: string;
}

export function SpotlightCard({
    children,
    className = "",
    hoverEffect = false,
    id,
}: SpotlightCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            id={id}
            onMouseMove={handleMouseMove}
            className={`group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-500 glass-card glass-shine ${hoverEffect ? "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10" : ""
                } ${className}`}
        >
            {/* Spotlight gradient — pointer-events: none */}
            <m.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.12), transparent 80%)`,
                }}
            />

            <div className="relative z-10 h-full w-full">
                {children}
            </div>
        </div>
    );
}
