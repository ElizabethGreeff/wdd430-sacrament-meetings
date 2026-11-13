"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => { };

function getToday(): string {
    return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function Header() {
    const today = useSyncExternalStore(subscribe, getToday, () => "");

    return (
        <header className="bg-deep-forest text-parchment py-4 px-6 shadow">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                <p className="font-display text-2xl font-bold tracking-tight">
                    Sunrise Ward
                </p>
                <p className="text-sm text-parchment-deep min-h-[1.25rem]">
                    {today || "\u00A0"}
                </p>
            </div>
        </header>
    );
}