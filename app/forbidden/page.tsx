import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className='min-h-screen bg-[#faf7f1] flex items-center justify-center p-6'>
      <div className='max-w-md w-full text-center'>
        <div className='flex justify-center mb-8'>
          <div className='size-20 rounded-full bg-red-50 flex items-center justify-center'>
            <ShieldAlert className='size-10 text-red-600' />
          </div>
        </div>
        
        <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-red-600 mb-4'>
          Access Denied
        </p>
        
        <h1 className='font-serif text-4xl text-black mb-6'>
          Administrator Privileges Required
        </h1>
        
        <p className='text-sm text-black/65 leading-relaxed mb-10'>
          Your account does not have the necessary permissions to access this section. 
          The operator control room is restricted to authorized personnel only.
        </p>
        
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button
            asChild
            className='w-full sm:w-auto h-12 rounded-none bg-black px-8 font-bold uppercase tracking-widest text-white hover:bg-black/80'
          >
            <Link href='/'>Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
