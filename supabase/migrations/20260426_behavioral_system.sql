-- =============================================================
-- Amor Fati · Behavioral System Migration
-- Run this in Supabase SQL Editor
-- =============================================================

-- 1. Unique constraint: 1 log per user per schedule item per day
-- (safe: will skip if it already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'daily_logs_profile_item_date_uq'
  ) THEN
    ALTER TABLE daily_logs
      ADD CONSTRAINT daily_logs_profile_item_date_uq
      UNIQUE (profile_id, schedule_item_id, log_date);
  END IF;
END$$;


-- 2. RPC: calculate_user_streak
-- Returns { current_streak, longest_streak, last_active_date }
-- Calculates based on consecutive distinct log_dates.
CREATE OR REPLACE FUNCTION calculate_user_streak(p_profile_id uuid)
RETURNS TABLE (
  current_streak  int,
  longest_streak  int,
  last_active_date date
)
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  _current   int := 0;
  _longest   int := 0;
  _prev_date date;
  _last_date date;
  _row       record;
BEGIN
  FOR _row IN
    SELECT DISTINCT log_date
    FROM daily_logs
    WHERE profile_id = p_profile_id
    ORDER BY log_date DESC
  LOOP
    IF _prev_date IS NULL THEN
      -- First row (most recent date)
      _last_date := _row.log_date;

      -- Only start counting if the streak is still "alive" (today or yesterday)
      IF _row.log_date >= CURRENT_DATE - INTERVAL '1 day' THEN
        _current := 1;
      ELSE
        _current := 0;
      END IF;

      _prev_date := _row.log_date;
      CONTINUE;
    END IF;

    -- If the previous date is exactly 1 day after this one, streak continues
    IF _prev_date - _row.log_date = 1 THEN
      IF _current > 0 THEN
        _current := _current + 1;
      END IF;
    ELSE
      -- Gap found — stop extending current streak
      IF _current > _longest THEN
        _longest := _current;
      END IF;
      -- We can't extend current streak any further
      -- but we keep scanning for longest
      _current := GREATEST(_current, 0);
      -- reset for longest calculation (we already captured current)
      -- exit early for current, but we need to keep going for longest
    END IF;

    _prev_date := _row.log_date;
  END LOOP;

  -- Final comparison
  IF _current > _longest THEN
    _longest := _current;
  END IF;

  RETURN QUERY SELECT _current, _longest, _last_date;
END;
$$;


-- 3. RPC: get_leaderboard
-- Returns ranked members by weighted score (sum of schedule_item weights
-- from completed logs) combined with streak bonus.
CREATE OR REPLACE FUNCTION get_leaderboard()
RETURNS TABLE (
  profile_id       uuid,
  full_name        text,
  score            numeric,
  current_streak   int,
  completed_weight numeric
)
LANGUAGE sql STABLE
AS $$
  WITH log_weights AS (
    SELECT
      dl.profile_id,
      COALESCE(SUM(si.weight), 0) AS completed_weight
    FROM daily_logs dl
    JOIN schedule_items si ON si.id = dl.schedule_item_id
    GROUP BY dl.profile_id
  ),
  streaks AS (
    SELECT
      (calculate_user_streak(lw.profile_id)).current_streak  AS current_streak,
      lw.profile_id
    FROM log_weights lw
  )
  SELECT
    lw.profile_id,
    COALESCE(p.full_name, p.email) AS full_name,
    -- Score formula: completed_weight + (streak bonus * 10)
    (lw.completed_weight + COALESCE(s.current_streak, 0) * 10)::numeric AS score,
    COALESCE(s.current_streak, 0) AS current_streak,
    lw.completed_weight
  FROM log_weights lw
  JOIN profiles p ON p.id = lw.profile_id
  LEFT JOIN streaks s ON s.profile_id = lw.profile_id
  ORDER BY score DESC
  LIMIT 50;
$$;
