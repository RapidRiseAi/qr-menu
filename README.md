# Branch QR Menu Ordering System

Mobile-first QR digital menu and table-ordering MVP built with Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth/Database/Storage, and QR code generation.

## Features

- Premium landing page, Supabase email/password login, branch-scoped dashboard.
- Menu/category CRUD with availability, prices, descriptions, and image/video media upload to Supabase Storage.
- Table CRUD with unique `/menu/[qr_token]` links, QR preview, PNG download, copy link, and print page.
- Customer QR menu with branch/table detection, category navigation, media cards, cart drawer, item notes, optional customer details, and order confirmation.
- Order dashboard, order details with status history, and tablet-friendly kitchen display.
- POS integration placeholder in `lib/integrations/pos` for future Pilot POS work.

## Environment

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

Required variables:

- `SUPABASE_URL` (provided by the Vercel/Supabase integration)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (used by public order placement after server-side validation)
- `NEXT_PUBLIC_APP_URL` (used to generate QR links)
- `NEXT_PUBLIC_SUPABASE_URL` is optional for the current server-action login flow, but recommended if you add browser-side Supabase clients later.

## Supabase setup

1. Create a Supabase project.
2. Because this repo is connected through Supabase GitHub Integration, the SQL files in `supabase/migrations/` will apply when the production branch is merged/deployed. For manual setup, run `supabase/schema.sql` and then `supabase/seed.sql` in SQL Editor.
3. Create a Supabase Auth user:
   - Email: `admin@demo-branch.test`
   - Password: `DemoBranch123!`
4. Copy the new Auth user UUID.
5. Link the Auth user to the seeded branch by running:

   ```sql
   select public.link_demo_branch_admin('<AUTH_USER_UUID>'::uuid);
   ```

6. Confirm the public `menu-media` storage bucket exists.

## Supabase migrations

The project now includes migration files under `supabase/migrations/`:

- `20260609000100_initial_schema.sql` creates tables, indexes, triggers, RLS policies, and the `menu-media` storage bucket.
- `20260609000200_demo_seed.sql` seeds the Demo Restaurant Group, Mbombela Branch, tables, categories, menu items, and the `link_demo_branch_admin` helper.

These migrations are designed for the Supabase GitHub Integration working directory shown in the dashboard (`.` containing the `supabase/` folder).

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo flow

1. Login at `/login` with the demo branch admin account.
2. Open `/dashboard/menu` to add/edit categories and menu items.
3. Upload image/video media for a menu item.
4. Open `/dashboard/tables` to add tables and download/copy a QR code.
5. Visit `/menu/demo-table-1` or scan the QR code.
6. Add items to cart and place an order.
7. View the order in `/dashboard/orders` or `/dashboard/kitchen`.
8. Change status from New → Preparing → Ready → Served.

## Production notes

The MVP includes branch-scoped RLS policies and service-route validation for customer order creation. Before production, tighten public menu/table reads through QR-token-scoped RPCs, add anti-abuse controls to public ordering, and audit storage policies for your threat model.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Add all `.env.example` variables in Vercel Project Settings.
4. Deploy.
