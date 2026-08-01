import { useState } from 'react';
import { Users, HeartHandshake, CalendarDays, Database, Wrench } from 'lucide-react';
import { MEMBERS, GIVING, ATTENDANCE } from './data/big-data';
import { EVENTS, REGISTRATIONS } from './data/events';
import { DataGenerator } from './DataGenerator/DataGenerator';
import {
  SAMPLE_MEMBERS,
  SEAT_CONSUMING_STATUSES,
  type EventRegistration,
  type HymnalEvent,
} from './data/sample-data';

/**
 * Nate's workbench.
 *
 * This page proves your setup works and gives you a home for each task:
 * build a component in its own folder (e.g. src/DataTable/), import it here,
 * and render it inside the matching section below.
 */

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

/** Tiny taste of Task 3's math — replace this whole section with your real component. */
function seatsTaken(event: HymnalEvent, regs: EventRegistration[]): number {
  return regs
    .filter((r) => r.event_id === event.id)
    .filter((r) => (SEAT_CONSUMING_STATUSES as readonly string[]).includes(r.status))
    .reduce((sum, r) => sum + r.num_attendees, 0);
}

export default function App() {
  const [showEvents, setShowEvents] = useState(false);
  const firstEvent = EVENTS[0];

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-gray-50 px-4 py-10">
      <header className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Wrench className="h-6 w-6 text-indigo-600" /> Hymnal Components — workbench
        </h1>
        <p className="mt-1 text-gray-600">
          If you can read this and the numbers below aren&apos;t zero, your setup is done. 🎉
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={<Users className="h-4 w-4" />} label="Members" value={MEMBERS.length.toLocaleString()} />
        <StatCard icon={<HeartHandshake className="h-4 w-4" />} label="Gifts" value={GIVING.length.toLocaleString()} />
        <StatCard icon={<Database className="h-4 w-4" />} label="Attendance" value={ATTENDANCE.length.toLocaleString()} />
        <StatCard icon={<CalendarDays className="h-4 w-4" />} label="Events" value={EVENTS.length.toLocaleString()} />
      </section>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="font-semibold text-gray-900">Sanity check: the data really loaded</h2>
        <p className="mt-1 text-sm text-gray-600">
          First member: {SAMPLE_MEMBERS[0].first_name} {SAMPLE_MEMBERS[0].last_name} ·{' '}
          {firstEvent.title} has {seatsTaken(firstEvent, REGISTRATIONS)} seats taken
          {firstEvent.max_attendees ? ` of ${firstEvent.max_attendees}` : ' (unlimited)'}
        </p>
        <button
          onClick={() => setShowEvents((s) => !s)}
          className="mt-3 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {showEvents ? 'Hide' : 'Show'} all 24 events
        </button>
        {showEvents && (
          <ul className="mt-3 divide-y divide-gray-100 text-sm">
            {EVENTS.map((e) => (
              <li key={e.id} className="flex justify-between py-1.5">
                <span className="text-gray-800">{e.title}</span>
                <span className="text-gray-500">
                  {seatsTaken(e, REGISTRATIONS)}
                  {e.max_attendees ? ` / ${e.max_attendees}` : ' / ∞'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center text-gray-500">
        <DataGenerator />
      </section>
    </div>
  );
}
