"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { SacramentMeeting, SpeakerItem } from "@/lib/types";
import type { State } from "@/lib/actions";

type FormAction = (prevState: State, formData: FormData) => Promise<State>;

const initialState: State = { message: null, errors: {} };

const inputClass =
    "w-full rounded-md border border-bark/40 bg-card px-3 py-2 text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/40 aria-[invalid=true]:border-red-800";

function formatSpeaker(s: SpeakerItem): string {
    if (s.type === "musical-number") {
        return `Music: ${s.name}${s.topic ? ` | ${s.topic}` : ""}`;
    }
    return `${s.name} | ${s.topic}`;
}

function toDefaults(m?: SacramentMeeting): Record<string, string> {
    if (!m) return { meetingType: "regular" };
    return {
        date: m.date,
        meetingType: m.meetingType,
        presiding: m.presiding,
        conducting: m.conducting,
        announcements: (m.announcements ?? []).join("\n"),
        openingHymnNumber: String(m.openingHymn.number),
        openingHymnTitle: m.openingHymn.title,
        openingPrayer: m.openingPrayer,
        wardBusiness: m.wardBusiness.map((item) => item.description).join("\n"),
        stakeBusiness: m.stakeBusiness ? "on" : "",
        sacramentHymnNumber: String(m.sacramentHymn.number),
        sacramentHymnTitle: m.sacramentHymn.title,
        speakers: m.speakers.map(formatSpeaker).join("\n"),
        closingHymnNumber: String(m.closingHymn.number),
        closingHymnTitle: m.closingHymn.title,
        closingPrayer: m.closingPrayer,
    };
}

interface A11yProps {
    id: string;
    "aria-describedby": string;
    "aria-invalid": boolean;
    "aria-required": boolean;
}

function Field({
    id,
    label,
    hint,
    errors,
    required = true,
    children,
}: {
    id: string;
    label: string;
    hint?: string;
    errors?: string[];
    required?: boolean;
    children: (props: A11yProps) => React.ReactNode;
}) {
    const describedBy = [hint ? `${id}-hint` : null, `${id}-error`]
        .filter(Boolean)
        .join(" ");

    return (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-deep-bark">
                {label}
                {required ? (
                    <span aria-hidden="true" className="text-red-800"> *</span>
                ) : null}
            </label>
            {hint ? (
                <p id={`${id}-hint`} className="mb-1 text-xs text-bark">
                    {hint}
                </p>
            ) : null}
            {children({
                id,
                "aria-describedby": describedBy,
                "aria-invalid": Boolean(errors?.length),
                "aria-required": required,
            })}
            <div id={`${id}-error`} aria-live="polite" className="mt-1 text-sm text-red-800">
                {errors?.map((message) => <p key={message}>{message}</p>)}
            </div>
        </div>
    );
}

