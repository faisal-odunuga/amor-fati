'use client';

import { LoaderCircle, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AdminPlanPreviewTable } from '@/components/book-club/admin-plan-preview-table';
import { usePlanGenerator } from '@/hooks/use-plan-generator';
import type { Book } from '@/lib/book-club/types';
import { cn } from '@/utils';

export function AdminPlanGenerator({ books }: { books: Book[] }) {
  const {
    items,
    title,
    isLoading,
    isSaving,
    setTitle,
    generateDraft,
    saveDraft,
    updateItem,
  } = usePlanGenerator();

  const commonInputStyles = 'h-12 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20';
  const labelStyles = 'text-[10px] font-bold uppercase tracking-[0.25em] text-black/45 block mb-2.5';

  return (
    <div className='space-y-8'>
      <form
        action={generateDraft}
        className='border border-black/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.06)] rounded-xl sm:p-8'
      >
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          <label>
            <span className={labelStyles}>Plan Title</span>
            <Input name='title' required className={commonInputStyles} />
          </label>
          <label>
            <span className={labelStyles}>Start Date</span>
            <Input name='startDate' required type='date' className={commonInputStyles} />
          </label>
          <label>
            <span className={labelStyles}>End Date</span>
            <Input name='endDate' required type='date' className={commonInputStyles} />
          </label>
          <label>
            <span className={labelStyles}>Book</span>
            <select 
              name='bookId' 
              required 
              className={cn(commonInputStyles, 'flex w-full px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2')}
            >
              <option value=''>Select Book</option>
              {books.map(book => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </select>
          </label>
        </div>

        <div className='mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          <label>
            <span className={labelStyles}>Mode</span>
            <select 
              name='mode' 
              required 
              className={cn(commonInputStyles, 'flex w-full px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2')}
            >
              <option value='chapters'>Chapters</option>
              <option value='pages'>Pages</option>
            </select>
          </label>
          <label className='sm:col-span-2 lg:col-span-3'>
            <span className={labelStyles}>Input Data (Optional)</span>
            <Textarea
              name='input'
              className='min-h-[120px] rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20'
              placeholder={'Leave empty to auto-generate based on book chapters/pages.\n\nOr paste custom ranges:\nChapter 1\nChapter 2\n\nOr:\n1-20\n21-45'}
            />
          </label>
        </div>

        <div className='mt-8'>
          <Button
            type='submit'
            disabled={isLoading}
            className='h-12 w-full rounded-none bg-primary px-8 font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 sm:w-auto'
          >
            {isLoading ? <LoaderCircle className='size-4 animate-spin mr-2' /> : <WandSparkles className='size-4 mr-2' />}
            Generate Draft
          </Button>
        </div>
      </form>

      <AdminPlanPreviewTable
        items={items}
        title={title}
        isSaving={isSaving}
        onTitleChange={setTitle}
        onSave={saveDraft}
        onItemUpdate={updateItem}
      />
    </div>
  );
}
