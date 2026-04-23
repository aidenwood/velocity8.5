-- ============================================================
-- Dashboard Schema: profiles, projects, analytics, invoices
-- ============================================================

-- 1. Profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  company_name text,
  avatar_url text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

-- 2. Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  domain text,
  status text not null default 'active' check (status in ('active', 'completed', 'paused')),
  services jsonb default '[]'::jsonb,
  start_date date,
  created_at timestamptz not null default now()
);

-- 3. Analytics snapshots
create table if not exists public.analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  source text not null check (source in ('google_analytics', 'search_console', 'facebook', 'instagram', 'crm')),
  period_start date not null,
  period_end date not null,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 4. Invoices
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  stripe_invoice_id text,
  amount_cents integer not null default 0,
  status text not null default 'pending' check (status in ('paid', 'pending', 'overdue')),
  due_date date,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Indexes
-- ============================================================

create index if not exists idx_projects_client_id on public.projects(client_id);
create index if not exists idx_analytics_project_id on public.analytics_snapshots(project_id);
create index if not exists idx_analytics_source on public.analytics_snapshots(source);
create index if not exists idx_invoices_project_id on public.invoices(project_id);
create index if not exists idx_invoices_status on public.invoices(status);

-- ============================================================
-- Enable Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.analytics_snapshots enable row level security;
alter table public.invoices enable row level security;

-- ============================================================
-- RLS Policies
-- ============================================================

-- Helper: check if current user is admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Profiles --
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins can manage all profiles"
  on public.profiles for all
  using (public.is_admin());

-- Projects --
create policy "Clients can view own projects"
  on public.projects for select
  using (client_id = auth.uid());

create policy "Admins can manage all projects"
  on public.projects for all
  using (public.is_admin());

-- Analytics Snapshots --
create policy "Clients can view own analytics"
  on public.analytics_snapshots for select
  using (
    project_id in (
      select id from public.projects where client_id = auth.uid()
    )
  );

create policy "Admins can manage all analytics"
  on public.analytics_snapshots for all
  using (public.is_admin());

-- Invoices --
create policy "Clients can view own invoices"
  on public.invoices for select
  using (
    project_id in (
      select id from public.projects where client_id = auth.uid()
    )
  );

create policy "Admins can manage all invoices"
  on public.invoices for all
  using (public.is_admin());

-- ============================================================
-- Auto-create profile on signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$;

-- Drop if exists to make migration idempotent
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
