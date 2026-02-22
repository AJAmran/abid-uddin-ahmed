// app/loading.tsx — Streaming SSR skeleton shown while page suspense resolves
export default function Loading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 bg-slate-50 dark:bg-slate-950">
            {/* Avatar skeleton */}
            <div className="w-44 h-44 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
            {/* Name skeleton */}
            <div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            {/* Title skeleton */}
            <div className="h-6 w-32 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
            {/* Content skeletons */}
            <div className="w-full max-w-2xl px-6 space-y-4">
                <div className="h-40 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-40 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </div>
        </div>
    );
}
