import { NextResponse } from 'next/server';
import { createScheduleDraftSchema } from '@/lib/book-club/types';
import { generateScheduleDraft } from '@/lib/book-club/ai';

export async function POST(request: Request) {
  try {
    const body = createScheduleDraftSchema.parse(await request.json());
    const items = await generateScheduleDraft(body);
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate schedule draft.' },
      { status: 400 }
    );
  }
}
