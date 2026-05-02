import { NextResponse } from 'next/server';
import { getAuthorizedContext } from '@/lib/book-club/server-access';
import { createDailyLogSchema } from '@/lib/book-club/types';

export async function POST(request: Request) {
  try {
    const body = createDailyLogSchema.parse(await request.json());
    const auth = await getAuthorizedContext('member');
    if ('response' in auth) return auth.response;

    // Derive log_date from the schedule item's date (never user input)
    const { data: scheduleItem, error: siError } = await auth.supabase
      .from('schedule_items')
      .select('date, plan_id')
      .eq('id', body.scheduleItemId)
      .single();

    if (siError || !scheduleItem) {
      return NextResponse.json({ error: 'Schedule item not found.' }, { status: 404 });
    }

    if (scheduleItem.plan_id !== body.planId) {
      return NextResponse.json(
        { error: 'Schedule item does not belong to the selected plan.' },
        { status: 400 }
      );
    }

    const { error } = await auth.supabase.from('daily_logs').insert({
      profile_id: auth.user.id,
      schedule_item_id: body.scheduleItemId,
      plan_id: body.planId,
      nestuge_url: body.nestugeUrl,
      log_date: scheduleItem.date,
      desc: body.desc,
    });

    if (error) {
      const duplicate = error.message.toLowerCase().includes('unique');
      return NextResponse.json(
        { error: duplicate ? 'You have already logged progress for this item.' : error.message },
        { status: duplicate ? 409 : 400 }
      );
    }

    return NextResponse.json({ message: 'Proof logged.' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create log.' },
      { status: 400 }
    );
  }
}
