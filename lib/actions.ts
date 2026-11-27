"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import * as db from "./meetings-db";
import type { SacramentMeeting, SpeakerItem } from "./types";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";

async function requireSession(): Promise<void> {
    const session = await auth();
    if (!session?.user) redirect("/login");
}

export async function authenticate(
    _prevState: string | undefined,
    formData: FormData
): Promise<string | undefined> {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid email or password.";
                default:
                    return "Something went wrong. Please try again.";
            }
        }
        throw error;
    }
}

const MEETING_TYPES = ["testimony", "regular", "stake", "general", "special"] as const;

function isRealDate(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const d = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

function lines(text: string): string[] {
    return text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
}

function parseSpeakers(text: string): SpeakerItem[] {
    return lines(text).map((line) => {
        const isMusic = /^music:/i.test(line);
        const [name, ...rest] = line.replace(/^music:\s*/i, "").split("|");
        return {
            name: name.trim(),
            topic: rest.join("|").trim(),
            type: isMusic ? "musical-number" : "speaker",
        };
    });
}

const required = (label: string) =>
    z
        .string()
        .trim()
        .min(1, `${label} is required.`)
        .max(255, `${label} must be 255 characters or fewer.`);

const hymnNumber = z
    .string()
    .trim()
    .regex(/^\d{1,3}$/, "Enter a hymn number between 1 and 999.")
    .refine((v) => Number(v) >= 1, "Enter a hymn number between 1 and 999.");

const optionalLines = z.string().trim().max(5000, "Keep this under 5,000 characters.");

const MeetingFormSchema = z.object({
    date: z.string().trim().refine(isRealDate, "Choose a valid date."),
    meetingType: z.enum(MEETING_TYPES),
    presiding: required("Presiding"),
    conducting: required("Conducting"),
    announcements: optionalLines,
    openingHymnNumber: hymnNumber,
    openingHymnTitle: required("Opening hymn title"),
    openingPrayer: required("Opening prayer"),
    wardBusiness: optionalLines,
    stakeBusiness: z.string(), // checkbox: "on" or ""
    sacramentHymnNumber: hymnNumber,
    sacramentHymnTitle: required("Sacrament hymn title"),
    speakers: optionalLines.refine(
        (text) => parseSpeakers(text).every((s) => s.name !== ""),
        "Every line needs a name, for example: Sister Chen | Faith in Christ"
    ),
    closingHymnNumber: hymnNumber,
    closingHymnTitle: required("Closing hymn title"),
    closingPrayer: required("Closing prayer"),
});

type FormValues = z.infer<typeof MeetingFormSchema>;
export type FormField = keyof FormValues;

export type State = {
    message?: string | null;
    errors?: Partial<Record<FormField, string[]>>;
    values?: Record<string, string>;
};

function readForm(formData: FormData): Record<string, string> {
    const get = (name: string) => String(formData.get(name) ?? "");
    return {
        date: get("date"),
        meetingType: get("meetingType"),
        presiding: get("presiding"),
        conducting: get("conducting"),
        announcements: get("announcements"),
        openingHymnNumber: get("openingHymnNumber"),
        openingHymnTitle: get("openingHymnTitle"),
        openingPrayer: get("openingPrayer"),
        wardBusiness: get("wardBusiness"),
        stakeBusiness: get("stakeBusiness"),
        sacramentHymnNumber: get("sacramentHymnNumber"),
        sacramentHymnTitle: get("sacramentHymnTitle"),
        speakers: get("speakers"),
        closingHymnNumber: get("closingHymnNumber"),
        closingHymnTitle: get("closingHymnTitle"),
        closingPrayer: get("closingPrayer"),
    };
}

function toMeetingData(d: FormValues): Omit<SacramentMeeting, "id"> {
    return {
        date: d.date,
        meetingType: d.meetingType,
        presiding: d.presiding,
        conducting: d.conducting,
        announcements: lines(d.announcements),
        openingHymn: { number: Number(d.openingHymnNumber), title: d.openingHymnTitle },
        openingPrayer: d.openingPrayer,
        wardBusiness: lines(d.wardBusiness).map((description) => ({ description })),
        stakeBusiness: d.stakeBusiness === "on",
        sacramentHymn: { number: Number(d.sacramentHymnNumber), title: d.sacramentHymnTitle },
        speakers: parseSpeakers(d.speakers),
        closingHymn: { number: Number(d.closingHymnNumber), title: d.closingHymnTitle },
        closingPrayer: d.closingPrayer,
    };
}

function validate(
    formData: FormData
): { ok: true; data: Omit<SacramentMeeting, "id"> } | { ok: false; state: State } {
    const raw = readForm(formData);
    const result = MeetingFormSchema.safeParse(raw);

    if (!result.success) {
        return {
            ok: false,
            state: {
                message: "Please fix the highlighted fields and try again.",
                errors: result.error.flatten().fieldErrors,
                values: raw,
            },
        };
    }
    return { ok: true, data: toMeetingData(result.data) };
}

function isDuplicateDate(error: unknown): boolean {
    return (error as { code?: string } | null)?.code === "23505";
}

function duplicateDateState(formData: FormData): State {
    return {
        message: "Please fix the highlighted fields and try again.",
        errors: { date: ["A meeting already exists on this date."] },
        values: readForm(formData),
    };
}

export async function createMeeting(
    _prevState: State,
    formData: FormData
): Promise<State> {
    await requireSession();
    const checked = validate(formData);
    if (!checked.ok) return checked.state;

    try {
        await db.addMeeting(checked.data);
    } catch (error) {
        if (isDuplicateDate(error)) return duplicateDateState(formData);
        console.error("createMeeting failed:", error);
        throw new Error("Could not create the meeting. Please try again.");
    }

    revalidatePath("/meetings");
    redirect("/meetings");
}

export async function updateMeeting(
    id: number,
    _prevState: State,
    formData: FormData
): Promise<State> {
    await requireSession();
    const checked = validate(formData);
    if (!checked.ok) return checked.state;

    let updated: SacramentMeeting | null;
    try {
        updated = await db.updateMeeting(id, checked.data);
    } catch (error) {
        if (isDuplicateDate(error)) return duplicateDateState(formData);
        console.error("updateMeeting failed:", error);
        throw new Error("Could not update the meeting. Please try again.");
    }

    if (!updated) notFound();

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
    redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
    await requireSession();
    const id = db.parseMeetingId(String(formData.get("id") ?? ""));
    if (id === null) {
        throw new Error("Invalid meeting id.");
    }

    try {
        await db.deleteMeeting(id);
    } catch (error) {
        console.error("deleteMeeting failed:", error);
        throw new Error("Could not delete the meeting. Please try again.");
    }

    revalidatePath("/meetings");
    redirect("/meetings");
}
