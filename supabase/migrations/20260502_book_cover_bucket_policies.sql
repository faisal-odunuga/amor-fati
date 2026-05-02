insert into storage.buckets (id, name, public)
values ('book_cover', 'book_cover', false)
on conflict (id) do nothing;

drop policy if exists "admins upload book cover bucket objects" on storage.objects;
create policy "admins upload book cover bucket objects"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'book_cover'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  )
);

drop policy if exists "admins update book cover bucket objects" on storage.objects;
create policy "admins update book cover bucket objects"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'book_cover'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  )
)
with check (
  bucket_id = 'book_cover'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  )
);

drop policy if exists "admins delete book cover bucket objects" on storage.objects;
create policy "admins delete book cover bucket objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'book_cover'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  )
);

drop policy if exists "active members read book cover bucket objects" on storage.objects;
create policy "active members read book cover bucket objects"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'book_cover'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and (role = 'admin' or subscription_status = 'active')
  )
);
