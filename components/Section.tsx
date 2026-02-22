"use client";

/**
 * Section — scroll-triggered reveal using `m.section` (shared LazyMotion).
 * whileInView fires once (viewport: { once: true }) — no repeated work.
 */
import { m } from "motion/react";
import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    id?: string;
    animate?: boolean;
}

export function Section({ children, className = "", delay = 0, id, animate = true }: SectionProps) {
    if (!animate) {
        return (
            <section id={id} className={`w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12 ${className}`}>
                {children}
            </section>
        );
    }

    return (
        <m.section
            id={id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay, ease: "easeOut" }}
            className={`w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12 ${className}`}
        >
            {children}
        </m.section>
    );
}
