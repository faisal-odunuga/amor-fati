import { NextResponse } from 'next/server';
import { buildGeneratedTestimonial, getLastAction, getLastInsight } from '@/lib/book-club/testimonials';
import {
  getActiveReadingPlan,
  getCurrentProfile,
  getDailyLogs,
  getUserProgress,
  hasSupabaseEnv,
} from '@/lib/book-club/queries';
import { calculateWeightedProgressFromCompletedWeight } from '@/lib/book-club/progress';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const [profile, plan, progress, logs] = await Promise.all([
      getCurrentProfile(),
      getActiveReadingPlan(),
      getUserProgress(),
      getDailyLogs(),
    ]);

    const percentage = calculateWeightedProgressFromCompletedWeight(
      progress.totalWeightCompleted,
      plan.totalWeight
    );

    if (percentage < 70) {
      return NextResponse.json({ error: 'Threshold not reached.' }, { status: 400 });
    }

    const generatedText = buildGeneratedTestimonial({
      profile,
      plan,
      completedDays: progress.completedDays,
      keyInsight: getLastInsight(logs),
      actionTaken: getLastAction(logs),
    });

    if (!hasSupabaseEnv()) {
      return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        profile_id: profile.id,
        plan_id: plan.id,
        generated_text: generatedText,
        status: 'pending',
      })
      .select('id, status')
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ id: data.id, generatedText, status: data.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate testimonial.' },
      { status: 400 }
    );
  }
}
