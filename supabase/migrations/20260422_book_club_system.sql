create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type app_role as enum ('admin', 'member');
  end if;

  if not exists (select 1 from pg_type where typname = 'subscription_status') then
    create type subscription_status as enum ('active', 'inactive');
  end if;

  if not exists (select 1 from pg_type where typname = 'schedule_item_type') then
    create type schedule_item_type as enum ('reading', 'catchup', 'implementation', 'event');
  end if;

  if not exists (select 1 from pg_type where typname = 'testimonial_status') then
    create type testimonial_status as enum ('pending', 'approved', 'rejected');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role app_role not null default 'member',
  subscription_status subscription_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  cover_url text,
  pdf_url text,
  description text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reading_plans (
  id uuid primary key default gen_random_uuid(),
  book_id uuid references public.books(id) on delete set null,
  month_date date not null unique,
  title text not null,
  is_active boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.schedule_items (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.reading_plans(id) on delete cascade,
  date date not null,
  day_index integer not null,
  label text not null,
  description text not null,
  type schedule_item_type not null,
  weight numeric(5,2) not null default 1,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists schedule_items_plan_date_idx
  on public.schedule_items(plan_id, date);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  plan_id uuid not null references public.reading_plans(id) on delete cascade,
  completed_days integer not null default 0,
  total_weight_completed numeric(8,2) not null default 0,
  last_active_date date,
  unique(profile_id, plan_id)
);

create index if not exists user_progress_profile_idx
  on public.user_progress(profile_id);

create table if not exists public.daily_logs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  schedule_item_id uuid not null references public.schedule_items(id) on delete cascade,
  plan_id uuid not null references public.reading_plans(id) on delete cascade,
  nestuge_url text not null,
  reflection_summary text,
  key_insight text not null,
  action_taken text not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique(profile_id, schedule_item_id)
);

