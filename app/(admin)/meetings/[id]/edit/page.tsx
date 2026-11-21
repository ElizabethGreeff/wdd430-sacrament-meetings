import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById, parseMeetingId } from "@/lib/meetings-db";

export default async function EditMeetingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const meetingId = parseMeetingId(id);

    if (meetingId === null) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold text-deep-forest">Edit Meeting</h1>
            <MeetingForm
                action={updateMeeting.bind(null, meeting.id)}
                meeting={meeting}
                submitLabel="Save changes"
            />
        </div>
    );
}