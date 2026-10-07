-- Petfeb: data model + admin sections (build step 1)
-- Scope: products, product images, accessories, testimonials, blog posts,
-- users (profiles), verification submissions, admin section permissions.
-- No eligibility rules are stored here. Verification stores decision + reason only.

-- ============================================================
-- Enums
-- ============================================================
create type public.publish_status      as enum ('draft', 'published');
create type public.testimonial_status  as enum ('published', 'hidden');
create type public.verification_status as enum ('not_started', 'pending', 'verified', 'rejected');
create type public.verification_decision as enum ('pending', 'approved', 'rejected');

-- One value per admin section. Add a value here to add a section later.
create type public.admin_section as enum (
  'cms',            -- CMS and site content
  'blog',           -- Blog
  'products',       -- Products
  'verifications',  -- Client verifications
  'testimonials',   -- Testimonials
  'other_updates'   -- Orders, Buy Small plans, installers, projects
);

-- ============================================================
-- Shared helpers
-- ============================================================
create function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ============================================================
-- Users: profiles (one row per auth user; customers and staff)
-- ============================================================
create table public.profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,
  email               text not null unique,
  full_name           text,
  phone               text,
  is_staff            boolean not null default false,
  verification_status public.verification_status not null default 'not_started',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Staff sections: a staff user may hold zero, one or many.
create table public.staff_sections (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  section    public.admin_section not null,
  granted_by uuid references public.profiles (id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, section)
);

-- True when the signed-in user is staff AND holds the given section.
-- security definer so policies can call it without exposing staff_sections.
create function public.has_section(s public.admin_section) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.staff_sections ss
    join public.profiles p on p.id = ss.user_id
    where ss.user_id = auth.uid() and ss.section = s and p.is_staff
  );
$$;

-- Sections of the signed-in user (used by the app to build navigation).
create function public.my_sections() returns setof public.admin_section
language sql stable security definer set search_path = public as $$
  select ss.section
  from public.staff_sections ss
  join public.profiles p on p.id = ss.user_id
  where ss.user_id = auth.uid() and p.is_staff;
$$;

-- Only the service role (auth.uid() is null) may change is_staff or grant sections.
-- Users may edit their own contact details but never their own verification status.
create function public.guard_profile_update() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null then
    -- the verification sync trigger sets this flag (transaction-local) to mirror decisions
    if current_setting('petfeb.verification_sync', true) = 'on' then
      return new;
    end if;
    if new.is_staff is distinct from old.is_staff then
      raise exception 'is_staff can only be changed by the service role';
    end if;
    if new.verification_status is distinct from old.verification_status
       and not public.has_section('verifications') then
      raise exception 'verification_status can only be changed by the verifications section';
    end if;
  end if;
  return new;
end $$;
create trigger profiles_guard before update on public.profiles
  for each row execute function public.guard_profile_update();

-- ============================================================
-- Products
-- ============================================================
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text,
  price       numeric(12,2) not null check (price >= 0),   -- NGN
  category    text not null,
  status      public.publish_status not null default 'draft',
  specs       jsonb not null default '{}'::jsonb,           -- flexible key/value specs
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index products_status_idx on public.products (status);
create trigger products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

create table public.product_images (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  url        text not null,
  alt_text   text,
  sort_order integer not null default 0,
  is_main    boolean not null default false,
  created_at timestamptz not null default now()
);
create index product_images_product_idx on public.product_images (product_id, sort_order);
-- At most one main image per product.
create unique index product_images_one_main on public.product_images (product_id) where is_main;

-- Accessories: a product can have many; an accessory can fit many products.
create table public.accessories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(12,2) not null check (price >= 0),
  image_url   text,
  status      public.publish_status not null default 'draft',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger accessories_updated_at before update on public.accessories
  for each row execute function public.set_updated_at();

create table public.product_accessories (
  product_id   uuid not null references public.products (id) on delete cascade,
  accessory_id uuid not null references public.accessories (id) on delete cascade,
  sort_order   integer not null default 0,
  primary key (product_id, accessory_id)
);

-- ============================================================
-- Testimonials
-- ============================================================
create table public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  author_name   text not null,
  author_role   text,            -- role or location
  message       text not null,
  photo_url     text,            -- optional
  status        public.testimonial_status not null default 'hidden',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger testimonials_updated_at before update on public.testimonials
  for each row execute function public.set_updated_at();

