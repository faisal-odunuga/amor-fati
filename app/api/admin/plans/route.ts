import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { hasSupabaseEnv } from '@/lib/book-club/queries';
import { savePlanSchema } from '@/lib/book-club/types';

export async function POST(request: Request) {
  try {
    const body = savePlanSchema.parse(await request.json());

    if (!hasSupabaseEnv()) {
      return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data: plan, error: planError } = await supabase
      .from('reading_plans')
      .insert({
        book_id: body.bookId ?? null,
        month_date: body.monthDate,
        title: body.title,
        is_active: true,
      })
      .select('id')
      .single();

    if (planError || !plan) {
      throw planError ?? new Error('Unable to create plan.');
    }

    const { error: itemError } = await supabase.from('schedule_items').insert(
      body.items.map((item) => ({
        plan_id: plan.id,
        date: item.date,
        day_index: item.dayIndex,
        label: item.label,
        description: item.description,
        type: item.type,
        weight: item.weight,
      }))
    );

    if (itemError) {
      throw itemError;
    }

    return NextResponse.json({ message: 'Plan saved.', planId: plan.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save plan.' },
      { status: 400 }
    );
  }
}
