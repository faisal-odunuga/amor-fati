import { NextResponse } from 'next/server';
import { createScheduleDraftSchema } from '@/lib/book-club/types';
import { generateScheduleDraft } from '@/lib/book-club/ai';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createScheduleDraftSchema.parse(body);
    
    // Fetch book details for metadata fallback
    const supabase = await createClient();
    const { data: book } = await supabase
      .from('books')
      .select('total_pages, total_chapters')
      .eq('id', parsed.bookId)
      .single();

    const items = await generateScheduleDraft({
      ...parsed,
      totalPages: book?.total_pages,
      totalChapters: book?.total_chapters,
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Generation Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate schedule draft.' },
      { status: 400 }
    );
  }
}
