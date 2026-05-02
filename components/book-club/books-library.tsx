import { BookOpen, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlatformSection } from '@/components/ui/platform-section';
import type { Book } from '@/lib/book-club/types';

function getReadingTypeLabel(book: Book) {
  if (book.readingType === 'chapter') return 'Chapter-Based';
  if (book.readingType === 'pages') return 'Page-Based';
  return 'Book';
}

function BookCover({ book }: { book: Book }) {
  if (!book.coverUrl) {
    return (
      <div className='flex h-full min-h-[220px] items-center justify-center text-[#d9a517]'>
        <BookOpen className='size-10' />
      </div>
    );
  }

  return (
    <img
      src={`/api/books/${book.id}/access?asset=cover`}
      alt={`${book.title} cover`}
      className='h-full w-full object-cover'
    />
  );
}

function BookActions({ book }: { book: Book }) {
  if (!book.pdfUrl) {
    return <p className='text-sm text-black/50'>No reading file has been attached to this book yet.</p>;
  }

  return (
    <>
      <Button asChild className='h-11 rounded-none bg-black px-6 font-bold uppercase tracking-widest text-white hover:bg-black/80'>
        <a href={`/api/books/${book.id}/access?asset=book`} target='_blank' rel='noopener noreferrer'>
          <Eye className='mr-2 size-4' />
          View Book
        </a>
      </Button>
      <Button asChild variant='outline' className='h-11 rounded-none border-black/10 bg-white px-6 font-bold uppercase tracking-widest hover:border-[#d9a517] hover:text-[#d9a517]'>
        <a href={`/api/books/${book.id}/access?asset=book&download=1`}>
          <Download className='mr-2 size-4' />
          Download
        </a>
      </Button>
    </>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className='overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]'>
      <div className='grid min-h-[220px] md:grid-cols-[180px_1fr]'>
        <div className='border-b border-black/5 bg-[#f4efe6] md:border-b-0 md:border-r'>
          <BookCover book={book} />
        </div>

        <div className='p-6'>
          <p className='text-[10px] font-bold uppercase tracking-[0.28em] text-[#d9a517]'>{getReadingTypeLabel(book)}</p>
          <h3 className='mt-3 font-serif text-3xl text-black'>{book.title}</h3>
          <p className='mt-2 text-sm text-black/55'>{book.author}</p>
          {book.description ? (
            <p className='mt-4 text-sm leading-6 text-black/65'>{book.description}</p>
          ) : null}

          <div className='mt-5 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-widest text-black/45'>
            {book.totalPages ? (
              <div className='border border-black/10 bg-[#faf7f1] px-3 py-2'>Pages {book.totalPages}</div>
            ) : null}
            {book.totalChapters ? (
              <div className='border border-black/10 bg-[#faf7f1] px-3 py-2'>Chapters {book.totalChapters}</div>
            ) : null}
          </div>

          <div className='mt-6 flex flex-wrap gap-3'>
            <BookActions book={book} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function BooksLibrary({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <PlatformSection title='Books' eyebrow='Reading Access'>
        <div className='rounded-none border border-dashed border-black/10 p-12 text-center'>
          <p className='text-sm text-black/45'>No books are available yet.</p>
        </div>
      </PlatformSection>
    );
  }

  return (
    <PlatformSection title='Books' eyebrow='Reading Access'>
      <div className='grid gap-4 lg:grid-cols-2'>
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </PlatformSection>
  );
}
