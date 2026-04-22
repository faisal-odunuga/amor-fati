-- Amor Fati HQ book club seed data
-- Run this after the base migration.
-- Assumes these auth users already exist:
--   admin@amorfati.com  -> admin
--   faisalodunuga5@gmail.com -> member
--
-- Upload a matching file to the `books` bucket at:
--   seed/the-10x-rule.pdf

begin;

-- Normalize the two test accounts for tenant testing.
update public.profiles
set
  full_name = 'Amor Fati Admin',
  role = 'admin',
  subscription_status = 'active'
where id = 'd0b7ce68-0845-46b5-96ba-c3f1c34178d6';

update public.profiles
set
  full_name = 'Faisal Odunuga',
  role = 'member',
  subscription_status = 'active'
where id = 'ecd8d066-f8c1-43d6-97b5-e82f1deab048';

-- Clear previous copies of this deterministic seed.
delete from public.daily_logs
where plan_id = '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401';

delete from public.testimonials
where plan_id = '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401';

delete from public.user_progress
where plan_id = '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401';

delete from public.schedule_items
where plan_id = '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401';

delete from public.reading_plans
where id = '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401';

delete from public.resources
where id in (
  '91f5cf49-7d4c-42c1-a54b-8990d8e65211',
  '9c8fd4d0-7f50-4f66-bd7d-f86133727761'
);

delete from public.books
where id = '4b17f4b6-3d8c-4c7b-987c-f5b9f4f34791';

insert into public.books (
  id,
  title,
  author,
  cover_url,
  pdf_url,
  description
)
values (
  '4b17f4b6-3d8c-4c7b-987c-f5b9f4f34791',
  'The 10X Rule',
  'Grant Cardone',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
  'seed/the-10x-rule.pdf',
  'An execution-focused reading cycle built around action bias, pressure tolerance, and consistency.'
);

insert into public.reading_plans (
  id,
  book_id,
  month_date,
  title,
  is_active
)
values (
  '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401',
  '4b17f4b6-3d8c-4c7b-987c-f5b9f4f34791',
  date '2026-04-01',
  'April Execution Cycle',
  true
);

