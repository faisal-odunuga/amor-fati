'use client';

import { LoaderCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useResourceUpload } from '@/hooks/use-resource-upload';

export function ResourceUploadForm() {
  const { isPending, message, submit } = useResourceUpload();

  return (
    <form
      action={submit}
      className='border border-border bg-background p-6'
    >
      <div className='mb-6'>
        <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>Upload</p>
        <h3 className='mt-2 font-serif text-3xl text-foreground'>Add a protected resource</h3>
        <p className='mt-3 max-w-2xl text-sm leading-6 text-muted-foreground'>
          This uploads the file to the `books` bucket and registers a matching row in `resources`.
        </p>
      </div>

      <div className='grid gap-5 lg:grid-cols-2'>
        <label className='space-y-3'>
          <span className='text-sm uppercase tracking-[0.25em] text-black/45'>Title</span>
          <Input name='title' required className='h-12 rounded-none border-border bg-secondary/20' />
        </label>

        <label className='space-y-3'>
          <span className='text-sm uppercase tracking-[0.25em] text-black/45'>File</span>
          <Input
            name='file'
            type='file'
            required
            accept='.pdf,.epub,.doc,.docx,.ppt,.pptx,.zip'
            className='h-12 rounded-none border-border bg-secondary/20'
          />
        </label>
      </div>

      <label className='mt-5 block space-y-3'>
        <span className='text-sm uppercase tracking-[0.25em] text-black/45'>Description</span>
        <Textarea
          name='description'
          className='min-h-28 rounded-none border-border bg-secondary/20'
          placeholder='Short context for members and admins.'
        />
      </label>

      <label className='mt-5 flex items-center gap-3 text-sm text-muted-foreground'>
        <input
          type='checkbox'
          name='isMembersOnly'
          defaultChecked
          className='size-4 rounded border border-black/20'
        />
        Active members only
      </label>

      <div className='mt-8 flex flex-wrap items-center gap-4'>
        <Button
          type='submit'
          disabled={isPending}
          className='h-12 rounded-none bg-primary px-6 text-primary-foreground hover:bg-primary/90'
        >
          {isPending ? <LoaderCircle className='size-4 animate-spin' /> : <Upload className='size-4' />}
          Upload resource
        </Button>
        {message ? <p className='text-sm text-muted-foreground'>{message}</p> : null}
      </div>
    </form>
  );
}
