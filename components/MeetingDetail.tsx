"use client";

import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    const formattedDate = new Date(meeting.date + "T00:00:00").toLocaleDateString(
        "en-US",
        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    return (
        <div className="bg-white border border-[#daa568]/40 rounded-xl shadow-sm overflow-hidden print:shadow-none print:border-0">
            {/* Header */}
            <div className="bg-[#523a34] text-white px-6 py-5 print:bg-white print:text-black print:border-b">
                <h1 className="text-2xl font-bold">Sacrament Meeting</h1>
                <p className="text-[#daa568] print:text-slate-700 mt-1">{formattedDate}</p>
                <p className="text-sm text-[#daa568]/80 print:text-slate-600 capitalize mt-1">
                    {meeting.meetingType} meeting
                </p>
            </div>

            <div className="p-6 space-y-6">
                {/* Leadership */}
                <section>
                    <h2 className="text-sm font-semibold text-[#248232] uppercase tracking-wide mb-2">
                        Leadership
                    </h2>
                    <p>
                        <span className="font-medium">Presiding:</span> {meeting.presiding}
                    </p>
                    <p>
                        <span className="font-medium">Conducting:</span> {meeting.conducting}
                    </p>
                </section>

                {/* Announcements */}
                {meeting.announcements && meeting.announcements.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold text-[#248232] uppercase tracking-wide mb-2">
                            Announcements
                        </h2>
                        <ul className="list-disc list-inside space-y-1">
                            {meeting.announcements.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Opening */}
                <section>
                    <h2 className="text-sm font-semibold text-[#248232] uppercase tracking-wide mb-2">
                        Opening
                    </h2>
                    <p>
                        <span className="font-medium">Hymn #{meeting.openingHymn.number}:</span>{" "}
                        {meeting.openingHymn.title}
                    </p>
                    <p>
                        <span className="font-medium">Opening Prayer:</span> {meeting.openingPrayer}
                    </p>
                </section>

                {/* Business */}
                <section>
                    <h2 className="text-sm font-semibold text-[#248232] uppercase tracking-wide mb-2">
                        Business
                    </h2>
                    {meeting.wardBusiness.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 mb-2">
                            {meeting.wardBusiness.map((item, i) => (
                                <li key={i}>{item.description}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 italic">No ward business</p>
                    )}
                    <p>
                        <span className="font-medium">Stake Business:</span>{" "}
                        {meeting.stakeBusiness ? "Yes" : "No"}
                    </p>
                </section>

                {/* Sacrament */}
                <section>
                    <h2 className="text-sm font-semibold text-[#248232] uppercase tracking-wide mb-2">
                        Sacrament
                    </h2>
                    <p>
                        <span className="font-medium">Hymn #{meeting.sacramentHymn.number}:</span>{" "}
                        {meeting.sacramentHymn.title}
                    </p>
                </section>

                {/* Program */}
                <section>
                    <h2 className="text-sm font-semibold text-[#248232] uppercase tracking-wide mb-2">
                        Program
                    </h2>
                    {meeting.speakers.length > 0 ? (
                        <ul className="space-y-2">
                            {meeting.speakers.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="font-medium min-w-[140px]">{item.name}</span>
                                    <span className="text-slate-600">
                                        {item.type === "musical-number" ? "Musical Number" : item.topic}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 italic">Testimony meeting – open to all</p>
                    )}
                </section>

                {/* Closing */}
                <section>
                    <h2 className="text-sm font-semibold text-[#248232] uppercase tracking-wide mb-2">
                        Closing
                    </h2>
                    <p>
                        <span className="font-medium">Hymn #{meeting.closingHymn.number}:</span>{" "}
                        {meeting.closingHymn.title}
                    </p>
                    <p>
                        <span className="font-medium">Closing Prayer:</span> {meeting.closingPrayer}
                    </p>
                </section>
            </div>

            {/* Print button */}
            <div className="px-6 pb-6 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="bg-[#248232] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[#2ba84a] transition-colors"
                >
                    Print Program
                </button>
            </div>
        </div>
    );
}