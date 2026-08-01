/**
 * sample-data.ts — SYNTHETIC data for building Hymnal components.
 *
 * ⚠️ Everything here is 100% MADE UP. No real people, no real churches.
 * When your component is integrated into Hymnal it will receive real
 * (access-controlled) data of the same SHAPE — so build against these types
 * and your work drops in cleanly.
 *
 * These field names match Hymnal's actual data model and CSV importer.
 * The event types below were updated (July 2026) to match Hymnal's real
 * Event interface exactly (`start_date`, `status`, etc.).
 *
 * WHAT'S IN THIS FOLDER:
 *   sample-data.ts   ← you are here: types + constants + small starter arrays
 *   big-data.ts      ← 250 members / 5,319 gifts / 5,665 attendance rows (typed)
 *   events.ts        ← 24 events + 147 registrations (typed)
 * And in the USB's /data folder (raw files, for the importer-related tasks):
 *   members.csv, giving.csv, attendance.csv  ← same data as big-data.ts
 *   messy-import.csv                          ← 300 rows with seeded problems
 *   MESSY_CSV_MANIFEST.md                     ← the answer key for those problems
 */

// ---------------------------------------------------------------------------
// Core types (match Hymnal's shapes)
// ---------------------------------------------------------------------------

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  membership_status: 'active' | 'inactive' | 'visitor';
  member_since: string; // ISO date 'YYYY-MM-DD'
}

export interface GivingRecord {
  id: string;
  member_id: string | null; // null = anonymous gift
  donor_name: string;       // denormalized for display
  amount: number;           // dollars, e.g. 50.0
  date: string;             // ISO date 'YYYY-MM-DD'
  fund_name: string;
  method: string;           // 'cash' | 'check' | 'online' | 'other'
}

export interface AttendanceRecord {
  id: string;
  member_id: string | null;
  attendee_name: string;
  service_name: string;
  service_date: string; // ISO date 'YYYY-MM-DD'
}

export interface ImportBatch {
  batch_id: string;
  data_type: 'giving' | 'members' | 'attendance';
  imported_at: string; // ISO datetime
  row_count: number;
  filename: string;
}

// ---------------------------------------------------------------------------
// Event types — these match Hymnal's REAL Event interface field-for-field
// (the fields your component doesn't need are omitted; the ones present are
// named exactly as in the app, so integration is a drop-in).
// ---------------------------------------------------------------------------

export interface HymnalEvent {
  id: string;
  title: string;
  event_type: string;            // 'service' | 'meeting' | 'fellowship' | 'outreach' | 'youth' | ...
  start_date: string;            // ISO datetime 'YYYY-MM-DDTHH:MM:SS'
  end_date: string | null;
  all_day: boolean;
  location: string | null;
  max_attendees: number | null;  // null OR 0 = unlimited
  registration_required: boolean;
  cost: number;
  status: 'scheduled' | 'cancelled' | 'completed';
}

export interface EventRegistration {
  id: string;
  event_id: string;
  member_id: string | null;      // set when the registrant is a member…
  guest_name: string | null;     // …or this is set when they're a guest
  attendee_name: string;         // display name, always present (derived from whichever of the two above applies)
  num_attendees: number;         // PARTY SIZE — one registration can bring N people (>= 1)
  status: 'registered' | 'confirmed' | 'cancelled' | 'attended' | 'waitlisted';
}

/** Only these statuses actually take up seats. 'waitlisted' and 'cancelled' do NOT. */
export const SEAT_CONSUMING_STATUSES = ['registered', 'confirmed', 'attended'] as const;

// ---------------------------------------------------------------------------
// The importer's CSV column headers (what "Other / Generic CSV" expects).
// Used by the Data Generator and CSV Preview tasks.
// ---------------------------------------------------------------------------

export const CSV_HEADERS = {
  members: ['first_name', 'last_name', 'email', 'phone', 'city', 'state', 'membership_status', 'member_since'],
  giving: ['donor_full_name', 'donor_email', 'amount', 'date', 'fund_name', 'payment_method'],
  attendance: ['attendee_full_name', 'attendee_email', 'service_date', 'service_name'],
} as const;

export const FUNDS = ['General Fund', 'Building Fund', 'Missions Fund', 'Youth Ministry', 'Benevolence'];
export const SERVICES = ['Sunday Morning', 'Sunday Evening', 'Wednesday Night'];

// ---------------------------------------------------------------------------
// Small starter arrays — handy while you're wiring a component up for the
// first time. Switch to big-data.ts / events.ts once it renders.
// ---------------------------------------------------------------------------

