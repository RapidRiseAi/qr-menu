import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard/nav";
import type { PublicBranch } from "@/lib/menu/branch-context";
export function DashboardShell({
  title,
  subtitle,
  children,
  branch,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  branch?: PublicBranch;
}) {
  return (
    <main className="min-h-screen bg-hennies-night p-4 text-white">
      <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[260px_1fr] 2xl:grid-cols-[300px_1fr]">
        <DashboardNav branchSlug={branch?.slug} />
        <section className="min-w-0">
          <div className="mb-5 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(244,124,32,.28),transparent_35%),linear-gradient(135deg,#123d68,#07111d)] p-6 shadow-[0_20px_70px_rgba(0,0,0,.24)]">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-hennies-sky">
              Branch management portal
            </p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">{title}</h1>
            <p className="mt-2 max-w-3xl text-sm font-semibold text-white/65 md:text-base">
              {subtitle}
            </p>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
