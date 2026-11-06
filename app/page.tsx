import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        Sacrament Meeting Planner
      </h1>
      <p className="text-slate-600 max-w-xl mx-auto mb-8">
        View and print meeting agendas for the Sunrise Ward. Leaders can review
        past programs and prepare for upcoming Sundays.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/meetings"
          className="bg-[#606c38] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#582f0e] transition-colors"
        >
          View All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="bg-[#333d29] border border-slate-300 text-white px-6 py-3 rounded-lg font-medium hover:bg-[#582f0e] transition-colors"
        >
          This Sunday's Program
        </Link>
      </div>
    </div>
  );
}
