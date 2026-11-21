import Link from "next/link";

export default function EditMeetingNotFound() {
    return (
        <div className="py-12 text-center">
            <h1 className="mb-3 text-3xl font-bold text-deep-forest">Meeting not found</h1>
            <p className="mb-6 text-bark">
                We couldn&apos;t find that meeting. It may have been deleted.
            </p>
            <Link
                href="/meetings"
                className="rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-parchment transition-colors hover:bg-deep-forest"
            >
                Back to all meetings
            </Link>
        </div>
    );
}