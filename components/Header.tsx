"use client";

import { useEffect, useState } from "react";

export default function Header() {
    const [today, setToday] = useState<string>("");

    useEffect(() => {
        setToday(
            new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    }, []);

    return (
        <header className="bg-[#283618] text-white py-4 px-6 shadow">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">Sunrise Ward</h1>
                <p className="text-sm text-[#c2c5aa] min-h-[1.25rem]">
                    {today || "\u00A0"}
                </p>
            </div>
        </header>
    );
}