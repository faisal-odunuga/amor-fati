import type React from 'react';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';

export default function MainSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
