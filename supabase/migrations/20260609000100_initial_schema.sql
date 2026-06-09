create extension if not exists pgcrypto;

create table if not exists restaurant_groups (
  id uuid primary key default gen_random_uuid(), name text not null, brand_name text not null, default_logo_url text, primary_color text default '#071a2f', accent_color text default '#ff7a1a', created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists branches (
  id uuid primary key default gen_random_uuid(), restaurant_group_id uuid not null references restaurant_groups(id) on delete cascade, branch_name text not null, branch_slug text not null unique, address text, phone text, whatsapp text, email text, trading_hours text, branch_logo_url text, is_active boolean default true, qr_code_url text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(), auth_user_id uuid unique references auth.users(id) on delete cascade, full_name text, email text unique, role text not null check (role in ('super_admin','branch_admin')), branch_id uuid references branches(id) on delete set null, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists menu_categories (
  id uuid primary key default gen_random_uuid(), restaurant_group_id uuid not null references restaurant_groups(id) on delete cascade, name text not null, slug text not null, description text, display_order int default 0, icon_name text, color_theme text, is_active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now(), unique(restaurant_group_id, slug)
);
create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(), restaurant_group_id uuid not null references restaurant_groups(id) on delete cascade, category_id uuid references menu_categories(id) on delete set null, name text not null, description text default '', base_price numeric(10,2) not null check (base_price >= 0), image_url text, video_url text, media_type text default 'image' check (media_type in ('image','video','none')), tags text[] default '{}', allergens text[] default '{}', spice_level int, is_popular boolean default false, is_new boolean default false, is_special boolean default false, is_available_global boolean default true, display_order int default 0, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists branch_menu_overrides (
  id uuid primary key default gen_random_uuid(), branch_id uuid not null references branches(id) on delete cascade, menu_item_id uuid not null references menu_items(id) on delete cascade, branch_price numeric(10,2), branch_description text, branch_image_url text, branch_video_url text, is_available_branch boolean default true, is_sold_out boolean default false, is_hidden boolean default false, created_at timestamptz default now(), updated_at timestamptz default now(), unique(branch_id, menu_item_id)
);
create table if not exists specials (
  id uuid primary key default gen_random_uuid(), branch_id uuid references branches(id) on delete cascade, restaurant_group_id uuid not null references restaurant_groups(id) on delete cascade, title text not null, description text, image_url text, start_date date, end_date date, day_of_week int check (day_of_week between 0 and 6), is_global boolean default false, is_active boolean default true, display_order int default 0, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(), restaurant_group_id uuid not null references restaurant_groups(id) on delete cascade, branch_id uuid references branches(id) on delete cascade, uploaded_by uuid references auth.users(id) on delete set null, file_url text not null, file_type text, file_name text, alt_text text, created_at timestamptz default now()
);
create table if not exists qr_codes (
  id uuid primary key default gen_random_uuid(), branch_id uuid not null references branches(id) on delete cascade, qr_url text not null, qr_image_url text, created_at timestamptz default now(), updated_at timestamptz default now(), unique(branch_id)
);

create index if not exists idx_branches_slug on branches(branch_slug);
create index if not exists idx_menu_items_category on menu_items(category_id, display_order);
create index if not exists idx_overrides_branch on branch_menu_overrides(branch_id);
create index if not exists idx_specials_active on specials(restaurant_group_id, branch_id, is_active);

create or replace function public.current_profile_role() returns text language sql stable security definer set search_path=public as $$ select role from profiles where auth_user_id = auth.uid() limit 1 $$;
create or replace function public.current_profile_branch() returns uuid language sql stable security definer set search_path=public as $$ select branch_id from profiles where auth_user_id = auth.uid() limit 1 $$;

alter table restaurant_groups enable row level security;
alter table branches enable row level security;
alter table profiles enable row level security;
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table branch_menu_overrides enable row level security;
alter table specials enable row level security;
alter table media_assets enable row level security;
alter table qr_codes enable row level security;

create policy "public can read active groups" on restaurant_groups for select using (true);
create policy "super admins manage groups" on restaurant_groups for all using (current_profile_role() = 'super_admin') with check (current_profile_role() = 'super_admin');
create policy "public can read active branches" on branches for select using (is_active = true or current_profile_role() = 'super_admin' or id = current_profile_branch());
create policy "super admins manage branches" on branches for all using (current_profile_role() = 'super_admin') with check (current_profile_role() = 'super_admin');
create policy "branch admins update own branch" on branches for update using (id = current_profile_branch()) with check (id = current_profile_branch());
create policy "profiles self or super read" on profiles for select using (auth_user_id = auth.uid() or current_profile_role() = 'super_admin');
create policy "super admins manage profiles" on profiles for all using (current_profile_role() = 'super_admin') with check (current_profile_role() = 'super_admin');
create policy "public reads active categories" on menu_categories for select using (is_active = true);
create policy "super admins manage categories" on menu_categories for all using (current_profile_role() = 'super_admin') with check (current_profile_role() = 'super_admin');
create policy "public reads active menu items" on menu_items for select using (is_available_global = true);
create policy "super admins manage menu items" on menu_items for all using (current_profile_role() = 'super_admin') with check (current_profile_role() = 'super_admin');
create policy "public reads visible overrides" on branch_menu_overrides for select using (is_hidden = false);
create policy "branch admins manage own overrides" on branch_menu_overrides for all using (branch_id = current_profile_branch() or current_profile_role() = 'super_admin') with check (branch_id = current_profile_branch() or current_profile_role() = 'super_admin');
create policy "public reads active specials" on specials for select using (is_active = true);
create policy "branch admins manage own specials" on specials for all using (current_profile_role() = 'super_admin' or branch_id = current_profile_branch()) with check (current_profile_role() = 'super_admin' or branch_id = current_profile_branch());
create policy "authenticated reads media" on media_assets for select using (true);
create policy "branch admins manage own media" on media_assets for all using (current_profile_role() = 'super_admin' or branch_id = current_profile_branch()) with check (current_profile_role() = 'super_admin' or branch_id = current_profile_branch());
create policy "public reads qr codes" on qr_codes for select using (true);
create policy "branch admins manage own qr" on qr_codes for all using (current_profile_role() = 'super_admin' or branch_id = current_profile_branch()) with check (current_profile_role() = 'super_admin' or branch_id = current_profile_branch());
