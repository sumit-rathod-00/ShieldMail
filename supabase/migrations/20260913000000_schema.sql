-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text default 'user' check (role in ('user', 'researcher', 'admin')),
  created_at timestamptz default now()
);

-- Predictions table
create table predictions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  type text check (type in ('email', 'url')),
  input_data jsonb not null,
  result jsonb not null,
  created_at timestamptz default now()
);

-- Feedback table
create table prediction_feedback (
  id uuid default uuid_generate_v4() primary key,
  prediction_id uuid references predictions(id),
  correct boolean not null,
  comment text,
  created_at timestamptz default now()
);
