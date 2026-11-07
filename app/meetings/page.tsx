import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
    const meetings = getMeetings();

    return (
        <div>
            <h1 className="text-3xl font-bold text-deep-forest mb-6">All Meetings</h1>
            <div className="grid gap-5 sm:grid-cols-2">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </div>
        </div>
    );
}