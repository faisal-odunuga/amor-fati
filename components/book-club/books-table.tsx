'use client';

import { BookOpen, FileText, Image as ImageIcon } from 'lucide-react';
import type { Book } from '@/lib/book-club/types';
import { PlatformSection } from '@/components/ui/platform-section';

function BookRow({ book }: { book: Book }) {
  return (
    <article className='group flex flex-col gap-5 rounded-none border border-black/8 bg-[#faf7f1] p-5'>
      <div className='flex items-start gap-4'>
        <div className='flex size-11 shrink-0 items-center justify-center border border-black/10 bg-white text-[#d9a517]'>
          <BookOpen className='size-5' />
        </div>
        <div className='min-w-0 flex-1'>
          <h4 className='font-medium text-black'>{book.title}</h4>
          <p className='mt-1 text-sm text-black/55'>{book.author}</p>
          {book.description ? (
            <p className='mt-2 text-xs leading-relaxed text-black/55'>{book.description}</p>
          ) : null}
        </div>
      </div>

      <div className='grid gap-3 text-[10px] font-bold uppercase tracking-widest text-black/45 sm:grid-cols-2 lg:grid-cols-5'>
        <div className='rounded-none border border-black/8 bg-white px-3 py-3'>
          Reading Type
          <div className='mt-2 text-sm font-medium normal-case tracking-normal text-black'>
            {book.readingType ?? 'Not set'}
          </div>
        </div>
        <div className='rounded-none border border-black/8 bg-white px-3 py-3'>
          Total Pages
          <div className='mt-2 text-sm font-medium normal-case tracking-normal text-black'>
            {book.totalPages ?? 'Not set'}
          </div>
        </div>
        <div className='rounded-none border border-black/8 bg-white px-3 py-3'>
          Total Chapters
          <div className='mt-2 text-sm font-medium normal-case tracking-normal text-black'>
            {book.totalChapters ?? 'Not set'}
          </div>
        </div>
        <div className='rounded-none border border-black/8 bg-white px-3 py-3'>
          File
          <div className='mt-2 flex items-center gap-2 text-sm font-medium normal-case tracking-normal text-black'>
            <FileText className='size-4 text-[#d9a517]' />
            {book.pdfUrl ? 'Uploaded' : 'Missing'}
          </div>
        </div>
        <div className='rounded-none border border-black/8 bg-white px-3 py-3'>
          Cover
          <div className='mt-2 flex items-center gap-2 text-sm font-medium normal-case tracking-normal text-black'>
            <ImageIcon className='size-4 text-[#d9a517]' />
            {book.coverUrl ? 'Uploaded' : 'Missing'}
          </div>
        </div>
      </div>
    </article>
  );
}

export function BooksTable({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <PlatformSection title='Library' eyebrow='Books'>
        <div className='rounded-none border border-dashed border-black/10 p-12 text-center'>
          <p className='text-sm text-black/45'>No books have been uploaded yet.</p>
        </div>
      </PlatformSection>
    );
  }

  return (
    <PlatformSection title='Library' eyebrow='Books'>
      <div className='space-y-3'>
        {books.map((book) => (
          <BookRow key={book.id} book={book} />
        ))}
      </div>
    </PlatformSection>
  );
}
