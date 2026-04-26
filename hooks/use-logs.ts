'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { DailyLog } from '@/lib/book-club/types';

export function useLogs(profileId?: string) {
  return useQuery({
    queryKey: ['logs', profileId],
    queryFn: async (): Promise<DailyLog[]> => {
      const supabase = createClient();
      
      let queryProfileId = profileId;
      
      if (!queryProfileId) {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('Not authenticated');
        queryProfileId = user.id;
      }

      const { data, error } = await supabase
        .from('daily_logs')
        .select('id, profile_id, schedule_item_id, plan_id, nestuge_url, log_date, desc, created_at')
        .eq('profile_id', queryProfileId)
        .order('created_at', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return (data ?? []).map((log) => ({
        id: log.id,
        profileId: log.profile_id,
        scheduleItemId: log.schedule_item_id,
        planId: log.plan_id,
        nestugeUrl: log.nestuge_url,
        logDate: log.log_date,
        desc: log.desc,
        createdAt: log.created_at,
      }));
    },
  });
}
