import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById, parseMeetingId } from "@/lib/meetings-db";

interface PageProps {
    params: Promise<{ id: string }>;
}

const getMeeting = cache(async (rawId: string) => {
    const id = parseMeetingId(rawId);
    return id === null ? null : getMeetingById(id);
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const meeting = await getMeeting(id);

    if (!meeting) {
        return {
            title: "Meeting Not Found",
            description: "The requested sacrament meeting could not be found.",
        };
    }

    const date = new Date(meeting.date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return {
        title: `Meeting on ${date}`,
        description: `Program for the ${meeting.meetingType} meeting on ${date}. Presiding: ${meeting.presiding}. Conducting: ${meeting.conducting}.`,
    };
}

export default async function MeetingDetailPage({ params }: PageProps) {
    const { id } = await params;
    const meeting = await getMeeting(id);

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}