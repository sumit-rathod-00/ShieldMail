-- Datasets
create table datasets (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_at timestamptz default now()
);

-- Model Registry
create table models (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    version text not null,
    metrics jsonb,
    status text default 'experimental'
);

-- Training Jobs
create table training_jobs (
    id uuid default uuid_generate_v4() primary key,
    dataset_id uuid references datasets(id),
    status text default 'QUEUED',
    start_time timestamptz,
    end_time timestamptz
);
