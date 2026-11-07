import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MeetingDetailPage({ params }: PageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (id.trim() === "" || !Number.isInteger(meetingId)) {
        notFound();
    }

    const meeting = getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}