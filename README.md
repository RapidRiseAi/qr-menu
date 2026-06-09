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

- `NEXT_PUBLIC_SUPABASE_URL` (required for browser-based Supabase auth; server code can also read `SUPABASE_URL`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (used by public order placement after server-side validation)
- `NEXT_PUBLIC_APP_URL` (used to generate QR links; use your deployed domain in production or your computer LAN IP such as `http://192.168.1.20:3000` for phone scanning during local development)

## Supabase setup

1. Create a Supabase project.
2. In SQL Editor, run `supabase/schema.sql`.
3. Create a Supabase Auth user:
   - Email: `admin@demo-branch.test`
   - Password: `DemoBranch123!`
4. Copy the new Auth user UUID.
5. Run `supabase/seed.sql`.
6. At the bottom of `supabase/seed.sql`, replace `DEMO_USER_UUID` in the commented profile/branch membership statements with the Auth UUID and run those two statements.
7. Confirm the public `menu-media` storage bucket exists.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` on the development computer. To scan QR codes from a phone during local development, set `NEXT_PUBLIC_APP_URL` in `.env.local` to the computer LAN URL (for example `http://192.168.1.20:3000`) and restart `npm run dev`; `localhost` in a QR code means the phone itself, not your computer.

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
3. Add all `.env.example` variables in Vercel Project Settings. If your host already created `SUPABASE_URL`, also add the same value as `NEXT_PUBLIC_SUPABASE_URL` so browser auth can initialize correctly.
4. Deploy.