create table if not exists public.streaks (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_active_date date
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  plan_id uuid not null references public.reading_plans(id) on delete cascade,
  generated_text text not null,
  status testimonial_status not null default 'pending',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_path text not null,
  mime_type text not null,
  is_members_only boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  insert into public.streaks (profile_id)
  values (new.id)
  on conflict (profile_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin(uid uuid default auth.uid())
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = uid
      and role = 'admin'
  );
$$;

create or replace function public.refresh_member_progress()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_weight numeric(8,2);
  v_total_completed integer;
  v_total_weight numeric(8,2);
  v_last_date date;
  v_current_streak integer;
  v_longest_streak integer;
  v_total_plan_weight numeric(8,2);
  v_latest_insight text;
  v_latest_action text;
  v_profile_name text;
begin
  select weight into v_weight
  from public.schedule_items
  where id = new.schedule_item_id;

  select count(*), coalesce(sum(si.weight), 0), max(si.date)
    into v_total_completed, v_total_weight, v_last_date
  from public.daily_logs dl
  join public.schedule_items si on si.id = dl.schedule_item_id
  where dl.profile_id = new.profile_id
    and dl.plan_id = new.plan_id;

  insert into public.user_progress (
    profile_id,
    plan_id,
    completed_days,
    total_weight_completed,
    last_active_date
  )
  values (
    new.profile_id,
    new.plan_id,
    v_total_completed,
    v_total_weight,
    v_last_date
  )
  on conflict (profile_id, plan_id) do update
    set completed_days = excluded.completed_days,
        total_weight_completed = excluded.total_weight_completed,
        last_active_date = excluded.last_active_date;

  select
    case
      when last_active_date is null then 1
      when new.created_at::date - last_active_date <= 2 then current_streak + case when new.created_at::date = last_active_date then 0 else 1 end
      else 1
    end,
    greatest(longest_streak, case
      when last_active_date is null then 1
      when new.created_at::date - last_active_date <= 2 then current_streak + case when new.created_at::date = last_active_date then 0 else 1 end
      else 1
    end)
  into v_current_streak, v_longest_streak
  from public.streaks
  where profile_id = new.profile_id;

  insert into public.streaks (profile_id, current_streak, longest_streak, last_active_date)
  values (new.profile_id, 1, 1, new.created_at::date)
  on conflict (profile_id) do update
    set current_streak = coalesce(v_current_streak, 1),
        longest_streak = greatest(public.streaks.longest_streak, coalesce(v_longest_streak, 1)),
        last_active_date = new.created_at::date;

  select coalesce(sum(weight), 0)
    into v_total_plan_weight
  from public.schedule_items
  where plan_id = new.plan_id;

  if v_total_plan_weight > 0 and v_total_weight / v_total_plan_weight >= 0.70 then
    select full_name into v_profile_name
    from public.profiles
    where id = new.profile_id;

    select key_insight, action_taken
      into v_latest_insight, v_latest_action
    from public.daily_logs
    where profile_id = new.profile_id
      and plan_id = new.plan_id
    order by created_at desc
    limit 1;

    insert into public.testimonials (profile_id, plan_id, generated_text, status)
    select
      new.profile_id,
      new.plan_id,
      concat(
        coalesce(v_profile_name, 'A member'),
        ' completed ',
        v_total_completed,
        ' days of consistent reading. Key insight: ',
        coalesce(v_latest_insight, 'Discipline beats motivation.'),
        ' Applied: ',
        coalesce(v_latest_action, 'Built a daily execution habit.')
      ),
      'pending'
    where not exists (
      select 1
      from public.testimonials
      where profile_id = new.profile_id
        and plan_id = new.plan_id
    );
  end if;

  return new;
end;
$$;

drop trigger if exists on_daily_log_insert on public.daily_logs;
create trigger on_daily_log_insert
after insert on public.daily_logs
for each row execute procedure public.refresh_member_progress();

alter table public.profiles enable row level security;
alter table public.books enable row level security;
alter table public.reading_plans enable row level security;
alter table public.schedule_items enable row level security;
alter table public.user_progress enable row level security;
alter table public.daily_logs enable row level security;
alter table public.streaks enable row level security;
alter table public.testimonials enable row level security;
alter table public.resources enable row level security;

drop policy if exists "profiles self or admin select" on public.profiles;
create policy "profiles self or admin select"
on public.profiles
for select
using (auth.uid() = id or public.is_admin());

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles"
on public.profiles
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "members read books" on public.books;
create policy "members read books"
on public.books
for select
using (true);

drop policy if exists "admins manage books" on public.books;
create policy "admins manage books"
on public.books
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "members read plans" on public.reading_plans;
create policy "members read plans"
on public.reading_plans
for select
using (true);

drop policy if exists "admins manage plans" on public.reading_plans;
create policy "admins manage plans"
on public.reading_plans
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "members read schedule items" on public.schedule_items;
create policy "members read schedule items"
on public.schedule_items
for select
using (true);

drop policy if exists "admins manage schedule items" on public.schedule_items;
create policy "admins manage schedule items"
on public.schedule_items
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "members read own progress" on public.user_progress;
create policy "members read own progress"
on public.user_progress
for select
using (auth.uid() = profile_id or public.is_admin());

drop policy if exists "admins manage progress" on public.user_progress;
create policy "admins manage progress"
on public.user_progress
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "members manage own logs" on public.daily_logs;
create policy "members manage own logs"
on public.daily_logs
for all
using (auth.uid() = profile_id or public.is_admin())
with check (auth.uid() = profile_id or public.is_admin());

drop policy if exists "members read own streak" on public.streaks;
create policy "members read own streak"
on public.streaks
for select
using (auth.uid() = profile_id or public.is_admin());

drop policy if exists "admins manage streaks" on public.streaks;
create policy "admins manage streaks"
on public.streaks
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "members read own testimonials" on public.testimonials;
create policy "members read own testimonials"
on public.testimonials
for select
using (auth.uid() = profile_id or public.is_admin());

drop policy if exists "admins manage testimonials" on public.testimonials;
create policy "admins manage testimonials"
on public.testimonials
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "active members read resources" on public.resources;
create policy "active members read resources"
on public.resources
for select
using (
  public.is_admin()
  or exists (
    select 1 from public.profiles
    where id = auth.uid()
      and subscription_status = 'active'
  )
);

drop policy if exists "admins manage resources" on public.resources;
create policy "admins manage resources"
on public.resources
for all
using (public.is_admin())
with check (public.is_admin());
