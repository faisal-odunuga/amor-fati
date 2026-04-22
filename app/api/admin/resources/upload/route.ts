import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { createClient } from '@/lib/supabase/server';
import { hasSupabaseEnv } from '@/lib/book-club/queries';

function sanitizeFilename(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/-+/g, '-');
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = String(formData.get('title') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const isMembersOnly = formData.get('isMembersOnly') === 'on';
    const file = formData.get('file');

    if (!title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 });
    }

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

    const bucket = process.env.SUPABASE_BOOKS_BUCKET ?? 'books';
    const filename = sanitizeFilename(file.name);
    const filePath = `admin-uploads/${randomUUID()}-${filename}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, fileBuffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });

    if (uploadError) {
      throw uploadError;
    }

    const { error: insertError } = await supabase.from('resources').insert({
      title,
      description,
      file_path: filePath,
      mime_type: file.type || 'application/octet-stream',
      is_members_only: isMembersOnly,
    });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ message: 'Resource uploaded and registered.' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed.' },
      { status: 400 }
    );
  }
}
