import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-05-03",
        meetingType: "regular",
        presiding: "Bishop Smith",
        conducting: "Brother Jones",
        announcements: ["Ward temple night: May 10", "Youth activity this Friday"],
        openingHymn: { number: 2, title: "The Spirit of God" },
        openingPrayer: "Sister Williams",
        wardBusiness: [{ description: "Sustaining of new Primary president" }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
            { name: "Youth Choir", topic: "Come, Follow Me", type: "musical-number" },
            { name: "Brother Thompson", topic: "The Power of Prayer", type: "speaker" },
        ],
        closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
        closingPrayer: "Brother Davis",
    },
    {
        id: 2,
        date: "2026-05-10",
        meetingType: "testimony",
        presiding: "Bishop Smith",
        conducting: "Sister Ramirez",
        announcements: ["Fast Sunday – please remember the needy"],
        openingHymn: { number: 113, title: "Our Savior's Love" },
        openingPrayer: "Brother Clark",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 193, title: "I Stand All Amazed" },
        speakers: [],
        closingHymn: { number: 86, title: "How Great Thou Art" },
        closingPrayer: "Sister Patel",
    },
    {
        id: 3,
        date: "2026-05-17",
        meetingType: "regular",
        presiding: "Bishop Smith",
        conducting: "Brother Lee",
        announcements: ["Stake conference next month"],
        openingHymn: { number: 5, title: "High on the Mountain Top" },
        openingPrayer: "Sister Nguyen",
        wardBusiness: [
            { description: "Callings to be sustained" },
            { description: "Announcement of new Young Women presidency" },
        ],
        stakeBusiness: true,
        sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
        speakers: [
            { name: "Elder Jensen", topic: "Ministering", type: "speaker" },
            { name: "Primary Children", topic: "I Am a Child of God", type: "musical-number" },
        ],
        closingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
        closingPrayer: "Brother Kim",
    },
    {
        id: 4,
        date: "2026-05-24",
        meetingType: "regular",
        presiding: "Bishop Smith",
        conducting: "Sister Alvarez",
        openingHymn: { number: 227, title: "There Is Sunshine in My Soul Today" },
        openingPrayer: "Brother Foster",
        wardBusiness: [{ description: "Temple recommend interviews available" }],
        stakeBusiness: false,
        sacramentHymn: { number: 194, title: "There Is a Green Hill Far Away" },
        speakers: [
            { name: "Sister Grant", topic: "The Atonement", type: "speaker" },
            { name: "Brother Hale", topic: "Serving Others", type: "speaker" },
        ],
        closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
        closingPrayer: "Sister Brooks",
    },
    {
        id: 5,
        date: "2026-05-31",
        meetingType: "stake",
        presiding: "Stake President Miller",
        conducting: "Bishop Smith",
        announcements: ["Stake leadership training this Saturday"],
        openingHymn: { number: 3, title: "Now Let Us Rejoice" },
        openingPrayer: "Sister Evans",
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
        speakers: [
            { name: "Stake President Miller", topic: "Unity in the Stake", type: "speaker" },
            { name: "Sister Reed", topic: "Family History", type: "speaker" },
        ],
        closingHymn: { number: 7, title: "Israel, Israel, God Is Calling" },
        closingPrayer: "Brother Ortiz",
    },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) {
        return meetings.filter((m) => m.date === date);
    }
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find((m) => m.id === id) ?? null;
}

export function getMostRecentSunday(): string {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);
    return sunday.toISOString().split("T")[0];
}