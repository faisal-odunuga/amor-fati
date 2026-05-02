import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { getAuthorizedContext } from '@/lib/book-club/server-access';

const RESOURCE_SIZE_LIMIT = 25 * 1024 * 1024;

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

    if (file.size > RESOURCE_SIZE_LIMIT) {
      return NextResponse.json({ error: 'File must not exceed 25 MB.' }, { status: 400 });
    }

    const auth = await getAuthorizedContext('admin');
    if ('response' in auth) return auth.response;

    const bucket = process.env.SUPABASE_BOOKS_BUCKET ?? 'books';
    const filename = sanitizeFilename(file.name);
    const filePath = `admin-uploads/${randomUUID()}-${filename}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await auth.supabase.storage.from(bucket).upload(filePath, fileBuffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });

    if (uploadError) {
      throw uploadError;
    }

    const { error: insertError } = await auth.supabase.from('resources').insert({
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
