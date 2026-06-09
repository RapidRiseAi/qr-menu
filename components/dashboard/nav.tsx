import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
const links = [
  ["Dashboard", "/dashboard"],
  ["Menu", "/dashboard/menu"],
  ["Categories", "/dashboard/categories"],
  ["Specials", "/dashboard/specials"],
  ["Media", "/dashboard/media"],
  ["QR", "/dashboard/qr"],
];
export function DashboardNav() {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-hennies-blue p-4">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-hennies-aqua">
        {APP_NAME}
      </p>
      <nav className="grid gap-2">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
