import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
export function DashboardShell({
  children,
  branchName,
}: {
  children: React.ReactNode;
  branchName: string;
}) {
  const links = [
    ["/dashboard", "Home"],
    ["/dashboard/menu", "Menu"],
    ["/dashboard/tables", "Tables"],
    ["/dashboard/orders", "Orders"],
    ["/dashboard/kitchen", "Kitchen"],
    ["/dashboard/qr-codes", "QR"],
  ];
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2b2416,#0d0d0f_45%)]">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <div className="rounded-2xl bg-gold p-2 text-black">
            <UtensilsCrossed size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{branchName}</p>
            <p className="text-xs text-white/50">Branch OS</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button className="text-xs text-white/60">Logout</button>
          </form>
        </div>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 no-scrollbar">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <section className="mx-auto max-w-7xl px-4 py-6">{children}</section>
    </main>
  );
}
