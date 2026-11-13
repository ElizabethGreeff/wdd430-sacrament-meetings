export default function Loading() {
    return (
        <div role="status" aria-live="polite" className="animate-pulse">
            <span className="sr-only">Loading meetings…</span>
            <div className="mb-6 h-10 rounded-md bg-parchment-deep" />
            <div className="grid gap-5 sm:grid-cols-2" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-40 rounded-lg bg-parchment-deep" />
                ))}
            </div>
        </div>
    );
}