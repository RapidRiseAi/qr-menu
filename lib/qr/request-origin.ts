import { headers } from "next/headers";
import { isLocalhostUrl } from "@/lib/qr/url";

export async function getRequestOrigin() {
  const headerStore = await headers();
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost || headerStore.get("host");
  const requestOrigin = host
    ? getOriginFromHost(host, headerStore.get("x-forwarded-proto"))
    : undefined;
  const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL;

  if (
    configuredOrigin &&
    (!isLocalhostUrl(configuredOrigin) ||
      !requestOrigin ||
      isLocalhostUrl(requestOrigin))
  ) {
    return configuredOrigin;
  }

  return requestOrigin || configuredOrigin;
}

function getOriginFromHost(host: string, forwardedProto: string | null) {
  const proto =
    forwardedProto || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
