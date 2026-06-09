export function menuUrl(token: string, origin?: string) {
  const base =
    origin || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/menu/${token}`;
}
