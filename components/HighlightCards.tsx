"use client";

/**
 * HighlightCards — resolves icons client-side (RSC constraint).
 * Uses m.* — works with root LazyMotion in MotionProvider.
 */
import { TrendingUp, Users } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

const highlights = [
    {
        icon: TrendingUp,
        title: "Visionary Leadership",
        description:
            "Spearheaded initiatives that significantly increased operational efficiency across multiple departments.",
        iconBg: "bg-cyan-100 dark:bg-cyan-900/20",
        iconColor: "text-cyan-700 dark:text-cyan-400",
    },
    {
        icon: Users,
        title: "Team Leadership",
        description:
            "Managed cross-functional teams, delivering projects under budget and ahead of schedule.",
        iconBg: "bg-violet-100 dark:bg-violet-900/20",
        iconColor: "text-violet-600 dark:text-violet-400",
    },
];

export function HighlightCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {highlights.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
                <SpotlightCard key={title} className="p-5 sm:p-8" hoverEffect>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${iconBg} flex items-center justify-center mb-4 sm:mb-6 ${iconColor}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                        {title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        {description}
                    </p>
                </SpotlightCard>
            ))}
        </div>
    );
}
