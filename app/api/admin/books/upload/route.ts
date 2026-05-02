import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { getAuthorizedContext } from '@/lib/book-club/server-access';

const COVER_SIZE_LIMIT = 3 * 1024 * 1024;
const BOOK_SIZE_LIMIT = 25 * 1024 * 1024;
const BOOK_MIME_TYPES = new Set(['application/pdf', 'application/epub+zip']);
const COVER_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function sanitizeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-');
}

function parseOptionalPositiveInt(value: FormDataEntryValue | null) {
  const normalized = String(value ?? '').trim();
  if (!normalized) return null;

  const parsed = Number(normalized);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error('Page and chapter totals must be positive whole numbers.');
  }

  return parsed;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = String(formData.get('title') || '').trim();
    const author = String(formData.get('author') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const readingType = String(formData.get('readingType') || '').trim();
    const totalPages = parseOptionalPositiveInt(formData.get('totalPages'));
    const totalChapters = parseOptionalPositiveInt(formData.get('totalChapters'));
    const bookFile = formData.get('bookFile');
    const coverFile = formData.get('coverFile');

    if (!title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    if (!author) {
      return NextResponse.json({ error: 'Author is required.' }, { status: 400 });
    }

    if (readingType !== 'pages' && readingType !== 'chapter') {
      return NextResponse.json(
        { error: 'Reading type must be pages or chapter.' },
        { status: 400 },
      );
    }

    if (readingType === 'pages' && !totalPages) {
      return NextResponse.json(
        { error: 'Total pages is required for page-based books.' },
        { status: 400 },
      );
    }

    if (readingType === 'chapter' && !totalChapters) {
      return NextResponse.json(
        { error: 'Total chapters is required for chapter-based books.' },
        { status: 400 },
      );
    }

    if (!(bookFile instanceof File)) {
      return NextResponse.json({ error: 'Book file is required.' }, { status: 400 });
    }

    if (!BOOK_MIME_TYPES.has(bookFile.type)) {
      return NextResponse.json({ error: 'Book file must be a PDF or EPUB.' }, { status: 400 });
    }

    if (bookFile.size > BOOK_SIZE_LIMIT) {
      return NextResponse.json({ error: 'Book file must not exceed 25 MB.' }, { status: 400 });
    }

    if (coverFile instanceof File) {
      if (!COVER_MIME_TYPES.has(coverFile.type)) {
        return NextResponse.json(
          { error: 'Cover file must be JPG, PNG, or WEBP.' },
          { status: 400 },
        );
      }

      if (coverFile.size > COVER_SIZE_LIMIT) {
        return NextResponse.json({ error: 'Cover file must not exceed 3 MB.' }, { status: 400 });
      }
    }

    const auth = await getAuthorizedContext('admin');
    if ('response' in auth) return auth.response;

    const bucket = process.env.SUPABASE_BOOKS_BUCKET ?? 'books';
    const coverBucket = process.env.SUPABASE_BOOK_COVER_BUCKET ?? 'book_cover';
    const bookPath = `${randomUUID()}-${sanitizeFilename(bookFile.name)}`;
    const bookBuffer = Buffer.from(await bookFile.arrayBuffer());

    const { error: bookUploadError } = await auth.supabase.storage
      .from(bucket)
      .upload(bookPath, bookBuffer, {
        contentType: bookFile.type,
        upsert: false,
      });

    if (bookUploadError) {
      throw bookUploadError;
    }

    let coverPath: string | null = null;

    if (coverFile instanceof File && coverFile.size > 0) {
      coverPath = `${randomUUID()}-${sanitizeFilename(coverFile.name)}`;
      const coverBuffer = Buffer.from(await coverFile.arrayBuffer());
      const { error: coverUploadError } = await auth.supabase.storage
        .from(coverBucket)
        .upload(coverPath, coverBuffer, {
          contentType: coverFile.type,
          upsert: false,
        });

      if (coverUploadError) {
        throw coverUploadError;
      }
    }

    const { error: insertError } = await auth.supabase.from('books').insert({
      title,
      author,
      description: description || null,
      pdf_url: bookPath,
      cover_url: coverPath,
      total_pages: totalPages,
      total_chapters: totalChapters,
      reading_type: readingType,
    });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ message: 'Book uploaded and registered.' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Book upload failed.' },
      { status: 400 },
    );
  }
}
