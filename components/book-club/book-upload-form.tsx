'use client';

import { LoaderCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlatformSection } from '@/components/ui/platform-section';
import { useBookUpload } from '@/hooks/use-book-upload';

export function BookUploadForm() {
  const { isPending, submit } = useBookUpload();

  return (
    <PlatformSection title='New Book' eyebrow='Library' icon={<Upload className='size-4 text-[#d9a517]' />}>
      <form action={submit} className='space-y-6'>
        <div className='grid gap-6 sm:grid-cols-2'>
          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Title</span>
            <Input name='title' required className='h-12 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20' />
          </label>

          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Author</span>
            <Input name='author' required className='h-12 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20' />
          </label>
        </div>

        <label className='block'>
          <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Description</span>
          <Textarea
            name='description'
            className='min-h-24 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20'
            placeholder='Brief context for the reading plan and what members should expect from the book.'
          />
        </label>

        <div className='grid gap-6 sm:grid-cols-3'>
          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Reading Type</span>
            <select
              name='readingType'
              required
              className='flex h-12 w-full rounded-none border border-black/10 bg-[#faf7f1] px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/20'
              defaultValue='pages'
            >
              <option value='pages'>Pages</option>
              <option value='chapter'>Chapters</option>
            </select>
          </label>

          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Total Pages</span>
            <Input name='totalPages' type='number' min='1' className='h-12 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20' />
          </label>

          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Total Chapters</span>
            <Input name='totalChapters' type='number' min='1' className='h-12 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20' />
          </label>
        </div>

        <div className='grid gap-6 sm:grid-cols-2'>
          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Book File</span>
            <Input
              name='bookFile'
              type='file'
              required
              accept='.pdf,.epub'
              className='h-12 rounded-none border-black/10 bg-[#faf7f1] file:mr-4 file:h-full file:rounded-none file:border-0 file:bg-black file:px-4 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:text-white hover:file:bg-black/80'
            />
          </label>

          <label className='block'>
            <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Book Cover</span>
            <Input
              name='coverFile'
              type='file'
              accept='.jpg,.jpeg,.png,.webp'
              className='h-12 rounded-none border-black/10 bg-[#faf7f1] file:mr-4 file:h-full file:rounded-none file:border-0 file:bg-black file:px-4 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:text-white hover:file:bg-black/80'
            />
          </label>
        </div>

        <p className='text-xs leading-5 text-black/55'>
          Accepted book files: PDF, EPUB up to 25 MB. Cover images: JPG, PNG, WEBP up to 3 MB.
        </p>

        <div className='pt-4'>
          <Button
            type='submit'
            disabled={isPending}
            className='h-12 w-full rounded-none bg-black px-8 font-bold uppercase tracking-widest text-white hover:bg-black/80 sm:w-auto'
          >
            {isPending ? <LoaderCircle className='mr-2 size-4 animate-spin' /> : <Upload className='mr-2 size-4' />}
            Upload Book
          </Button>
        </div>
      </form>
    </PlatformSection>
  );
}
