import { NextRequest, NextResponse } from "next/server";
import { getMeetings, getMostRecentSunday } from "@/lib/meetings-db";

// Redirects /meetings/current to this Sunday's meeting.
export async function GET(request: NextRequest) {
    const meetings = getMeetings(getMostRecentSunday());

    // Fall back to the list if there is no meeting for this Sunday
    if (meetings.length === 0) {
        return NextResponse.redirect(new URL("/meetings", request.url));
    }

    // ?from=current lets the nav bar highlight "This Sunday"
    const url = new URL(`/meetings/${meetings[0].id}`, request.url);
    url.searchParams.set("from", "current");
    return NextResponse.redirect(url);
}