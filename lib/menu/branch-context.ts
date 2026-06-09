import { PUBLIC_BRANCHES } from "@/lib/constants";

export type PublicBranch = (typeof PUBLIC_BRANCHES)[number];

export function branchFromSlug(slug?: string | null): PublicBranch {
  return (
    PUBLIC_BRANCHES.find((branch) => branch.slug === slug) || PUBLIC_BRANCHES[0]
  );
}

export async function branchFromSearchParams(
  searchParams?:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>,
) {
  const resolved =
    searchParams && "then" in searchParams ? await searchParams : searchParams;
  const raw = resolved?.branch;
  const slug = Array.isArray(raw) ? raw[0] : raw;
  return branchFromSlug(slug);
}

export function withBranch(href: string, branchSlug: string) {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}branch=${branchSlug}`;
}
