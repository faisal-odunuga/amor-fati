import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { hasSupabaseEnv } from '@/lib/book-club/query-core';

type RoleRequirement = 'admin' | 'member';

export async function getAuthorizedContext(requiredRole: RoleRequirement = 'member') {
  if (!hasSupabaseEnv()) {
    return {
      response: NextResponse.json(
        { error: 'Supabase environment variables are missing.' },
        { status: 500 }
      ),
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, role, subscription_status')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    return {
      response: NextResponse.json({ error: 'Profile not found.' }, { status: 403 }),
    };
  }

  if (requiredRole === 'admin' && profile.role !== 'admin') {
    return {
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    };
  }

  if (requiredRole === 'member' && profile.role !== 'admin' && profile.subscription_status !== 'active') {
    return {
      response: NextResponse.json({ error: 'Inactive members cannot access this action.' }, { status: 403 }),
    };
  }

  return { supabase, user, profile };
}
