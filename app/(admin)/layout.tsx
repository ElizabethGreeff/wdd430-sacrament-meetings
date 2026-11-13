// Authentication will be scaffolded here in Week 05.
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section aria-label="Leader tools" className="border-l-4 border-bark pl-4">
            {children}
        </section>
    );
}