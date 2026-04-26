import { TenantLoginScreen } from '@/components/book-club/tenant-login-screen';

export default function BookClubLoginPage() {
  return (
    <TenantLoginScreen redirectPath='/dashboard' />
  );
}
