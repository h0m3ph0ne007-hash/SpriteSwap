-- SpriteSwap backend schema
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  display_name text,
  role text not null default 'user' check (role in ('user','owner')),
  avatar_url text,
  background_url text,
  tag text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx
  on public.profiles(lower(username));

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  username text,
  offering jsonb not null default '[]'::jsonb,
  wants jsonb not null default '[]'::jsonb,
  note text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.trade_offers (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid references auth.users(id) on delete cascade,
  to_user_id uuid references auth.users(id) on delete cascade,
  trade_id uuid references public.trades(id) on delete cascade,
  offering jsonb not null default '[]'::jsonb,
  wants jsonb not null default '[]'::jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.trade_chat (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid references public.trades(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  username text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.trades enable row level security;
alter table public.trade_offers enable row level security;
alter table public.notifications enable row level security;
alter table public.trade_chat enable row level security;

-- Public profile/trade visibility.
drop policy if exists "profiles read" on public.profiles;
create policy "profiles read" on public.profiles for select using (true);

drop policy if exists "trades read" on public.trades;
create policy "trades read" on public.trades for select using (true);

drop policy if exists "chat read" on public.trade_chat;
create policy "chat read" on public.trade_chat for select using (true);

-- Users may create/update their own profile, but cannot promote themselves.
drop policy if exists "profile insert own" on public.profiles;
create policy "profile insert own" on public.profiles
for insert with check (auth.uid()=user_id and role='user');

drop policy if exists "profile update own" on public.profiles;
create policy "profile update own" on public.profiles
for update using (auth.uid()=user_id)
with check (auth.uid()=user_id and role=(select p.role from public.profiles p where p.user_id=auth.uid()));

create or replace function public.prevent_client_role_change()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if new.role is distinct from old.role and coalesce(auth.role(),'') <> 'service_role' then
    raise exception 'Only the server can change owner roles';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role
before update on public.profiles
for each row execute function public.prevent_client_role_change();

-- Trades/chat/offers/notifications.
drop policy if exists "trades insert own" on public.trades;
create policy "trades insert own" on public.trades
for insert with check (auth.uid()=user_id);

drop policy if exists "chat insert own" on public.trade_chat;
create policy "chat insert own" on public.trade_chat
for insert with check (auth.uid()=user_id);

drop policy if exists "offers read own" on public.trade_offers;
create policy "offers read own" on public.trade_offers
for select using (auth.uid()=from_user_id or auth.uid()=to_user_id);

drop policy if exists "offers insert own" on public.trade_offers;
create policy "offers insert own" on public.trade_offers
for insert with check (auth.uid()=from_user_id);

drop policy if exists "notifications own" on public.notifications;
create policy "notifications own" on public.notifications
for all using (auth.uid()=user_id) with check (auth.uid()=user_id);

-- Make CoolGuy_247 the owner after creating that account.
-- Run this once in Supabase SQL editor using your real owner account:
-- update public.profiles
-- set role='owner'
-- where lower(username)=lower('CoolGuy_247');
