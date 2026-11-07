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
        <article className="bg-card border border-bark/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                    <h2 className="text-xl font-semibold text-deep-bark">
                        {formattedDate}
                    </h2>
                    <p className="text-sm text-bark capitalize">
                        {meeting.meetingType} meeting
                    </p>
                </div>
                <span className="text-xs font-medium bg-parchment-deep text-deep-bark px-2 py-1 rounded">
                    #{meeting.id}
                </span>
            </div>

            <p className="text-sm text-bark mb-1">
                <span className="font-medium">Presiding:</span> {meeting.presiding}
            </p>
            <p className="text-sm text-bark mb-4">
                <span className="font-medium">Conducting:</span> {meeting.conducting}
            </p>

            <Link
                href={`/meetings/${meeting.id}`}
                className="inline-block text-sm font-medium text-forest hover:text-deep-forest underline underline-offset-2"
            >
                View full agenda
            </Link>
        </article>
    );
}