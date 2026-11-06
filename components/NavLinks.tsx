"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "All Meetings" },
    { href: "/meetings/current", label: "This Sunday" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation" className="bg-[#606c38] text-white">
            <div className="max-w-5xl mx-auto px-9 py-2 flex justify-center">
                <ul className="flex flex-wrap gap-1 py-2">
                    {links.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? "bg-[#582f0e] text-white"
                                        : "hover:bg-[#7f4f24]/80"
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