import Link from "next/link";

export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <nav aria-label="Meetings section" className="mb-6 text-sm">
                <Link
                    href="/meetings"
                    className="text-forest underline underline-offset-2 hover:text-deep-forest"
                >
                    All meetings
                </Link>
            </nav>
            {children}
        </section>
    );
}