-- Run this once in Supabase SQL Editor before running the import script

create table if not exists stocks (
  symbol   text primary key,
  name     text not null,
  exchange text not null
);

-- Allow anonymous read (for autocomplete in frontend)
alter table stocks enable row level security;

create policy "Public read access"
  on stocks for select
  using (true);
