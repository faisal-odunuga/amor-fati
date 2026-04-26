import type React from 'react';
import { getCurrentProfile } from '@/lib/book-club/queries';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
