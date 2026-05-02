import { BookUploadForm } from '@/components/book-club/book-upload-form';
import { BooksTable } from '@/components/book-club/books-table';
import { AdminShell } from '@/components/layouts/admin-shell';
import { getAllBooks } from '@/lib/book-club/queries';

export default async function AdminBooksPage() {
  const books = await getAllBooks();

  return (
    <AdminShell>
      <div className='space-y-6'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Library</p>
          <h1 className='mt-3 font-serif text-5xl text-black'>Books</h1>
          <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
            Upload a reading file, attach an optional cover, and register the metadata used by the plan generator.
          </p>
        </div>
        <BookUploadForm />
        <BooksTable books={books} />
      </div>
    </AdminShell>
  );
}
