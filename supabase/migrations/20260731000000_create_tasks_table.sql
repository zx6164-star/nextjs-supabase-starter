create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  is_completed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

create policy "본인 할 일만 조회"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "본인 이름으로만 생성"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "본인 할 일만 수정"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "본인 할 일만 삭제"
  on public.tasks for delete
  using (auth.uid() = user_id);

create index if not exists tasks_user_id_created_at_idx
  on public.tasks (user_id, created_at desc);
