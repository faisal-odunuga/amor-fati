import { LoginForm } from '@/components/book-club/login-form';

type TenantLoginScreenProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  redirectPath?: string;
  requiredRole?: 'member' | 'admin';
};

export function TenantLoginScreen({ eyebrow, title, description, redirectPath, requiredRole }: TenantLoginScreenProps) {
  return (
    <main className='min-h-screen bg-[#faf7f1] px-6 py-16 flex items-center justify-center relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute -top-24 -right-24 size-96 rounded-full bg-[#d9a517]/5 blur-3xl' />
      <div className='absolute -bottom-24 -left-24 size-96 rounded-full bg-black/5 blur-3xl' />
      
      <div className='relative z-10 w-full max-w-[1000px] grid lg:grid-cols-2 gap-12 items-center'>
        <div className='hidden lg:block'>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517] mb-6'>{eyebrow || 'Amor Fati'}</p>
          <h2 className='font-serif text-5xl text-black leading-tight'>{title || 'Mastery of the mind starts here.'}</h2>
          <p className='mt-6 text-sm text-black/65 leading-relaxed max-w-sm'>
            {description || 'Enter your private credentials to access the internal ecosystem of Amor Fati.'}
          </p>
        </div>
        
        <div className='w-full max-w-md mx-auto'>
          <LoginForm redirectPath={redirectPath} requiredRole={requiredRole} />
        </div>
      </div>
    </main>
  );
}
