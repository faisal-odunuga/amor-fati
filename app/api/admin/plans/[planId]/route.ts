import { NextResponse } from 'next/server';
import { getAuthorizedContext } from '@/lib/book-club/server-access';
import { updatePlanSchema } from '@/lib/book-club/types';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;
    const auth = await getAuthorizedContext('admin');
    if ('response' in auth) return auth.response;

    const body = updatePlanSchema.parse(await request.json());

    const { count: logCount, error: logCountError } = await auth.supabase
      .from('daily_logs')
      .select('id', { count: 'exact', head: true })
      .eq('plan_id', planId);

    if (logCountError) {
      throw logCountError;
    }

    if ((logCount ?? 0) > 0) {
      return NextResponse.json(
        { error: 'Plans with submitted member logs cannot be restructured. Create a new plan instead.' },
        { status: 409 }
      );
    }

    const { error: planError } = await auth.supabase
      .from('reading_plans')
      .update({
        title: body.title,
        month_date: body.monthDate,
      })
      .eq('id', planId);

    if (planError) {
      throw planError;
    }

    const { error: deleteItemsError } = await auth.supabase
      .from('schedule_items')
      .delete()
      .eq('plan_id', planId);

    if (deleteItemsError) {
      throw deleteItemsError;
    }

    const { error: insertItemsError } = await auth.supabase.from('schedule_items').insert(
      body.items.map((item) => ({
        plan_id: planId,
        date: item.date,
        day_index: item.dayIndex,
        label: item.label,
        description: item.description,
        type: item.type,
        weight: item.weight,
      }))
    );

    if (insertItemsError) {
      throw insertItemsError;
    }

    return NextResponse.json({ message: 'Plan updated.' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update plan.' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;
    const auth = await getAuthorizedContext('admin');
    if ('response' in auth) return auth.response;

    const { error } = await auth.supabase.from('reading_plans').delete().eq('id', planId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Plan deleted.' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete plan.' },
      { status: 400 }
    );
  }
}
