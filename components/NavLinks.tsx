"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "All Meetings" },
    { href: "/meetings/current", label: "This Sunday" },
];

export default function NavLinks() {
    const pathname = usePathname();
    const fromCurrent = useSearchParams().get("from") === "current";

    function isLinkActive(href: string): boolean {
        if (href === "/") return pathname === "/";
        if (href === "/meetings/current") return fromCurrent;
        // All Meetings: the list, or any meeting opened from the list
        return (
            pathname === "/meetings" ||
            (pathname.startsWith("/meetings/") && !fromCurrent)
        );
    }

    return (
        <nav aria-label="Main navigation" className="bg-forest text-parchment">
            <div className="max-w-5xl mx-auto px-9 py-2 flex justify-center">
                <ul className="flex flex-wrap gap-1 py-2">
                    {links.map((link) => {
                        const isActive = isLinkActive(link.href);

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    prefetch={link.href !== "/meetings/current"}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? "bg-bark text-parchment"
                                        : "hover:bg-moss"
                                        }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}