import { redirect } from "next/navigation";
import { getMeetings, getMostRecentSunday } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default function CurrentMeetingPage() {
    const meetings = getMeetings(getMostRecentSunday());

    if (meetings.length > 0) {
        redirect(`/meetings/${meetings[0].id}?from=current`);
    }

    // Fallback if there is no meeting for this Sunday
    redirect("/meetings");
}