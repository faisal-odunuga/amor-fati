alter table public.books
  add column if not exists total_pages integer,
  add column if not exists total_chapters integer,
  add column if not exists reading_type text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'books_reading_type_check'
  ) then
    alter table public.books
      add constraint books_reading_type_check
      check (reading_type is null or reading_type in ('chapter', 'pages'));
  end if;
end $$;
