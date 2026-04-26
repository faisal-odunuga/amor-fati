import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { hasSupabaseEnv } from '@/lib/book-club/queries';
import { createDailyLogSchema } from '@/lib/book-club/types';

export async function POST(request: Request) {
  try {
    const body = createDailyLogSchema.parse(await request.json());

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

    // Derive log_date from the schedule item's date (never user input)
    const { data: scheduleItem, error: siError } = await supabase
      .from('schedule_items')
      .select('date')
      .eq('id', body.scheduleItemId)
      .single();

    if (siError || !scheduleItem) {
      return NextResponse.json(
        { error: 'Schedule item not found.' },
        { status: 404 }
      );
    }

    const { error, data } = await supabase.from('daily_logs').insert({
      profile_id: user.id,
      schedule_item_id: body.scheduleItemId,
      plan_id: body.planId,
      nestuge_url: body.nestugeUrl,
      log_date: scheduleItem.date,
      desc: body.desc,
    });

    if (error) {
      console.log(error, data);
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
