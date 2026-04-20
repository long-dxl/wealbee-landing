create table if not exists stocks (
  symbol   text primary key,
  name     text not null,
  exchange text not null
);

alter table stocks enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'stocks' and policyname = 'Public read access'
  ) then
    create policy "Public read access" on stocks for select using (true);
  end if;
end $$;
