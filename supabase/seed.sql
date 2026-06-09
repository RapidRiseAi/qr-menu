-- Demo data for Branch QR Menu Ordering System.
-- Run schema.sql first. Create auth user admin@demo-branch.test / DemoBranch123! in Supabase Auth,
-- then call select public.link_demo_branch_admin('<AUTH_USER_UUID>'::uuid);

insert into restaurant_groups (id,name)
values ('11111111-1111-1111-1111-111111111111','Demo Restaurant Group')
on conflict (id) do update set name=excluded.name;

insert into branches (id,restaurant_group_id,name,code)
values ('22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','Mbombela Branch','MBO')
on conflict (code) do update set
  restaurant_group_id=excluded.restaurant_group_id,
  name=excluded.name;

insert into restaurant_tables (id,branch_id,table_number,table_name,qr_token,is_active) values
('44444444-4444-4444-4444-444444444441','22222222-2222-2222-2222-222222222222','Table 1','Main floor','demo-table-1',true),
('44444444-4444-4444-4444-444444444442','22222222-2222-2222-2222-222222222222','Table 2','Main floor','demo-table-2',true),
('44444444-4444-4444-4444-444444444443','22222222-2222-2222-2222-222222222222','Table 3','Main floor','demo-table-3',true),
('44444444-4444-4444-4444-444444444444','22222222-2222-2222-2222-222222222222','Patio 1','Garden patio','demo-patio-1',true),
('44444444-4444-4444-4444-444444444445','22222222-2222-2222-2222-222222222222','Patio 2','Garden patio','demo-patio-2',true)
on conflict (qr_token) do update set
  table_number=excluded.table_number,
  table_name=excluded.table_name,
  is_active=excluded.is_active;

insert into menu_categories (id,branch_id,name,display_order) values
('33333333-3333-3333-3333-333333333331','22222222-2222-2222-2222-222222222222','Burgers',1),
('33333333-3333-3333-3333-333333333332','22222222-2222-2222-2222-222222222222','Chicken',2),
('33333333-3333-3333-3333-333333333333','22222222-2222-2222-2222-222222222222','Drinks',3),
('33333333-3333-3333-3333-333333333334','22222222-2222-2222-2222-222222222222','Desserts',4)
on conflict (id) do update set
  name=excluded.name,
  display_order=excluded.display_order;

insert into menu_items (id,branch_id,category_id,name,description,price,media_type,media_url,is_available,display_order) values
('55555555-5555-5555-5555-555555555551','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333331','Gold Stack Burger','Double smashed beef, cheddar, pickles, house sauce.',145,'image','https://images.unsplash.com/photo-1568901346375-23c9450c58cd',true,1),
('55555555-5555-5555-5555-555555555552','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333331','Mbombela Veggie Burger','Crispy chickpea patty, avo, tomato relish.',118,'image','https://images.unsplash.com/photo-1550547660-d9450f859349',true,2),
('55555555-5555-5555-5555-555555555553','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333332','Peri-Peri Half Chicken','Flame grilled with lemon herb or hot peri-peri.',165,'image','https://images.unsplash.com/photo-1598515214211-89d3c73ae83b',true,1),
('55555555-5555-5555-5555-555555555554','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333332','Crispy Chicken Strips','Golden strips with ranch and chips.',96,'image','https://images.unsplash.com/photo-1562967916-eb82221dfb92',true,2),
('55555555-5555-5555-5555-555555555555','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333','Craft Lemonade','Fresh lemon, mint and sparkling soda.',42,'image','https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e',true,1),
('55555555-5555-5555-5555-555555555556','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333','Iced Coffee','Cold brew over ice with vanilla cream.',48,'image','https://images.unsplash.com/photo-1461023058943-07fcbe16d735',true,2),
('55555555-5555-5555-5555-555555555557','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334','Chocolate Lava Cake','Warm chocolate fondant, vanilla ice cream.',74,'image','https://images.unsplash.com/photo-1606313564200-e75d5e30476c',true,1),
('55555555-5555-5555-5555-555555555558','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334','Malva Pudding','Classic warm malva with custard.',68,'image','https://images.unsplash.com/photo-1488477181946-6428a0291777',true,2)
on conflict (id) do update set
  category_id=excluded.category_id,
  name=excluded.name,
  description=excluded.description,
  price=excluded.price,
  media_type=excluded.media_type,
  media_url=excluded.media_url,
  is_available=excluded.is_available,
  display_order=excluded.display_order;

create or replace function public.link_demo_branch_admin(demo_user_id uuid)
returns void
language plpgsql
security definer
set search_path=public
as $$
begin
  insert into profiles (id, full_name, role)
  values (demo_user_id, 'Demo Branch Admin', 'branch_admin')
  on conflict (id) do update set full_name=excluded.full_name, role=excluded.role;

  insert into branch_users (branch_id,user_id,role,is_active)
  values ('22222222-2222-2222-2222-222222222222', demo_user_id, 'branch_admin', true)
  on conflict (branch_id,user_id) do update set role=excluded.role, is_active=excluded.is_active;
end;
$$;

comment on function public.link_demo_branch_admin(uuid) is 'Links an existing Supabase Auth user to the seeded Mbombela Branch demo account.';
