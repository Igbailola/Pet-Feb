-- Petfeb: activity log + product availability (build step 3)
-- 1. Product availability: add in_stock setting separate from draft/published
-- 2. Activity log: record of changes for staff operations

-- ============================================================
-- 1. Product availability
-- ============================================================
alter table public.products
  add column in_stock boolean not null default true;

create index products_in_stock_idx on public.products (in_stock);

-- ============================================================
-- 2. Activity log
-- ============================================================
create table public.activity_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  section     public.admin_section not null,
  action      text not null, -- 'created', 'updated', 'deleted', 'published', 'unpublished', etc.
  entity_type text not null, -- 'product', 'accessory', 'product_image', 'blog_post', 'testimonial', 'site_content'
  entity_id   text,
  entity_name text not null, -- Never store sensitive content, only item name/title
  created_at  timestamptz not null default now()
);

create index activity_logs_user_idx on public.activity_logs (user_id, created_at desc);
create index activity_logs_section_idx on public.activity_logs (section, created_at desc);
create index activity_logs_created_at_idx on public.activity_logs (created_at desc);

-- Helper to check if a staff member holds all 6 admin sections
create or replace function public.has_all_sections() returns boolean
language sql stable security definer set search_path = public as $$
  select (
    select count(distinct ss.section)
    from public.staff_sections ss
    join public.profiles p on p.id = ss.user_id
    where ss.user_id = auth.uid() and p.is_staff
  ) = 6;
$$;

-- RLS: Enable security
alter table public.activity_logs enable row level security;

-- Visibility rule:
-- Staff with no sections see nothing.
-- A staff member who holds a section sees only their own entries.
-- A staff member who holds all six sections sees everyone's entries.
create policy activity_logs_select on public.activity_logs for select
  using (
    (exists (select 1 from public.my_sections()) and user_id = auth.uid())
    or public.has_all_sections()
  );

-- Staff can insert logs for sections they hold
create policy activity_logs_insert on public.activity_logs for insert
  with check (
    user_id = auth.uid()
    and public.has_section(section)
  );

-- Note: No UPDATE or DELETE policies are created.
-- Nobody can edit or delete activity log entries from the interface or API.
