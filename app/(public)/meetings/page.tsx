import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const metadata: Metadata = {
    title: "All Meetings",
    description:
        "Browse, search and print sacrament meeting programs for the Sunrise Ward.",
};

export default async function MeetingsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? "";
    const currentPage = Math.max(1, Math.floor(Number(searchParams?.page)) || 1);

    const [session, meetings, totalPages] = await Promise.all([
        auth(),
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);
    const canEdit = Boolean(session?.user);

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-deep-forest">All Meetings</h1>
                {canEdit ? (
                    <Link
                        href="/meetings/new"
                        className="rounded-md bg-forest px-4 py-2 text-sm font-medium text-parchment transition-colors hover:bg-deep-forest"
                    >
                        New meeting
                    </Link>
                ) : null}
            </div>

            <Suspense fallback={null}>
                <MeetingSearch />
            </Suspense>

            {meetings.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} canEdit={canEdit} />
                    ))}
                </div>
            ) : (
                <p className="py-10 text-center text-bark">
                    {query
                        ? `No meetings match “${query}”.`
                        : "No meetings found."}
                </p>
            )}

            <Suspense fallback={null}>
                <Pagination totalPages={totalPages} />
            </Suspense>
        </div>
    );
}