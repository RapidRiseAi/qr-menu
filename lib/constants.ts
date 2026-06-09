export const APP_NAME = "Hennies Digital Menu OS";
export const BRAND_PLACEHOLDER = "Hennie’s Digital Menu";
export const POWERED_BY = "Powered by Rapid Rise AI";
export const BRAND = {
  navy: "#071a2f",
  navy2: "#0b2440",
  orange: "#ff7a1a",
  aqua: "#19d3d1",
  cream: "#fff8ea",
};
export const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "menu-media";
export const PUBLIC_BRANCHES = [
  {
    name: "Hennie’s Nelspruit",
    slug: "hennies-nelspruit",
    address: "Demo Street, Nelspruit",
    phone: "+27 13 000 0001",
    whatsapp: "+27 83 000 0001",
    email: "nelspruit@example.com",
    trading_hours: "Mon–Sun 10:00–22:00",
  },
  {
    name: "Hennie’s Boksburg",
    slug: "hennies-boksburg",
    address: "Demo Street, Boksburg",
    phone: "+27 11 000 0002",
    whatsapp: "+27 83 000 0002",
    email: "boksburg@example.com",
    trading_hours: "Mon–Sun 10:00–22:00",
  },
  {
    name: "Hennie’s Randburg",
    slug: "hennies-randburg",
    address: "Demo Street, Randburg",
    phone: "+27 11 000 0003",
    whatsapp: "+27 83 000 0003",
    email: "randburg@example.com",
    trading_hours: "Mon–Sun 10:00–22:00",
  },
] as const;
