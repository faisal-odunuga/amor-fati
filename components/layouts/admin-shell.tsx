import type React from 'react';
import { ADMIN_SIDENAV } from '@/lib/book-club/constants';
import { getCurrentProfile } from '@/lib/book-club/queries';
import { PlatformShell } from '@/components/layouts/platform-shell';

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile('admin');

  return (
    <PlatformShell
      title='Admin Control Room'
      eyebrow='Amor Fati Operations'
      profileName={profile.fullName}
      items={ADMIN_SIDENAV}
      accentLabel='Operator Access'
      homeHref='https://amorfatihq.com'
    >
      {children}
    </PlatformShell>
  );
}
