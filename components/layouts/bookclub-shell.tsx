import type React from 'react';
import { BOOKCLUB_SIDENAV } from '@/lib/book-club/constants';
import { getCurrentProfile } from '@/lib/book-club/queries';
import { PlatformShell } from '@/components/layouts/platform-shell';

export async function BookClubShell({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile('member');

  return (
    <PlatformShell
      title='Member Platform'
      eyebrow='Amor Fati Book Club'
      profileName={profile.fullName}
      items={BOOKCLUB_SIDENAV}
      accentLabel='Proof of Transformation'
      homeHref='https://amorfatihq.com'
    >
      {children}
    </PlatformShell>
  );
}
