import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

export const ITEMS_PER_PAGE = 5;

function toSearchTerm(query: string): string {
    return `%${query.replace(/[\\%_]/g, "\\$&")}%`;
}

export function parseMeetingId(value: string): number | null {
    if (!/^\d+$/.test(value)) return null;
    const id = Number(value);
    return id > 0 && id <= 2147483647 ? id : null;
}

export async function getMeetings(
    query: string = "",
    currentPage: number = 1
): Promise<SacramentMeeting[]> {
    const searchTerm = toSearchTerm(query);
    const page = Math.max(1, Math.floor(currentPage) || 1);
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding       ILIKE ${searchTerm}
      OR conducting   ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
    return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query: string = ""): Promise<number> {
    const searchTerm = toSearchTerm(query);
    const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding       ILIKE ${searchTerm}
      OR conducting   ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingsByDate(
    date: string | null = null
): Promise<SacramentMeeting[]> {
    const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE (${date}::date IS NULL OR date = ${date}::date)
    ORDER BY date DESC
  `;
    return rows as unknown as SacramentMeeting[];
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
    const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export function getMostRecentSunday(): string {
    const sunday = new Date();
    sunday.setDate(sunday.getDate() - sunday.getDay());

    const yyyy = sunday.getFullYear();
    const mm = String(sunday.getMonth() + 1).padStart(2, "0");
    const dd = String(sunday.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

const toJson = (value: unknown): string | null =>
    value === undefined ? null : JSON.stringify(value);

export async function addMeeting(
    data: Omit<SacramentMeeting, "id">
): Promise<SacramentMeeting> {
    const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${data.date}::date, ${data.meetingType}, ${data.presiding}, ${data.conducting},
      ${data.announcements ?? []}::text[],
      ${toJson(data.openingHymn)}::jsonb, ${data.openingPrayer},
      ${toJson(data.wardBusiness)}::jsonb, ${data.stakeBusiness},
      ${toJson(data.sacramentHymn)}::jsonb, ${toJson(data.speakers)}::jsonb,
      ${toJson(data.closingHymn)}::jsonb, ${data.closingPrayer}
    )
    RETURNING id
  `;
    return { id: Number(rows[0].id), ...data };
}

export async function updateMeeting(
    id: number,
    updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
    const rows = await sql`
    UPDATE meetings SET
      date           = COALESCE(${updates.date ?? null}::date, date),
      meeting_type   = COALESCE(${updates.meetingType ?? null}::varchar, meeting_type),
      presiding      = COALESCE(${updates.presiding ?? null}::varchar, presiding),
      conducting     = COALESCE(${updates.conducting ?? null}::varchar, conducting),
      announcements  = COALESCE(${updates.announcements ?? null}::text[], announcements),
      opening_hymn   = COALESCE(${toJson(updates.openingHymn)}::jsonb, opening_hymn),
      opening_prayer = COALESCE(${updates.openingPrayer ?? null}::varchar, opening_prayer),
      ward_business  = COALESCE(${toJson(updates.wardBusiness)}::jsonb, ward_business),
      stake_business = COALESCE(${updates.stakeBusiness ?? null}::boolean, stake_business),
      sacrament_hymn = COALESCE(${toJson(updates.sacramentHymn)}::jsonb, sacrament_hymn),
      speakers       = COALESCE(${toJson(updates.speakers)}::jsonb, speakers),
      closing_hymn   = COALESCE(${toJson(updates.closingHymn)}::jsonb, closing_hymn),
      closing_prayer = COALESCE(${updates.closingPrayer ?? null}::varchar, closing_prayer)
    WHERE id = ${id}
    RETURNING id
  `;
    if (rows.length === 0) return null;
    return getMeetingById(id);
}

export async function deleteMeeting(id: number): Promise<boolean> {
    const rows = await sql`DELETE FROM meetings WHERE id = ${id} RETURNING id`;
    return rows.length > 0;
}
