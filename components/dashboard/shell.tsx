import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard/nav";
export function DashboardShell({
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
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[260px_1fr]">
        <DashboardNav />
        <section>
          <div className="mb-5 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,122,26,.25),transparent_35%),linear-gradient(135deg,#0b2440,#071a2f)] p-6">
            <h1 className="text-3xl font-black">{title}</h1>
            <p className="mt-1 text-white/65">{subtitle}</p>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
