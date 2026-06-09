-- Branch QR Menu Ordering System schema
create extension if not exists "pgcrypto";
create table if not exists profiles (id uuid primary key references auth.users(id) on delete cascade, full_name text, role text default 'branch_admin', created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists restaurant_groups (id uuid primary key default gen_random_uuid(), name text not null, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists branches (id uuid primary key default gen_random_uuid(), restaurant_group_id uuid references restaurant_groups(id) on delete cascade, name text not null, code text not null unique, timezone text default 'Africa/Johannesburg', is_active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists branch_users (id uuid primary key default gen_random_uuid(), branch_id uuid references branches(id) on delete cascade, user_id uuid references auth.users(id) on delete cascade, role text not null check (role in ('super_admin','branch_admin','staff','kitchen')), is_active boolean default true, created_at timestamptz default now(), unique(branch_id,user_id));
create table if not exists menu_categories (id uuid primary key default gen_random_uuid(), branch_id uuid references branches(id) on delete cascade, name text not null, display_order int default 0, is_active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists menu_items (id uuid primary key default gen_random_uuid(), branch_id uuid references branches(id) on delete cascade, category_id uuid references menu_categories(id) on delete set null, name text not null, description text default '', price numeric(10,2) not null check (price >= 0), media_type text default 'none' check (media_type in ('image','video','none')), media_url text, is_available boolean default true, display_order int default 0, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists restaurant_tables (id uuid primary key default gen_random_uuid(), branch_id uuid references branches(id) on delete cascade, table_number text not null, table_name text, qr_token text not null unique, is_active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists orders (id uuid primary key default gen_random_uuid(), branch_id uuid references branches(id) on delete cascade, table_id uuid references restaurant_tables(id) on delete restrict, order_number text not null unique, customer_name text, customer_phone text, status text not null default 'New' check (status in ('New','Accepted','Preparing','Ready','Served','Cancelled')), subtotal numeric(10,2) not null default 0, total numeric(10,2) not null default 0, order_note text, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists order_items (id uuid primary key default gen_random_uuid(), order_id uuid references orders(id) on delete cascade, menu_item_id uuid references menu_items(id) on delete set null, item_name_snapshot text not null, item_price_snapshot numeric(10,2) not null, quantity int not null check (quantity > 0), item_note text, line_total numeric(10,2) not null, created_at timestamptz default now());
create table if not exists order_status_history (id uuid primary key default gen_random_uuid(), order_id uuid references orders(id) on delete cascade, status text not null, changed_by uuid references auth.users(id) on delete set null, note text, created_at timestamptz default now());
create index if not exists idx_branch_users_user on branch_users(user_id);
create index if not exists idx_menu_items_branch on menu_items(branch_id);
create index if not exists idx_tables_qr on restaurant_tables(qr_token);
create index if not exists idx_orders_branch_status on orders(branch_id,status,created_at desc);

create or replace function is_branch_member(target_branch uuid) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from branch_users bu where bu.branch_id=target_branch and bu.user_id=auth.uid() and bu.is_active); $$;

alter table profiles enable row level security; alter table restaurant_groups enable row level security; alter table branches enable row level security; alter table branch_users enable row level security; alter table menu_categories enable row level security; alter table menu_items enable row level security; alter table restaurant_tables enable row level security; alter table orders enable row level security; alter table order_items enable row level security; alter table order_status_history enable row level security;

create policy "profiles own" on profiles for all using (id=auth.uid()) with check (id=auth.uid());
create policy "branch users see memberships" on branch_users for select using (user_id=auth.uid() or is_branch_member(branch_id));
create policy "members read branches" on branches for select using (is_branch_member(id) or is_active);
create policy "members manage categories" on menu_categories for all using (is_branch_member(branch_id)) with check (is_branch_member(branch_id));
create policy "public reads active categories" on menu_categories for select using (is_active);
create policy "members manage items" on menu_items for all using (is_branch_member(branch_id)) with check (is_branch_member(branch_id));
create policy "public reads available items" on menu_items for select using (is_available);
create policy "members manage tables" on restaurant_tables for all using (is_branch_member(branch_id)) with check (is_branch_member(branch_id));
create policy "public reads active qr tables" on restaurant_tables for select using (is_active);
create policy "members manage orders" on orders for all using (is_branch_member(branch_id)) with check (is_branch_member(branch_id));
create policy "members read order items" on order_items for select using (exists(select 1 from orders o where o.id=order_id and is_branch_member(o.branch_id)));
create policy "members read status history" on order_status_history for select using (exists(select 1 from orders o where o.id=order_id and is_branch_member(o.branch_id)));

insert into storage.buckets (id, name, public) values ('menu-media','menu-media',true) on conflict (id) do nothing;
create policy "authenticated uploads menu media" on storage.objects for insert to authenticated with check (bucket_id='menu-media');
create policy "public reads menu media" on storage.objects for select using (bucket_id='menu-media');

-- TODO before production: tighten public menu/table reads through RPCs scoped by qr_token, add rate limiting/CAPTCHA to public order creation, and move all customer writes through audited Edge Functions or API routes with service-role validation.
