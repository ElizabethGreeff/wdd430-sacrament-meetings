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
    {
        id: 6,
        date: "2026-11-01",
        meetingType: "testimony",
        presiding: "Bishop Smith",
        conducting: "Brother Jones",
        announcements: ["Fast Sunday – please remember the needy", "Ward choir practice Thursday at 7pm"],
        openingHymn: { number: 85, title: "How Firm a Foundation" },
        openingPrayer: "Sister Williams",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 146, title: "Gently Raise the Sacred Strain" },
        speakers: [],
        closingHymn: { number: 70, title: "Come, Thou Fount of Every Blessing" },
        closingPrayer: "Brother Davis",
    },
    {
        id: 7,
        date: "2026-11-08",
        meetingType: "regular",
        presiding: "Bishop Smith",
        conducting: "Sister Ramirez",
        announcements: ["Ward Christmas planning meeting next Sunday"],
        openingHymn: { number: 62, title: "Praise to the Lord, the Almighty" },
        openingPrayer: "Brother Clark",
        wardBusiness: [{ description: "Release and sustaining of Relief Society secretary" }],
        stakeBusiness: false,
        sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
        speakers: [
            { name: "Brother Thompson", topic: "Gratitude", type: "speaker" },
            { name: "Youth Choir", topic: "Count Your Many Blessings", type: "musical-number" },
            { name: "Sister Brown", topic: "Serving in the Church", type: "speaker" },
        ],
        closingHymn: { number: 219, title: "Because I Have Been Given Much" },
        closingPrayer: "Sister Patel",
    },
    {
        id: 8,
        date: "2026-11-15",
        meetingType: "regular",
        presiding: "Bishop Smith",
        conducting: "Brother Lee",
        openingHymn: { number: 2, title: "The Spirit of God" },
        openingPrayer: "Sister Nguyen",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 170, title: "God, Our Father, Hear Us Pray" },
        speakers: [
            { name: "Elder Jensen", topic: "Ministering", type: "speaker" },
            { name: "Sister Grant", topic: "Family History", type: "speaker" },
        ],
        closingHymn: { number: 220, title: "I'll Go Where You Want Me to Go" },
        closingPrayer: "Brother Kim",
    },
    {
        id: 9,
        date: "2026-11-22",
        meetingType: "general",
        presiding: "Bishop Smith",
        conducting: "Sister Alvarez",
        announcements: ["Watch the broadcast together; no ward speakers this week"],
        openingHymn: { number: 136, title: "I Know That My Redeemer Lives" },
        openingPrayer: "Brother Foster",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 146, title: "Gently Raise the Sacred Strain" },
        speakers: [],
        closingHymn: { number: 85, title: "How Firm a Foundation" },
        closingPrayer: "Sister Brooks",
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
    const sunday = new Date();
    sunday.setDate(sunday.getDate() - sunday.getDay());

    const yyyy = sunday.getFullYear();
    const mm = String(sunday.getMonth() + 1).padStart(2, "0");
    const dd = String(sunday.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}