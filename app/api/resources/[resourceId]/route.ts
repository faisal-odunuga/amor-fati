import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentProfile, getResources, hasSupabaseEnv } from '@/lib/book-club/queries';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  const { resourceId } = await params;
  const resource = (await getResources()).find((item) => item.id === resourceId);

  if (!resource) {
    return NextResponse.json({ error: 'Resource not found.' }, { status: 404 });
  }

  const profile = await getCurrentProfile();

  if (resource.isMembersOnly && profile.subscriptionStatus !== 'active' && profile.role !== 'admin') {
    return NextResponse.json({ error: 'Inactive members cannot access protected resources.' }, { status: 403 });
  }

  if (!hasSupabaseEnv()) {
    return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BOOKS_BUCKET ?? 'books')
    .createSignedUrl(resource.filePath, 60 * 60);

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Unable to sign resource.' }, { status: 400 });
  }

  return NextResponse.json({ signedUrl: data.signedUrl, expiresIn: 3600 });
}
