import { redirect } from "next/navigation";
import { getMeetings, getMostRecentSunday } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
    const sunday = getMostRecentSunday();
    const meetings = getMeetings(sunday);

    if (meetings.length > 0) {
        redirect(`/meetings/${meetings[0].id}`);
    }

    // Fallback if no meeting for this Sunday
    redirect("/meetings");
}