import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import {
  ADMIN_INTERNAL_PREFIX,
  BOOKCLUB_INTERNAL_PREFIX,
  BOOKCLUB_TENANT_HOSTS,
  MAIN_TENANT_HOSTS,
  ADMIN_TENANT_HOSTS,
  getTenantFromHostname,
  isProtectedTenantPath,
} from '@/lib/tenant';

function rewriteToTenantPrefix(request: NextRequest, prefix: string) {
  const url = request.nextUrl.clone();
  url.pathname = `${prefix}${request.nextUrl.pathname}`;
  return NextResponse.rewrite(url);
}

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const tenant = getTenantFromHostname(hostname);
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/forbidden' ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  if (
    tenant === 'bookclub' &&
    !pathname.startsWith(BOOKCLUB_INTERNAL_PREFIX) &&
    !pathname.startsWith(ADMIN_INTERNAL_PREFIX)
  ) {
    if (isProtectedTenantPath(pathname)) {
      return updateSession(request, {
        rewritePath: `${BOOKCLUB_INTERNAL_PREFIX}${pathname}`,
        role: 'member',
        loginPath: '/login',
      });
    }

    return rewriteToTenantPrefix(request, BOOKCLUB_INTERNAL_PREFIX);
  }

  if (
    tenant === 'admin' &&
    !pathname.startsWith(ADMIN_INTERNAL_PREFIX) &&
    !pathname.startsWith(BOOKCLUB_INTERNAL_PREFIX)
  ) {
    return updateSession(request, {
      rewritePath: `${ADMIN_INTERNAL_PREFIX}${pathname}`,
      role: 'admin',
      loginPath: '/login',
    });
  }

  if (
    tenant === 'main' &&
    (pathname.startsWith(BOOKCLUB_INTERNAL_PREFIX) || pathname.startsWith(ADMIN_INTERNAL_PREFIX))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    BOOKCLUB_TENANT_HOSTS.has(hostname) ||
    ADMIN_TENANT_HOSTS.has(hostname) ||
    MAIN_TENANT_HOSTS.has(hostname)
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
