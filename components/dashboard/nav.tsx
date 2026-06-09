import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { withBranch } from "@/lib/menu/branch-context";
const links = [
  ["Dashboard", "/dashboard"],
  ["Menu", "/dashboard/menu"],
  ["Categories", "/dashboard/categories"],
  ["Specials", "/dashboard/specials"],
  ["Media", "/dashboard/media"],
  ["QR", "/dashboard/qr"],
];
export function DashboardNav({ branchSlug }: { branchSlug?: string }) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-hennies-blue p-4 lg:sticky lg:top-4 lg:h-fit">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-hennies-aqua">
        {APP_NAME}
      </p>
      <nav className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={branchSlug ? withBranch(href, branchSlug) : href}
            className="rounded-2xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
