-- SpriteSwap backend schema
-- Run this once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null,
  tier text not null default 'Base',
  offer jsonb not null default '[]'::jsonb,
  want jsonb not null default '[]'::jsonb,
  note text not null default '',
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.trade_offers (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references auth.users(id) on delete cascade,
  from_username text not null,
  to_username text not null,
  offer jsonb not null default '[]'::jsonb,
  want jsonb not null default '[]'::jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  text text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists trades_created_idx on public.trades(created_at desc);
create index if not exists trades_status_idx on public.trades(status);
create index if not exists notifications_user_idx on public.notifications(user_id,created_at desc);

alter table public.trades enable row level security;
alter table public.trade_offers enable row level security;
alter table public.notifications enable row level security;

drop policy if exists "Anyone can read open trades" on public.trades;
create policy "Anyone can read open trades" on public.trades for select using (status='open');

drop policy if exists "Signed in users can post trades" on public.trades;
create policy "Signed in users can post trades" on public.trades for insert to authenticated with check (auth.uid()=user_id);

drop policy if exists "Users can update their trades" on public.trades;
create policy "Users can update their trades" on public.trades for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);

drop policy if exists "Users can delete their trades" on public.trades;
create policy "Users can delete their trades" on public.trades for delete to authenticated using (auth.uid()=user_id);

drop policy if exists "Signed in users can send offers" on public.trade_offers;
create policy "Signed in users can send offers" on public.trade_offers for insert to authenticated with check (auth.uid()=from_user_id);

drop policy if exists "Users can read their sent offers" on public.trade_offers;
create policy "Users can read their sent offers" on public.trade_offers for select to authenticated using (auth.uid()=from_user_id);

drop policy if exists "Users can read notifications" on public.notifications;
create policy "Users can read notifications" on public.notifications for select to authenticated using (auth.uid()=user_id);

drop policy if exists "Users can delete notifications" on public.notifications;
create policy "Users can delete notifications" on public.notifications for delete to authenticated using (auth.uid()=user_id);

drop policy if exists "Users can update notifications" on public.notifications;
create policy "Users can update notifications" on public.notifications for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);

-- Notifications sent by the client are intentionally limited to the authenticated user's own row.
-- For server-to-user notifications, use a trusted server/Edge Function rather than exposing a service-role key.

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  updated_at timestamptz not null default now()
);
create unique index if not exists profiles_username_lower_idx on public.profiles(lower(username));
alter table public.profiles enable row level security;
drop policy if exists "Anyone can read profiles" on public.profiles;
create policy "Anyone can read profiles" on public.profiles for select using (true);
drop policy if exists "Users can manage their profile" on public.profiles;
create policy "Users can manage their profile" on public.profiles for insert to authenticated with check (auth.uid()=user_id);
drop policy if exists "Users can update their profile" on public.profiles;
create policy "Users can update their profile" on public.profiles for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);

alter table public.trade_offers add column if not exists to_user_id uuid references auth.users(id) on delete cascade;

drop policy if exists "Users can read incoming offers" on public.trade_offers;
create policy "Users can read incoming offers" on public.trade_offers for select to authenticated using (auth.uid()=from_user_id or auth.uid()=to_user_id);

-- When an offer is sent, create a notification for the recipient automatically.
create or replace function public.notify_trade_offer() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if new.to_user_id is not null then
    insert into public.notifications(user_id,title,text,read)
    values(new.to_user_id,'New trade offer','' || new.from_username || ' sent you a SpriteSwap trade offer.',false);
  end if;
  return new;
end; $$;

drop trigger if exists trade_offer_notification on public.trade_offers;
create trigger trade_offer_notification after insert on public.trade_offers for each row execute function public.notify_trade_offer();
