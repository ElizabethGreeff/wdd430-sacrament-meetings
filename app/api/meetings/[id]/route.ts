import { NextResponse } from "next/server";
import { getMeetingById, parseMeetingId } from "@/lib/meetings-db";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const id = parseMeetingId(idParam);

    if (id === null) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try {
        const meeting = await getMeetingById(id);

        if (!meeting) {
            return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
        }

        return NextResponse.json(meeting);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}