import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-deep-forest mb-4">
        Sacrament Meeting Planner
      </h1>
      <p className="text-bark max-w-xl mx-auto mb-8">
        View and print meeting agendas for the Sunrise Ward. Leaders can review
        past programs and prepare for upcoming Sundays.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/meetings"
          className="bg-forest text-parchment px-6 py-3 rounded-lg font-medium hover:bg-deep-forest transition-colors"
        >
          View All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="bg-bark text-parchment px-6 py-3 rounded-lg font-medium hover:bg-deep-bark transition-colors"
        >
          {"This Sunday's Program"}
        </Link>
      </div>
    </div>
  );
}