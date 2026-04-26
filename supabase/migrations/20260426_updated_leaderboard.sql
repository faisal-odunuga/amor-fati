-- Update leaderboard function to handle weighted progress and streaks correctly
-- Using the RPC with a LATERAL join ensures consistency and valid SQL execution
create or replace function public.get_leaderboard()
returns table (
  profile_id uuid,
  full_name text,
  completed_days int,
  total_weight numeric,
  current_streak int
)
language sql
as $$
  select 
    p.id as profile_id,
    p.full_name,
    coalesce(up.completed_days, 0) as completed_days,
    coalesce(up.total_weight_completed, 0) as total_weight,
    coalesce(s.current_streak, 0) as current_streak
  from profiles p
  left join user_progress up on up.profile_id = p.id
  cross join lateral calculate_user_streak(p.id) s
  where p.role = 'member'
  order by 
    up.total_weight_completed desc nulls last,
    current_streak desc nulls last
$$;
