"use client";

/**
 * SocialLink — touch-friendly external link card.
 * Uses `m.a` (shared LazyMotion bundle).
 * Touch target is min 48px via padding — meets WCAG 2.5.5.
 * iconName (string) is RSC-safe — no function props crossing server→client.
 */
import { m } from "motion/react";
import {
    Facebook,
    Linkedin,
    Instagram,
    MessageCircle,
    type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
    Facebook,
    Linkedin,
    Instagram,
    MessageCircle,
};

interface SocialLinkProps {
    href: string;
    iconName: keyof typeof ICON_MAP;
    label: string;
    username?: string;
}

export function SocialLink({ href, iconName, label, username }: SocialLinkProps) {
    const Icon = ICON_MAP[iconName];

    return (
        <m.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`Visit ${label}${username ? ` — ${username}` : ""}`}
        >
            {/* min-height 48px for touch compliance */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 min-h-[48px] bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md dark:shadow-none">
                <div className="shrink-0 p-2.5 rounded-full bg-slate-100 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-black/5 dark:border-white/10 group-hover:border-cyan-500/30 text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                    {Icon && <Icon size={18} aria-hidden="true" />}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-white transition-colors truncate">
                        {label}
                    </p>
                    {username && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors truncate">
                            {username}
                        </p>
                    )}
                </div>
            </div>
        </m.a>
    );
}
