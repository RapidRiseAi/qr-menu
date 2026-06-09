# Hennies Digital Menu OS

A branded, mobile-first visual digital menu system for Hennie’s Sports Bar-style restaurant branches. The app is intentionally **menu browsing only**: no cart, checkout, customer ordering, kitchen dashboard, waiter order tracking, POS integration, table recognition, or one-QR-per-table workflow.

## What is included

- Next.js App Router, TypeScript and Tailwind CSS.
- Supabase Auth, PostgreSQL schema, RLS policies and Storage-ready media upload API.
- One public QR route per branch: `/m/[branch_slug]`.
- Customer-facing menu with sticky header, branch info, search, horizontal category tabs, popular picks, specials, images, tags, allergens, item detail modal, back-to-top button and the required `Powered by Rapid Rise AI` footer.
- Branch dashboard with menu editor, category editor, specials editor, media upload UI and downloadable/printable QR poster.
- Super Admin dashboard with branch management, global menu management and media asset placeholders.
- Seed data for `Hennie’s Digital Menu Demo`, Nelspruit, Boksburg and Randburg branches, 20 menu categories and 80+ Hennie’s-style demo menu items.

## Legal / brand asset note

No copyrighted Hennie’s logo or proprietary food photography is hardcoded. The UI uses a placeholder text logo (`Hennie’s Digital Menu`) and safe placeholder image URLs. Upload approved brand assets and official photography through the media/admin flows before production use.

## Routes

- `/` — landing page
- `/login` — Supabase Auth login
- `/admin` — Super Admin overview
- `/admin/branches` — manage branches
- `/admin/global-menu` — manage global menu
- `/admin/media` — global media assets
- `/dashboard` — Branch Admin dashboard
- `/dashboard/menu` — branch menu editor
- `/dashboard/categories` — category editor
- `/dashboard/specials` — specials editor
- `/dashboard/media` — media upload
- `/dashboard/qr` — branch QR code and poster
- `/m/hennies-nelspruit` — demo public menu
- `/m/hennies-boksburg` — demo public menu
- `/m/hennies-randburg` — demo public menu

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Add Supabase values to `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=menu-media
   ```

4. Apply the database schema in Supabase SQL editor or through the Supabase CLI:

   ```bash
   psql "$SUPABASE_DB_URL" -f supabase/schema.sql
   psql "$SUPABASE_DB_URL" -f supabase/seed.sql
   ```

5. Create Supabase Auth users, then add matching `profiles` rows:
   - `role = 'super_admin'` for Super Admins.
   - `role = 'branch_admin'` plus `branch_id` for Branch Admins.

6. Create a public Supabase Storage bucket named `menu-media` or set `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` to your bucket name.

7. Run locally:

   ```bash
   npm run dev
   ```

## Demo flow

1. Open `/admin` to view the global menu and branches.
2. Open `/dashboard` for branch stats, quick actions and QR preview.
3. Open `/dashboard/menu` to preview item availability, sold-out toggles, media upload fields and branch price overrides.
4. Open `/dashboard/specials` to preview specials management.
5. Open `/dashboard/qr` to download a QR PNG, copy the public URL or print a QR poster.
6. Open `/m/hennies-nelspruit` on mobile width and search for burgers, wings, drinks or pizzas.
7. Tap an item card to view details, tags, allergens and pricing.
8. Confirm the footer says `Powered by Rapid Rise AI`.

## Production notes

- RLS policies are included in `supabase/schema.sql` for public active-menu reads, branch-scoped admin edits and Super Admin global management.
- The current UI includes demo data fallbacks so franchise demos work before Supabase is connected.
- The schema is designed so ordering, waiter requests, analytics or POS modules can be added later without polluting the browsing-only MVP.
