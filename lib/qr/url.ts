export function menuUrl(token: string, origin?: string) {
  const base =
    origin || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/menu/${token}`;
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
