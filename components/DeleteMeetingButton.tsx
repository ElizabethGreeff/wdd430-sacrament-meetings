"use client";

import { useFormStatus } from "react-dom";
import { deleteMeeting } from "@/lib/actions";

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            aria-label={label}
            className="rounded-md border border-red-800 px-3 py-1.5 text-sm font-medium text-red-800 transition-colors hover:bg-red-800 hover:text-parchment disabled:opacity-60"
        >
            {pending ? "Deleting…" : "Delete"}
        </button>
    );
}

export default function DeleteMeetingButton({
    meetingId,
    label,
}: {
    meetingId: number;
    label: string;
}) {
    return (
        <form
            action={deleteMeeting}
            onSubmit={(event) => {
                if (!window.confirm("Delete this meeting? This cannot be undone.")) {
                    event.preventDefault();
                }
            }}
        >
            <input type="hidden" name="id" value={meetingId} />
            <SubmitButton label={label} />
        </form>
    );
}