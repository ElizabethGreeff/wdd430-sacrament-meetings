"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const urlQuery = searchParams.get("query") ?? "";

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1"); // a new search always starts at page 1
        const trimmed = term.trim();
        if (trimmed) {
            params.set("query", trimmed);
        } else {
            params.delete("query");
        }
        router.push(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        const input = inputRef.current;
        if (input && document.activeElement !== input && input.value !== urlQuery) {
            input.value = urlQuery;
        }
    }, [urlQuery]);

    return (
        <div role="search" className="mb-6">
            <input
                ref={inputRef}
                type="search"
                aria-label="Search meetings by speaker, presiding, conducting or meeting type"
                placeholder="Search by speaker, presiding, conducting or type…"
                defaultValue={urlQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-md border border-bark/40 bg-card px-4 py-2 text-ink placeholder:text-bark/70 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/40"
            />
        </div>
    );
}