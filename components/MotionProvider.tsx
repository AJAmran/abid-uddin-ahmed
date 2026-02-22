"use client";

import { LazyMotion, domAnimation } from "motion/react";
import { ReactNode } from "react";

/**
 * MotionProvider — wraps the entire app with a single LazyMotion.
 * All child `m.*` components share this one feature set (~18 KB vs ~45 KB).
 * Do NOT nest LazyMotion; this is the only instance in the app.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
    return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
