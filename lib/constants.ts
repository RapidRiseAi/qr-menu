export const APP_CONFIG = {
  name: "Branch QR Menu Ordering System",
  demoEmail: "admin@demo-branch.test",
  demoPassword: "DemoBranch123!",
  demoQrToken: "demo-table-1",
  orderRefreshMs: 10000,
  storageBucket: "menu-media",
};
export const ORDER_STATUSES = [
  "New",
  "Accepted",
  "Preparing",
  "Ready",
  "Served",
  "Cancelled",
] as const;
export const OPEN_ORDER_STATUSES = [
  "New",
  "Accepted",
  "Preparing",
  "Ready",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
