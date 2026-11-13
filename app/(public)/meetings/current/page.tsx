import { redirect } from "next/navigation";
import { getMeetingsByDate, getMostRecentSunday } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage() {
    const meetings = await getMeetingsByDate(getMostRecentSunday());

    if (meetings.length > 0) {
        redirect(`/meetings/${meetings[0].id}?from=current`);
    }

    // Fallback if there is no meeting for this Sunday
    redirect("/meetings");
}