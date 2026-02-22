"use client";

/**
 * SpotlightCard — glassmorphism card with mouse-tracking spotlight.
 * Uses `m.div` (shared LazyMotion bundle).
 * useMotionTemplate is a pure value transform — zero render overhead.
 */
import { m, useMotionTemplate, useMotionValue } from "motion/react";
import { MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function SpotlightCard({
    children,
    className = "",
    hoverEffect = false,
}: SpotlightCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <m.div
            onMouseMove={handleMouseMove}
            whileHover={hoverEffect ? { scale: 1.02 } : undefined}
            transition={{ duration: 0.2 }}
            className={`
        group relative overflow-hidden
        bg-white/60 dark:bg-white/5
        backdrop-blur-2xl
        border border-black/5 dark:border-white/10
        shadow-xl shadow-black/5 dark:shadow-black/20
        rounded-2xl sm:rounded-3xl
        ${className}
      `}
        >
            {/* Spotlight gradient — pointer-events: none, no layout impact */}
            <m.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(14,165,233,0.15), transparent 80%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </m.div>
    );
}
