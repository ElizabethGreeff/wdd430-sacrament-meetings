import { NextRequest, NextResponse } from "next/server";
import { getMeetingsByDate } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
    const date = request.nextUrl.searchParams.get("date") || null;

    if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json(
            { error: "date must be in YYYY-MM-DD format" },
            { status: 400 }
        );
    }

    try {
        return NextResponse.json(await getMeetingsByDate(date));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}