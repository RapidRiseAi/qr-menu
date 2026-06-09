export const APP_NAME = "Hennies Digital Menu OS";
export const BRAND_PLACEHOLDER = "Hennie’s Digital Menu";
export const POWERED_BY = "Powered by Rapid Rise AI";
export const BRAND = {
  night: "#07111d",
  navy: "#002f5f",
  navy2: "#123d68",
  charcoal: "#232021",
  orange: "#f47c20",
  gold: "#f0ab00",
  aqua: "#52c6e2",
  cream: "#f2e9df",
  green: "#25d366",
};
export const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "menu-media";
export const PUBLIC_BRANCHES = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Hennie’s Nelspruit",
    slug: "hennies-nelspruit",
    address: "Nelspruit",
    phone: "+27 13 000 0001",
    whatsapp: "+27 83 000 0001",
    email: "nelspruit@example.com",
    trading_hours: "Open daily",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Hennie’s Boksburg",
    slug: "hennies-boksburg",
    address: "Boksburg",
    phone: "+27 11 000 0002",
    whatsapp: "+27 83 000 0002",
    email: "boksburg@example.com",
    trading_hours: "Open daily",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Hennie’s Randburg",
    slug: "hennies-randburg",
    address: "Randburg",
    phone: "+27 11 000 0003",
    whatsapp: "+27 83 000 0003",
    email: "randburg@example.com",
    trading_hours: "Open daily",
  },
] as const;
