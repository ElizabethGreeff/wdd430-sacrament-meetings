import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Meeting",
    description: "Add a new sacrament meeting to the schedule.",
    robots: { index: false },
};

export default function NewMeetingPage() {
    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold text-deep-forest">Create Meeting</h1>
            <MeetingForm action={createMeeting} submitLabel="Create meeting" />
        </div>
    );
}