import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getTenantFromHostname } from '@/lib/tenant';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const tenant = getTenantFromHostname(host);

  if (tenant === 'bookclub') {
    return {
      name: 'Amor Fati Book Club',
      short_name: 'Amor Fati',
      description: 'A premium reading system for transformation.',
      start_url: '/',
      display: 'standalone',
      background_color: '#faf7f1',
      theme_color: '#d9a517',
      icons: [
        {
          src: '/logo.png',
          sizes: 'any',
          type: 'image/png',
        },
      ],
    };
  }

  return {
    name: 'Amor Fati HQ',
    short_name: 'Amor Fati',
    start_url: '/',
    display: 'browser',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
