import { LinkButton } from "@/components/ui/button";
import { APP_CONFIG } from "@/lib/constants";
import { QrCode, TabletSmartphone, ChefHat } from "lucide-react";
export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,#3b2d13,#0d0d0f_48%)]">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
            Premium QR ordering for every branch
          </p>
          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            Branch QR Menu Ordering System
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            A mobile-first restaurant OS for branch menus, table QR codes,
            customer ordering, kitchen flow, and order tracking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/login">Login</LinkButton>
            <LinkButton
              href={`/menu/${APP_CONFIG.demoQrToken}`}
              variant="ghost"
            >
              Demo menu
            </LinkButton>
          </div>
        </div>
        <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-5 shadow-glow backdrop-blur">
          <div className="rounded-[2rem] bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between">
              <b>Mbombela Branch</b>
              <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
                Table 1
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                [QrCode, "Auto QR tables"],
                [TabletSmartphone, "Phone-first menu"],
                [ChefHat, "Kitchen status board"],
              ].map(([Icon, label]: any) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-slate-100 p-4"
                >
                  <Icon className="text-gold" />
                  <span className="font-bold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
