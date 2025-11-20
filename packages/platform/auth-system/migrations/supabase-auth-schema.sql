-- NextAuth.js Database Schema for Supabase
-- This creates all tables needed for NextAuth to work

-- Enable UUID extension (if not already enabled)
create extension if not exists "uuid-ossp";

-- 1. Verification Tokens Table (for email verification)
create table if not exists verification_tokens (
  identifier text not null,
  token text unique not null,
  expires timestamp with time zone not null,
  primary key (identifier, token)
);

-- 2. Accounts Table (stores OAuth provider info)
create table if not exists accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  type text not null,
  provider text not null,
  provider_account_id text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint unique_provider_account unique(provider, provider_account_id)
);

-- 3. Sessions Table (stores user sessions)
create table if not exists sessions (
  id uuid primary key default uuid_generate_v4(),
  session_token text unique not null,
  user_id uuid not null,
  expires timestamp with time zone not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 4. Extend existing users table with auth fields
-- (Check if columns exist first to avoid errors)
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name='users' and column_name='email_verified') then
    alter table users add column email_verified timestamp with time zone;
  end if;

  if not exists (select 1 from information_schema.columns where table_name='users' and column_name='image') then
    alter table users add column image text;
  end if;
end $$;

-- 5. Add foreign key constraints
-- accounts -> users
alter table accounts
  drop constraint if exists accounts_user_id_fkey,
  add constraint accounts_user_id_fkey
  foreign key (user_id) references users(id) on delete cascade;

-- sessions -> users
alter table sessions
  drop constraint if exists sessions_user_id_fkey,
  add constraint sessions_user_id_fkey
  foreign key (user_id) references users(id) on delete cascade;

-- 6. Create indexes for better performance
create index if not exists accounts_user_id_idx on accounts(user_id);
create index if not exists sessions_user_id_idx on sessions(user_id);
create index if not exists sessions_session_token_idx on sessions(session_token);
create index if not exists users_email_idx on users(email);

-- 7. Enable Row Level Security (RLS)
alter table accounts enable row level security;
alter table sessions enable row level security;
alter table verification_tokens enable row level security;

-- 8. RLS Policies for accounts
create policy "Users can view own accounts"
  on accounts for select
  using (auth.uid() = user_id);

create policy "Service role can manage all accounts"
  on accounts for all
  using (auth.role() = 'service_role');

-- 9. RLS Policies for sessions
create policy "Users can view own sessions"
  on sessions for select
  using (auth.uid() = user_id);

create policy "Service role can manage all sessions"
  on sessions for all
  using (auth.role() = 'service_role');

-- 10. RLS Policies for verification_tokens
create policy "Service role can manage verification tokens"
  on verification_tokens for all
  using (auth.role() = 'service_role');

-- 11. Create updated_at trigger function (if doesn't exist)
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 12. Add updated_at triggers
drop trigger if exists update_accounts_updated_at on accounts;
create trigger update_accounts_updated_at
  before update on accounts
  for each row execute function update_updated_at_column();

drop trigger if exists update_sessions_updated_at on sessions;
create trigger update_sessions_updated_at
  before update on sessions
  for each row execute function update_updated_at_column();

-- Success message
do $$
begin
  raise notice 'NextAuth tables created successfully!';
  raise notice 'Tables: accounts, sessions, verification_tokens';
  raise notice 'RLS policies enabled';
end $$;
