import { TenantLoginScreen } from '@/components/book-club/tenant-login-screen';

export default function BookClubLoginPage() {
  return (
    <TenantLoginScreen
      eyebrow='Book Club Access'
      title='Enter the member platform.'
      description='This login is for active members submitting daily proof, tracking weighted progress, and protecting their consistency streak.'
    />
  );
}
