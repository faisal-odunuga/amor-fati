import { NextResponse } from 'next/server';
import { getAuthorizedContext } from '@/lib/book-club/server-access';
import { savePlanSchema } from '@/lib/book-club/types';

export async function POST(request: Request) {
  try {
    const body = savePlanSchema.parse(await request.json());
    const auth = await getAuthorizedContext('admin');
    if ('response' in auth) return auth.response;

    const { data: plan, error: planError } = await auth.supabase
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

    const { error: itemError } = await auth.supabase.from('schedule_items').insert(
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