-- ============================================================
-- Blog
-- ============================================================
create table public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  cover_image  text,
  body         text not null default '',
  category     text,
  status       public.publish_status not null default 'draft',
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index blog_posts_status_idx on public.blog_posts (status, published_at desc);
create trigger blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ============================================================
-- Verification submissions
-- ============================================================
create table public.verification_submissions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles (id) on delete cascade,
  id_document_path text not null,   -- path in a PRIVATE storage bucket, never a public URL
  submitted_at     timestamptz not null default now(),
  decision         public.verification_decision not null default 'pending',
  reviewer_id      uuid references public.profiles (id) on delete set null,
  decided_at       timestamptz,
  rejection_reason text,
  constraint rejection_has_reason check (decision <> 'rejected' or rejection_reason is not null)
);
create index verification_user_idx on public.verification_submissions (user_id, submitted_at desc);

-- Keep profiles.verification_status in step with the latest submission.
-- This only mirrors the stored decision; it applies no eligibility rules.
create function public.sync_verification_status() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  perform set_config('petfeb.verification_sync', 'on', true);
  update public.profiles set verification_status = case new.decision
      when 'pending'  then 'pending'::public.verification_status
      when 'approved' then 'verified'::public.verification_status
      when 'rejected' then 'rejected'::public.verification_status
    end
  where id = new.user_id;
  perform set_config('petfeb.verification_sync', 'off', true);
  return new;
end $$;
create trigger verification_sync_ins after insert on public.verification_submissions
  for each row execute function public.sync_verification_status();
create trigger verification_sync_upd after update of decision on public.verification_submissions
  for each row execute function public.sync_verification_status();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles                  enable row level security;
alter table public.staff_sections            enable row level security;
alter table public.products                  enable row level security;
alter table public.product_images            enable row level security;
alter table public.accessories               enable row level security;
alter table public.product_accessories       enable row level security;
alter table public.testimonials              enable row level security;
alter table public.blog_posts                enable row level security;
alter table public.verification_submissions  enable row level security;

-- profiles: own row; verifications section may read all (to review).
create policy profiles_select on public.profiles for select
  using (id = auth.uid() or public.has_section('verifications'));
create policy profiles_update_own on public.profiles for update
  using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_update_reviewer on public.profiles for update
  using (public.has_section('verifications')) with check (public.has_section('verifications'));

-- staff_sections: a user sees only their own grants. Writes: service role only.
create policy staff_sections_select_own on public.staff_sections for select
  using (user_id = auth.uid());

-- products (+ images): public reads published; products section does everything.
create policy products_public_read on public.products for select using (status = 'published');
create policy products_staff_all on public.products for all
  using (public.has_section('products')) with check (public.has_section('products'));

create policy product_images_public_read on public.product_images for select
  using (exists (select 1 from public.products p where p.id = product_id and p.status = 'published'));
create policy product_images_staff_all on public.product_images for all
  using (public.has_section('products')) with check (public.has_section('products'));

create policy accessories_public_read on public.accessories for select using (status = 'published');
create policy accessories_staff_all on public.accessories for all
  using (public.has_section('products')) with check (public.has_section('products'));

create policy product_accessories_public_read on public.product_accessories for select
  using (exists (select 1 from public.products p where p.id = product_id and p.status = 'published')
     and exists (select 1 from public.accessories a where a.id = accessory_id and a.status = 'published'));
create policy product_accessories_staff_all on public.product_accessories for all
  using (public.has_section('products')) with check (public.has_section('products'));

-- testimonials
create policy testimonials_public_read on public.testimonials for select using (status = 'published');
create policy testimonials_staff_all on public.testimonials for all
  using (public.has_section('testimonials')) with check (public.has_section('testimonials'));

-- blog
create policy blog_public_read on public.blog_posts for select using (status = 'published');
create policy blog_staff_all on public.blog_posts for all
  using (public.has_section('blog')) with check (public.has_section('blog'));

-- verification submissions: owner reads/creates own; verifications section reviews all.
create policy verification_select on public.verification_submissions for select
  using (user_id = auth.uid() or public.has_section('verifications'));
create policy verification_insert_own on public.verification_submissions for insert
  with check (user_id = auth.uid() and decision = 'pending'
              and reviewer_id is null and rejection_reason is null);
create policy verification_review on public.verification_submissions for update
  using (public.has_section('verifications')) with check (public.has_section('verifications'));

-- ============================================================
-- Site content (CMS section): simple key/value blocks, extend later
-- ============================================================
create table public.site_content (
  key        text primary key,                  -- e.g. 'home.hero.headline'
  value      jsonb not null,
  status     public.publish_status not null default 'published',
  updated_at timestamptz not null default now()
);
create trigger site_content_updated_at before update on public.site_content
  for each row execute function public.set_updated_at();
alter table public.site_content enable row level security;
create policy site_content_public_read on public.site_content for select using (status = 'published');
create policy site_content_staff_all on public.site_content for all
  using (public.has_section('cms')) with check (public.has_section('cms'));

-- Note: 'other_updates' (orders, Buy Small plans, installers, projects) has no tables yet.
-- Later steps add them with policies using has_section('other_updates').
