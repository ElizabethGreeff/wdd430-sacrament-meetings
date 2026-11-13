import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export default async function MeetingsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? "";
    const currentPage = Math.max(1, Math.floor(Number(searchParams?.page)) || 1);

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-deep-forest mb-6">All Meetings</h1>

            <Suspense fallback={null}>
                <MeetingSearch />
            </Suspense>

            {meetings.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
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