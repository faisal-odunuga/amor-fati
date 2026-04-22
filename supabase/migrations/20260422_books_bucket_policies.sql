insert into storage.buckets (id, name, public)
values ('books', 'books', false)
on conflict (id) do nothing;

drop policy if exists "admins upload books bucket objects" on storage.objects;
create policy "admins upload books bucket objects"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'books'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  )
);

drop policy if exists "admins update books bucket objects" on storage.objects;
create policy "admins update books bucket objects"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'books'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  )
)
with check (
  bucket_id = 'books'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  )
);

drop policy if exists "admins delete books bucket objects" on storage.objects;
create policy "admins delete books bucket objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'books'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  )
);

drop policy if exists "active members read books bucket objects" on storage.objects;
create policy "active members read books bucket objects"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'books'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and (role = 'admin' or subscription_status = 'active')
  )
);
