import Link from "next/link";
import type { ReactNode } from "react";
const links = [
  ["Overview", "/admin"],
  ["Branches", "/admin/branches"],
  ["Global Menu", "/admin/global-menu"],
  ["Media", "/admin/media"],
];
export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-hennies-navy p-4 text-white">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-white/10 bg-hennies-blue p-4">
          <p className="font-black uppercase tracking-[0.2em] text-hennies-orange">
            Super Admin
          </p>
          <div className="flex flex-wrap gap-2">
            {links.map(([l, h]) => (
              <Link
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/15"
                key={h}
                href={h}
              >
                {l}
              </Link>
            ))}
          </div>
        </nav>
        <header className="mb-5 rounded-[2rem] bg-white/8 p-6">
          <h1 className="text-4xl font-black">{title}</h1>
          <p className="mt-1 text-white/65">{subtitle}</p>
        </header>
        {children}
      </div>
    </main>
  );
}
