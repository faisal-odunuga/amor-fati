import { LoginForm } from '@/components/book-club/login-form';

export function TenantLoginScreen({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <main className='min-h-screen bg-background px-6 py-16'>
      <div className='mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]'>
        <section className='flex min-h-[560px] flex-col justify-center border bg-secondary/20 p-10 sm:p-14'>
          <p className='text-xs font-bold uppercase tracking-[0.35em] text-primary'>{eyebrow}</p>
          <h1 className='mt-6 max-w-3xl font-serif text-5xl leading-tight text-foreground sm:text-6xl'>{title}</h1>
          <p className='mt-6 max-w-xl text-base leading-7 text-muted-foreground'>{description}</p>
          <div className='mt-10 h-px w-24 bg-primary/40' />
        </section>
        <div className='self-center'>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
