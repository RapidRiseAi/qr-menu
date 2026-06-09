export function branchMenuUrl(branchSlug: string, origin?: string) {
  const base =
    origin || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/m/${branchSlug}`;
}
export function isLocalhostUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return (
      hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
    );
  } catch {
    return false;
  }
}
