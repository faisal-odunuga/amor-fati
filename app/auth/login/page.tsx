import { TenantLoginScreen } from '@/components/book-club/tenant-login-screen';

export default function LoginPage() {
  return (
    <TenantLoginScreen
      eyebrow='Amor Fati HQ'
      title='Choose the right doorway for the work you are here to do.'
      description='The member and admin experiences run on separate subdomains, but both authenticate through Supabase Auth and role-based access control.'
    />
  );
}
