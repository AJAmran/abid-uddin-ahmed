"use client";

/**
 * BottomDock — floating navigation bar.
 *
 * Performance:
 * - Uses `m.*` (shared root LazyMotion bundle — no extra cost).
 * - Passive scroll listener (never blocks main thread).
 * - useCallback for scroll/share handlers (stable references).
 *
 * Mobile / A11y:
 * - All tap targets are min 44×44px (WCAG 2.5.5).
 * - role="navigation" + aria-label on the nav container.
 * - aria-current="page" on the active nav item.
 * - Dark/light toggle has descriptive aria-label.
 * - Tooltip has role="status" + aria-live for screen readers.
 * - focus-visible rings on all interactive elements.
 */

import { Home, User, Zap, Mail, Moon, Sun, Share2 } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/components/ThemeProvider";

const NAV_ITEMS = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "highlights", icon: Zap, label: "Highlights" },
    { id: "connect", icon: Mail, label: "Connect" },
] as const;

// ── NavItem ──────────────────────────────────────────────────────
interface NavItemProps {
    id: string;
    icon: typeof Home;
    label: string;
    active: boolean;
    onClick: (id: string) => void;
}

function NavItem({ id, icon: Icon, label, active, onClick }: NavItemProps) {
    return (
        <button
            type="button"
            onClick={() => onClick(id)}
            className="relative p-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label={`Go to ${label}`}
            aria-current={active ? "page" : "false"}
        >
            {active && (
                <m.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-100 dark:bg-cyan-500/20 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <Icon
                size={19}
                aria-hidden="true"
                strokeWidth={active ? 2.5 : 2}
                className={`relative transition-colors duration-300 ${active
                    ? "text-cyan-700 dark:text-cyan-300"
                    : "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                    }`}
            />
        </button>
    );
}

// ── BottomDock ───────────────────────────────────────────────────
export function BottomDock() {
    const { isDark, toggleTheme } = useTheme();
    const [activeSection, setActiveSection] = useState("home");
    const [showTooltip, setShowTooltip] = useState(false);

    const scrollTo = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
    }, []);

    // Passive scroll tracker — never blocks main thread
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY + 200;
            for (const { id } of NAV_ITEMS) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= y) setActiveSection(id);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleShare = useCallback(async () => {
        const data = {
            title: "Abid Uddin Ahmed | Director",
            text: "Check out the professional profile of Abid Uddin Ahmed.",
            url: window.location.href,
        };
        if (navigator.share) {
            try { await navigator.share(data); } catch { /* cancelled */ }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setShowTooltip(true);
                setTimeout(() => setShowTooltip(false), 2000);
            } catch { /* clipboard unavailable */ }
        }
    }, []);

    return (
        // Positioned above system bottom bars on mobile (safe-area-inset)
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-xs sm:max-w-md">
            <m.nav
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 22 }}
                className="flex items-center justify-between px-2 py-1 sm:px-3 sm:py-1.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-full shadow-2xl shadow-black/10 dark:shadow-black/30 ring-1 ring-black/5 dark:ring-white/5"
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Nav links — Semantic UL/LI for accessibility */}
                <ul className="flex items-center list-none m-0 p-0">
                    {NAV_ITEMS.map(({ id, icon, label }) => (
                        <li key={id}>
                            <NavItem
                                id={id}
                                icon={icon}
                                label={label}
                                active={activeSection === id}
                                onClick={scrollTo}
                            />
                        </li>
                    ))}
                </ul>

                {/* Divider */}
                <div aria-hidden="true" className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1 shrink-0" />

                {/* Actions */}
                <div className="flex items-center">
                    {/* Theme toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="p-3 rounded-full text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDark
                            ? <Moon size={19} aria-hidden="true" />
                            : <Sun size={19} aria-hidden="true" />
                        }
                    </button>

                    {/* Share */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={handleShare}
                            className="p-3 rounded-full text-slate-400 hover:text-cyan-500 hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                            aria-label="Share this page"
                        >
                            <Share2 size={19} aria-hidden="true" />
                        </button>

                        <AnimatePresence>
                            {showTooltip && (
                                <m.div
                                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                    animate={{ opacity: 1, y: -42, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    role="status"
                                    aria-live="polite"
                                    className="absolute right-0 whitespace-nowrap px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg shadow-xl pointer-events-none"
                                >
                                    Copied!
                                    <div aria-hidden="true" className="absolute -bottom-1 right-3 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </m.nav>
        </div>
    );
}
