import { AdminPlanGenerator } from '@/components/book-club/admin-plan-generator';
import { AdminPlansManager } from '@/components/book-club/admin-plans-manager';
import { AdminShell } from '@/components/layouts/admin-shell';
import { getAllBooks, getAllReadingPlansForAdmin } from '@/lib/book-club/queries';

export default async function AdminPlansPage() {
  const [books, plans] = await Promise.all([getAllBooks(), getAllReadingPlansForAdmin()]);

  return (
    <AdminShell>
    <div className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Reading Plan Creator</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Generate, review, then save</h1>
        <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
          The generator spreads the book across weekday reading slots, reserves Saturday for catch-up, and Sunday for implementation/documentation. Plans can span beyond a single month. Nothing writes to the database until an admin saves it.
        </p>
      </div>
      <AdminPlanGenerator books={books} />
      <div className='pt-4'>
        <div className='mb-6'>
          <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Saved Plans</p>
          <h2 className='mt-3 font-serif text-4xl text-black'>Edit or delete existing plans</h2>
          <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
            Saved plans stay editable here. Updating a plan replaces its scheduled items. Deleting a plan removes the plan and every dependent record tied to it.
          </p>
        </div>
        <AdminPlansManager initialPlans={plans} />
      </div>
    </div>
    </AdminShell>
  );
}
