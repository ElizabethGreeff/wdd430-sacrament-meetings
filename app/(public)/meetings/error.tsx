"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MeetingsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div role="alert" className="py-12 text-center">
            <h1 className="mb-3 text-3xl font-bold text-deep-forest">Something went wrong</h1>
            <p className="mb-2 text-bark">
                We couldn&apos;t complete that. Please try again, or go back to the list.
            </p>
            {error.digest ? (
                <p className="mb-6 text-xs text-bark">Reference: {error.digest}</p>
            ) : null}
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-parchment transition-colors hover:bg-deep-forest"
                >
                    Try Again
                </button>
                <Link
                    href="/meetings"
                    className="rounded-md bg-bark px-5 py-2.5 text-sm font-medium text-parchment transition-colors hover:bg-deep-bark"
                >
                    Back to all meetings
                </Link>
            </div>
        </div>
    );
}