insert into public.schedule_items (
  id,
  plan_id,
  date,
  day_index,
  label,
  description,
  type,
  weight
)
values
  ('83f4a746-cdb0-4024-9c56-7f5709d76901', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-01', 1, 'Read Chapters 1-2', 'Read, annotate, and define the first standard you will raise this month.', 'reading', 1.0),
  ('83f4a746-cdb0-4024-9c56-7f5709d76902', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-02', 2, 'Read Chapters 3-4', 'Extract one uncomfortable decision and tie it to a real deadline.', 'reading', 1.0),
  ('83f4a746-cdb0-4024-9c56-7f5709d76903', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-03', 3, 'Catch-up and tighten notes', 'Fridays are for recovery. Close unfinished reading and clean your notes.', 'catchup', 0.5),
  ('83f4a746-cdb0-4024-9c56-7f5709d76904', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-04', 4, 'Implementation Sprint 1', 'Convert the reading into one visible behavior shift before midnight.', 'implementation', 1.5),
  ('83f4a746-cdb0-4024-9c56-7f5709d76905', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-05', 5, 'Read Chapters 5-6', 'Document the cost of staying small and the action that breaks the pattern.', 'reading', 1.0),
  ('83f4a746-cdb0-4024-9c56-7f5709d76906', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-06', 6, 'Read Chapters 7-8', 'Identify where you are undercommitting and write the stronger version.', 'reading', 1.0),
  ('83f4a746-cdb0-4024-9c56-7f5709d76907', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-07', 7, 'Read Chapters 9-10', 'Capture the idea that most directly challenges your current ceiling.', 'reading', 1.0),
  ('83f4a746-cdb0-4024-9c56-7f5709d76908', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-08', 8, 'Live Integration Salon', 'Use the discussion room to articulate one execution commitment in public.', 'event', 0.75),
  ('83f4a746-cdb0-4024-9c56-7f5709d76909', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-09', 9, 'Read Chapters 11-12', 'Write the standard your week now demands from you.', 'reading', 1.0),
  ('83f4a746-cdb0-4024-9c56-7f5709d76910', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-10', 10, 'Catch-up and consolidate', 'Close loops before the final implementation block.', 'catchup', 0.5),
  ('83f4a746-cdb0-4024-9c56-7f5709d76911', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-11', 11, 'Implementation Sprint 2', 'Ship one decision, one deliverable, or one difficult conversation.', 'implementation', 1.5),
  ('83f4a746-cdb0-4024-9c56-7f5709d76912', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', date '2026-04-12', 12, 'Final Reflection', 'Summarize the transformation and lock the next standard.', 'reading', 1.0);

insert into public.resources (
  id,
  title,
  description,
  file_path,
  mime_type,
  is_members_only
)
values
  (
    '91f5cf49-7d4c-42c1-a54b-8990d8e65211',
    'The 10X Rule PDF',
    'Primary reading file delivered through signed URLs.',
    'seed/the-10x-rule.pdf',
    'application/pdf',
    true
  ),
  (
    '9c8fd4d0-7f50-4f66-bd7d-f86133727761',
    'April Implementation Worksheet',
    'Companion worksheet for implementation Saturdays.',
    'seed/april-implementation-worksheet.pdf',
    'application/pdf',
    true
  );

-- Insert logs for the member user. The trigger will refresh progress, streaks, and testimonials.
insert into public.daily_logs (
  profile_id,
  schedule_item_id,
  plan_id,
  nestuge_url,
  reflection_summary,
  key_insight,
  action_taken,
  created_at
)
values
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76901', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-01', 'Execution becomes easier when the decision is made before emotion enters the room.', 'Discipline beats motivation.', 'Blocked a fixed reading hour.', timestamptz '2026-04-01 20:00:00+00'),
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76902', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-02', 'Clarity improves when the standard is written down instead of kept in the head.', 'A plan removes negotiation.', 'Turned my target into a visible checklist.', timestamptz '2026-04-02 20:15:00+00'),
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76903', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-03', 'Catch-up days stop shame from compounding into avoidance.', 'Recovery is strategic.', 'Closed unfinished notes before sleeping.', timestamptz '2026-04-03 19:40:00+00'),
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76904', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-04', 'Implementation is where confidence stops being theory.', 'Action creates proof.', 'Published my deliverable before midnight.', timestamptz '2026-04-04 21:20:00+00'),
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76905', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-05', 'The cost of smallness becomes obvious when you name it directly.', 'Avoidance has a price.', 'Raised the target on my weekly KPI.', timestamptz '2026-04-05 20:05:00+00'),
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76906', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-06', 'Undercommitment looks rational until you compare it against your actual potential.', 'Most ceilings are self-negotiated.', 'Expanded the scope of my outreach sprint.', timestamptz '2026-04-06 20:10:00+00'),
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76907', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-07', 'The next identity is built by repeated evidence, not inspiration.', 'Identity follows repeated action.', 'Kept the reading streak through travel.', timestamptz '2026-04-07 22:00:00+00'),
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76908', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-08', 'Public commitment creates a higher standard than private intent.', 'Witnessed commitments carry weight.', 'Declared my next execution move in the group.', timestamptz '2026-04-08 21:45:00+00'),
  ('ecd8d066-f8c1-43d6-97b5-e82f1deab048', '83f4a746-cdb0-4024-9c56-7f5709d76909', '3c3c64f1-f6d8-42ae-b4d5-1cdfdf929401', 'https://nestuge.com/logs/april-09', 'Consistency gets easier when your standards are clearer than your moods.', 'Standards must outrank emotions.', 'Built a tighter daily review habit.', timestamptz '2026-04-09 20:25:00+00');

commit;
