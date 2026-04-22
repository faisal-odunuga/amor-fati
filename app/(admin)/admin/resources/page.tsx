import { ResourceUploadForm } from '@/components/book-club/resource-upload-form';
import { ResourcesTable } from '@/components/book-club/resources-table';
import { AdminShell } from '@/components/layouts/admin-shell';
import { getResources } from '@/lib/book-club/queries';

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <AdminShell>
    <div className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Storage</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Member resources</h1>
      </div>
      <ResourceUploadForm />
      <ResourcesTable resources={resources} />
    </div>
    </AdminShell>
  );
}