export default function MeetingForm({
    action,
    meeting,
    submitLabel,
}: {
    action: FormAction;
    meeting?: SacramentMeeting;
    submitLabel: string;
}) {
    const [state, formAction, isPending] = useActionState(action, initialState);
    const errors = state.errors ?? {};
    const v = state.values ?? toDefaults(meeting);

    return (
        <form action={formAction} noValidate className="space-y-8">
            <div aria-live="polite">
                {state.message ? (
                    <p className="rounded-md border border-red-800 bg-card px-4 py-3 text-sm text-red-800">
                        {state.message}
                    </p>
                ) : null}
            </div>

            <fieldset className="space-y-4">
                <legend className="mb-2 font-display text-xl font-semibold text-deep-bark">
                    Meeting details
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="date" label="Date" errors={errors.date}>
                        {(a) => (
                            <input {...a} name="date" type="date" defaultValue={v.date} className={inputClass} />
                        )}
                    </Field>
                    <Field id="meetingType" label="Meeting type" errors={errors.meetingType}>
                        {(a) => (
                            <select {...a} name="meetingType" defaultValue={v.meetingType ?? "regular"} className={inputClass}>
                                <option value="regular">Regular</option>
                                <option value="testimony">Testimony</option>
                                <option value="stake">Stake</option>
                                <option value="general">General</option>
                                <option value="special">Special</option>
                            </select>
                        )}
                    </Field>
                    <Field id="presiding" label="Presiding" errors={errors.presiding}>
                        {(a) => (
                            <input {...a} name="presiding" type="text" defaultValue={v.presiding} className={inputClass} />
                        )}
                    </Field>
                    <Field id="conducting" label="Conducting" errors={errors.conducting}>
                        {(a) => (
                            <input {...a} name="conducting" type="text" defaultValue={v.conducting} className={inputClass} />
                        )}
                    </Field>
                </div>
                <Field
                    id="announcements"
                    label="Announcements"
                    hint="One announcement per line."
                    errors={errors.announcements}
                    required={false}
                >
                    {(a) => (
                        <textarea {...a} name="announcements" rows={3} defaultValue={v.announcements} className={inputClass} />
                    )}
                </Field>
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="mb-2 font-display text-xl font-semibold text-deep-bark">
                    Opening
                </legend>
                <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                    <Field id="openingHymnNumber" label="Hymn number" errors={errors.openingHymnNumber}>
                        {(a) => (
                            <input {...a} name="openingHymnNumber" type="text" inputMode="numeric" defaultValue={v.openingHymnNumber} className={inputClass} />
                        )}
                    </Field>
                    <Field id="openingHymnTitle" label="Hymn title" errors={errors.openingHymnTitle}>
                        {(a) => (
                            <input {...a} name="openingHymnTitle" type="text" defaultValue={v.openingHymnTitle} className={inputClass} />
                        )}
                    </Field>
                </div>
                <Field id="openingPrayer" label="Opening prayer" errors={errors.openingPrayer}>
                    {(a) => (
                        <input {...a} name="openingPrayer" type="text" defaultValue={v.openingPrayer} className={inputClass} />
                    )}
                </Field>
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="mb-2 font-display text-xl font-semibold text-deep-bark">
                    Business
                </legend>
                <Field
                    id="wardBusiness"
                    label="Ward business"
                    hint="One item per line. Leave empty if there is none."
                    errors={errors.wardBusiness}
                    required={false}
                >
                    {(a) => (
                        <textarea {...a} name="wardBusiness" rows={3} defaultValue={v.wardBusiness} className={inputClass} />
                    )}
                </Field>
                <div className="flex items-center gap-2">
                    <input
                        id="stakeBusiness"
                        name="stakeBusiness"
                        type="checkbox"
                        defaultChecked={v.stakeBusiness === "on"}
                        className="h-4 w-4 accent-forest"
                    />
                    <label htmlFor="stakeBusiness" className="text-sm font-medium text-deep-bark">
                        There is stake business
                    </label>
                </div>
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="mb-2 font-display text-xl font-semibold text-deep-bark">
                    Sacrament
                </legend>
                <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                    <Field id="sacramentHymnNumber" label="Hymn number" errors={errors.sacramentHymnNumber}>
                        {(a) => (
                            <input {...a} name="sacramentHymnNumber" type="text" inputMode="numeric" defaultValue={v.sacramentHymnNumber} className={inputClass} />
                        )}
                    </Field>
                    <Field id="sacramentHymnTitle" label="Hymn title" errors={errors.sacramentHymnTitle}>
                        {(a) => (
                            <input {...a} name="sacramentHymnTitle" type="text" defaultValue={v.sacramentHymnTitle} className={inputClass} />
                        )}
                    </Field>
                </div>
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="mb-2 font-display text-xl font-semibold text-deep-bark">
                    Program
                </legend>
                <Field
                    id="speakers"
                    label="Speakers and musical numbers"
                    hint="One per line, as Name | Topic. Start a musical number with Music:, for example Music: Youth Choir | Come, Follow Me"
                    errors={errors.speakers}
                    required={false}
                >
                    {(a) => (
                        <textarea {...a} name="speakers" rows={4} defaultValue={v.speakers} className={inputClass} />
                    )}
                </Field>
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="mb-2 font-display text-xl font-semibold text-deep-bark">
                    Closing
                </legend>
                <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                    <Field id="closingHymnNumber" label="Hymn number" errors={errors.closingHymnNumber}>
                        {(a) => (
                            <input {...a} name="closingHymnNumber" type="text" inputMode="numeric" defaultValue={v.closingHymnNumber} className={inputClass} />
                        )}
                    </Field>
                    <Field id="closingHymnTitle" label="Hymn title" errors={errors.closingHymnTitle}>
                        {(a) => (
                            <input {...a} name="closingHymnTitle" type="text" defaultValue={v.closingHymnTitle} className={inputClass} />
                        )}
                    </Field>
                </div>
                <Field id="closingPrayer" label="Closing prayer" errors={errors.closingPrayer}>
                    {(a) => (
                        <input {...a} name="closingPrayer" type="text" defaultValue={v.closingPrayer} className={inputClass} />
                    )}
                </Field>
            </fieldset>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-parchment transition-colors hover:bg-deep-forest disabled:opacity-60"
                >
                    {isPending ? "Saving…" : submitLabel}
                </button>
                <Link
                    href="/meetings"
                    className="text-sm font-medium text-forest underline underline-offset-2 hover:text-deep-forest"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}