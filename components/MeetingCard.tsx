import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    const formattedDate = new Date(meeting.date + "T00:00:00").toLocaleDateString(
        "en-US",
        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    return (
        <article className="bg-white border border-[#daa568]/50 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                    <h2 className="text-lg font-semibold text-[#523a34]">
                        {formattedDate}
                    </h2>
                    <p className="text-sm text-[#523a34]/70 capitalize">
                        {meeting.meetingType} meeting
                    </p>
                </div>
                <span className="text-xs font-medium bg-[#daa568]/30 text-[#523a34] px-2 py-1 rounded">
                    #{meeting.id}
                </span>
            </div>

            <p className="text-sm text-[#523a34]/80 mb-1">
                <span className="font-medium">Presiding:</span> {meeting.presiding}
            </p>
            <p className="text-sm text-[#523a34]/80 mb-4">
                <span className="font-medium">Conducting:</span> {meeting.conducting}
            </p>

            <Link
                href={`/meetings/${meeting.id}`}
                className="inline-block text-sm font-medium text-[#248232] hover:text-[#2ba84a] hover:underline"
            >
                View full agenda
            </Link>
        </article>
    );
}