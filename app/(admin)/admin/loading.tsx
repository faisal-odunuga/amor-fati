import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center text-center'>
      <div className='relative'>
        <div className='size-16 rounded-full border border-black/5 flex items-center justify-center bg-[#faf7f1]'>
          <LoaderCircle className='size-8 animate-spin text-[#d9a517]' strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
