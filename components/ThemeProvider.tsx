"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    isDark: true,
    toggleTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

/**
 * ThemeProvider — manages dark/light state only.
 * FOUC is prevented by the inline <script> in layout.tsx <head>,
 * which applies the `.dark` class synchronously before React hydrates.
 * This component does NOT hide content — zero LCP impact.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    // Default dark; will sync from DOM on mount (class was set by inline script)
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Read the class that the inline <head> script already applied
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    function toggleTheme() {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
