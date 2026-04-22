'use client';

import { LoaderCircle, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AdminPlanPreviewTable } from '@/components/book-club/admin-plan-preview-table';
import { usePlanGenerator } from '@/hooks/use-plan-generator';

export function AdminPlanGenerator() {
  const {
    items,
    title,
    isLoading,
    message,
    setTitle,
    generateDraft,
    saveDraft,
    updateItem,
    moveItem,
  } = usePlanGenerator();

  return (
    <div className='space-y-8'>
      <form
        action={generateDraft}
        className='border border-border bg-background p-8'
      >
        <div className='grid gap-6 lg:grid-cols-3'>
          <label className='space-y-3'>
            <span className='text-sm uppercase tracking-[0.25em] text-black/45'>Plan Title</span>
            <Input name='title' required className='h-12 rounded-none border-border bg-secondary/20' />
          </label>
          <label className='space-y-3'>
            <span className='text-sm uppercase tracking-[0.25em] text-black/45'>Start Date</span>
            <Input name='startDate' required type='date' className='h-12 rounded-none border-border bg-secondary/20' />
          </label>
          <label className='space-y-3'>
            <span className='text-sm uppercase tracking-[0.25em] text-black/45'>End Date</span>
            <Input name='endDate' required type='date' className='h-12 rounded-none border-border bg-secondary/20' />
          </label>
        </div>

        <label className='mt-6 block space-y-3'>
          <span className='text-sm uppercase tracking-[0.25em] text-black/45'>Chapters</span>
          <Textarea
            name='chapters'
            required
            className='min-h-52 rounded-none border-border bg-secondary/20'
            placeholder={'Chapter 1\nChapter 2\nChapter 3'}
          />
        </label>

        <div className='mt-8 flex flex-wrap items-center gap-4'>
          <Button
            type='submit'
            disabled={isLoading}
            className='h-12 rounded-none bg-primary px-6 text-primary-foreground hover:bg-primary/90'
          >
            {isLoading ? <LoaderCircle className='size-4 animate-spin' /> : <WandSparkles className='size-4' />}
            Generate AI Draft
          </Button>
          {message ? <p className='text-sm text-muted-foreground'>{message}</p> : null}
        </div>
      </form>

      <AdminPlanPreviewTable
        items={items}
        title={title}
        onTitleChange={setTitle}
        onSave={saveDraft}
        onItemUpdate={updateItem}
        onMoveItem={moveItem}
      />
    </div>
  );
}
