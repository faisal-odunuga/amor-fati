'use client';

import { LoaderCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useResourceUpload } from '@/hooks/use-resource-upload';

export function ResourceUploadForm() {
  const { isPending, submit } = useResourceUpload();

  return (
    <PlatformSection title='New Asset' eyebrow='Upload' icon={<Upload className='size-4 text-[#d9a517]' />}>
      <form
        action={submit}
        className='space-y-6'
      >
        <div className='grid gap-6 sm:grid-cols-2'>
          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Asset Title</span>
            <Input name='title' required className='h-12 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20' />
          </label>

          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>File Selection</span>
            <Input
              name='file'
              type='file'
              required
              accept='.pdf,.epub,.doc,.docx,.ppt,.pptx,.zip'
              className='h-12 rounded-none border-black/10 bg-[#faf7f1] file:mr-4 file:h-full file:rounded-none file:border-0 file:bg-black file:px-4 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:text-white hover:file:bg-black/80'
            />
          </label>
        </div>

        <label className='block'>
          <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Context / Description</span>
          <Textarea
            name='description'
            className='min-h-24 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20'
            placeholder='Provide context for members. What is this file for?'
          />
        </label>

        <div className='flex items-center gap-6'>
          <label className='flex cursor-pointer items-center gap-3 group'>
            <input
              type='checkbox'
              name='isMembersOnly'
              defaultChecked
              className='size-4 rounded-none border-black/20 accent-[#d9a517]'
            />
            <span className='text-[10px] font-bold uppercase tracking-widest text-black/60 group-hover:text-black'>Restrict to active members</span>
          </label>
        </div>

        <div className='pt-4'>
          <Button
            type='submit'
            disabled={isPending}
            className='h-12 w-full rounded-none bg-black px-8 font-bold uppercase tracking-widest text-white hover:bg-black/80 sm:w-auto'
          >
            {isPending ? <LoaderCircle className='size-4 animate-spin mr-2' /> : <Upload className='size-4 mr-2' />}
            Deploy Resource
          </Button>
        </div>
      </form>
    </PlatformSection>
  );
}
