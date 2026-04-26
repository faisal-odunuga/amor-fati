import { TenantLoginScreen } from '@/components/book-club/tenant-login-screen';

export default function AdminLoginPage() {
  return (
    <TenantLoginScreen
      eyebrow='Admin Access'
      title='Enter the control room.'
      description='This login is for operators managing plans, analytics, resources, and pending transformation proof across the platform.'
      redirectPath='/dashboard'
      requiredRole='admin'
    />
  );
}
