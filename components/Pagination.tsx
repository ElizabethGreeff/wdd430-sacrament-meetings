"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

    if (totalPages <= 1) return null;

    // Keeps the active search query when changing page
    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        return `${pathname}?${params.toString()}`;
    }

    const linkClass =
        "rounded-md bg-forest px-4 py-2 text-sm font-medium text-parchment transition-colors hover:bg-deep-forest";
    const disabledClass =
        "rounded-md border border-bark/30 px-4 py-2 text-sm font-medium text-bark/60";

    return (
        <nav
            aria-label="Pagination"
            className="mt-8 flex items-center justify-center gap-4"
        >
            {currentPage > 1 ? (
                <Link href={createPageURL(currentPage - 1)} className={linkClass}>
                    Previous
                </Link>
            ) : (
                <span aria-disabled="true" className={disabledClass}>
                    Previous
                </span>
            )}

            <span className="text-sm font-medium text-deep-bark" aria-current="page">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link href={createPageURL(currentPage + 1)} className={linkClass}>
                    Next
                </Link>
            ) : (
                <span aria-disabled="true" className={disabledClass}>
                    Next
                </span>
            )}
        </nav>
    );
}