export const SAMPLE_MEMBERS: Member[] = [
  { id: 'm1',  first_name: 'Sarah',   last_name: 'Johnson',   email: 'sarah.johnson@example.com', phone: '330-555-0142', city: 'Kent',    state: 'OH', membership_status: 'active',   member_since: '2019-03-12' },
  { id: 'm2',  first_name: 'Michael', last_name: 'Chen',      email: 'mchen@example.com',         phone: '330-555-0188', city: 'Kent',    state: 'OH', membership_status: 'active',   member_since: '2021-08-01' },
  { id: 'm3',  first_name: 'Emily',   last_name: 'Rodriguez', email: 'emily.r@example.com',       phone: null,           city: 'Stow',    state: 'OH', membership_status: 'active',   member_since: '2018-01-20' },
  { id: 'm4',  first_name: 'David',   last_name: 'Thompson',  email: 'dthompson@example.com',     phone: '330-555-0201', city: 'Ravenna', state: 'OH', membership_status: 'active',   member_since: '2022-11-05' },
  { id: 'm5',  first_name: 'Jessica', last_name: 'Williams',  email: 'jwilliams@example.com',     phone: '330-555-0177', city: 'Kent',    state: 'OH', membership_status: 'inactive', member_since: '2017-06-30' },
  { id: 'm6',  first_name: 'James',   last_name: 'Brown',     email: null,                        phone: '330-555-0163', city: 'Stow',    state: 'OH', membership_status: 'active',   member_since: '2020-02-14' },
  { id: 'm7',  first_name: 'Ashley',  last_name: 'Davis',     email: 'ashley.davis@example.com',  phone: '330-555-0199', city: 'Kent',    state: 'OH', membership_status: 'visitor',  member_since: '2026-05-18' },
  { id: 'm8',  first_name: 'Robert',  last_name: 'Miller',    email: 'rmiller@example.com',       phone: '330-555-0155', city: 'Ravenna', state: 'OH', membership_status: 'active',   member_since: '2016-09-11' },
];

export const SAMPLE_GIVING: GivingRecord[] = [
  { id: 'g1', member_id: 'm1', donor_name: 'Sarah Johnson',   amount: 150.0,  date: '2026-06-07', fund_name: 'General Fund',   method: 'online' },
  { id: 'g2', member_id: 'm2', donor_name: 'Michael Chen',    amount: 75.0,   date: '2026-06-07', fund_name: 'General Fund',   method: 'check'  },
  { id: 'g3', member_id: 'm3', donor_name: 'Emily Rodriguez', amount: 500.0,  date: '2026-06-07', fund_name: 'Building Fund',  method: 'online' },
  { id: 'g4', member_id: 'm4', donor_name: 'David Thompson',  amount: 40.0,   date: '2026-06-14', fund_name: 'General Fund',   method: 'cash'   },
  { id: 'g5', member_id: 'm8', donor_name: 'Robert Miller',   amount: 1000.0, date: '2026-06-14', fund_name: 'Missions Fund',  method: 'check'  },
  { id: 'g6', member_id: null, donor_name: 'Anonymous',       amount: 20.0,   date: '2026-06-21', fund_name: 'General Fund',   method: 'cash'   },
];

export const SAMPLE_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', member_id: 'm1', attendee_name: 'Sarah Johnson',   service_name: 'Sunday Morning',  service_date: '2026-06-07' },
  { id: 'a2', member_id: 'm2', attendee_name: 'Michael Chen',    service_name: 'Sunday Morning',  service_date: '2026-06-07' },
  { id: 'a3', member_id: 'm9', attendee_name: 'Amanda Garcia',   service_name: 'Wednesday Night', service_date: '2026-06-17' },
  { id: 'a4', member_id: 'm8', attendee_name: 'Robert Miller',   service_name: 'Sunday Morning',  service_date: '2026-06-21' },
];

export const SAMPLE_IMPORT_BATCHES: ImportBatch[] = [
  { batch_id: 'CSV Import - Other - 2026-06-28 14:22:01 UTC (a1b2c3d4)', data_type: 'giving',     imported_at: '2026-06-28T14:22:01Z', row_count: 68,  filename: 'june-giving.csv' },
  { batch_id: 'CSV Import - Other - 2026-06-15 09:10:44 UTC (e5f6a7b8)', data_type: 'members',    imported_at: '2026-06-15T09:10:44Z', row_count: 25,  filename: 'new-members.csv' },
  { batch_id: 'CSV Import - Other - 2026-06-01 16:05:12 UTC (c9d0e1f2)', data_type: 'attendance', imported_at: '2026-06-01T16:05:12Z', row_count: 142, filename: 'may-attendance.csv' },
];
