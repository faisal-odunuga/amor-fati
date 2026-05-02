import { BooksLibrary } from '@/components/book-club/books-library';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import { getAllBooks } from '@/lib/book-club/queries';

export default async function MemberBooksPage() {
  const books = await getAllBooks();

  return (
    <BookClubShell>
      <div className='space-y-6'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Reading Access</p>
          <h1 className='mt-3 font-serif text-5xl text-black'>Books</h1>
          <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
            View and download the books used across the current and upcoming reading plans.
          </p>
        </div>
        <BooksLibrary books={books} />
      </div>
    </BookClubShell>
  );
}
