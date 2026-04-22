export const BOOKCLUB_INTERNAL_PREFIX = '/bookclub';
export const ADMIN_INTERNAL_PREFIX = '/admin';

export const MAIN_TENANT_HOSTS = new Set([
  'amorfatihq.com',
  'www.amorfatihq.com',
  'localhost:3000',
  '127.0.0.1:3000',
]);

export const BOOKCLUB_TENANT_HOSTS = new Set(['bookclub.amorfatihq.com']);
export const ADMIN_TENANT_HOSTS = new Set(['admin.amorfatihq.com']);

export type Tenant = 'main' | 'bookclub' | 'admin';
export type AppRole = 'admin' | 'member';

export function getTenantFromHostname(hostname: string): Tenant {
  if (hostname.startsWith('admin.')) {
    return 'admin';
  }

  if (hostname.startsWith('bookclub.')) {
    return 'bookclub';
  }

  return 'main';
}

export function isProtectedTenantPath(pathname: string) {
  return !pathname.startsWith('/auth') && pathname !== '/' && pathname !== '/login';
}
