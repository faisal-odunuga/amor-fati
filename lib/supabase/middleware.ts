import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

type UpdateSessionOptions = {
  rewritePath?: string;
  role?: 'admin' | 'member';
  loginPath?: string;
};

export async function updateSession(request: NextRequest, options: UpdateSessionOptions = {}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    if (options.rewritePath) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = options.rewritePath;
      return NextResponse.rewrite(rewriteUrl);
    }

    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options: cookieOptions }) =>
            supabaseResponse.cookies.set(name, value, cookieOptions)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = options.loginPath ?? '/login';
    return NextResponse.redirect(url);
  }

  if (options.role) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, subscription_status')
      .eq('id', user.id)
      .single();

    const validMember = profile?.role === 'member' && profile?.subscription_status === 'active';
    const validAdmin = profile?.role === 'admin';

    if ((options.role === 'member' && !validMember && !validAdmin) || (options.role === 'admin' && !validAdmin)) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if (options.rewritePath) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = options.rewritePath;
    const response = NextResponse.rewrite(rewriteUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) =>
      response.cookies.set(cookie.name, cookie.value, cookie)
    );
    return response;
  }

  return supabaseResponse;
}
