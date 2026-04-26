import { AdminPlanGenerator } from '@/components/book-club/admin-plan-generator';
import { AdminShell } from '@/components/layouts/admin-shell';
import { getAllBooks } from '@/lib/book-club/queries';

export default async function AdminPlansPage() {
  const books = await getAllBooks();

  return (
    <AdminShell>
    <div className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Monthly Plan Creator</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Generate, review, then save</h1>
        <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
          AI only drafts the schedule. The preview grid is the control layer. Nothing writes to the database until an admin approves it.
        </p>
      </div>
      <AdminPlanGenerator books={books} />
    </div>
    </AdminShell>
  );
}
