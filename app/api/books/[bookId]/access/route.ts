import { NextResponse } from 'next/server';
import { getAuthorizedContext } from '@/lib/book-club/server-access';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  const { searchParams } = new URL(request.url);
  const asset = searchParams.get('asset') ?? 'book';
  const shouldDownload = searchParams.get('download') === '1';

  if (asset !== 'book' && asset !== 'cover') {
    return NextResponse.json({ error: 'Invalid asset requested.' }, { status: 400 });
  }

  const auth = await getAuthorizedContext('member');
  if ('response' in auth) return auth.response;

  const { data: book, error: bookError } = await auth.supabase
    .from('books')
    .select('id, title, pdf_url, cover_url')
    .eq('id', bookId)
    .single();

  if (bookError || !book) {
    return NextResponse.json({ error: 'Book not found.' }, { status: 404 });
  }

  const filePath = asset === 'cover' ? book.cover_url : book.pdf_url;

  if (!filePath) {
    return NextResponse.json({ error: `${asset === 'cover' ? 'Cover' : 'Book file'} not available.` }, { status: 404 });
  }

  const bucket = asset === 'cover'
    ? process.env.SUPABASE_BOOK_COVER_BUCKET ?? 'book_cover'
    : process.env.SUPABASE_BOOKS_BUCKET ?? 'books';

  const filename = filePath.split('/').pop() ?? `${book.title}.${asset === 'cover' ? 'jpg' : 'pdf'}`;

  const { data, error } = await auth.supabase.storage
    .from(bucket)
    .createSignedUrl(
      filePath,
      60 * 60,
      shouldDownload ? { download: filename } : undefined
    );

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Unable to sign book asset.' }, { status: 400 });
  }

  return NextResponse.redirect(data.signedUrl);
}
