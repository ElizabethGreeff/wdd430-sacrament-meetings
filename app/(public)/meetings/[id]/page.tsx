import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById, parseMeetingId } from "@/lib/meetings-db";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MeetingDetailPage({ params }: PageProps) {
    const { id } = await params;
    const meetingId = parseMeetingId(id);

    if (meetingId === null) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}