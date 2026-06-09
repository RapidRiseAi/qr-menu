import { QrCode, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME, BRAND_PLACEHOLDER, POWERED_BY } from "@/lib/constants";
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-hennies-navy text-white">
      <section className="mx-auto max-w-7xl px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="rounded-2xl border border-hennies-aqua/40 bg-white px-4 py-3 text-sm font-black text-hennies-navy">
            {BRAND_PLACEHOLDER}
          </div>
          <div className="flex gap-2">
            <Button href="/login" variant="ghost">
              Login
            </Button>
            <Button href="/m/hennies-nelspruit">View demo</Button>
          </div>
        </nav>
        <div className="grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-hennies-aqua/15 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-hennies-aqua">
              {APP_NAME}
            </p>
            <h1 className="text-5xl font-black leading-none sm:text-7xl">
              A cheeky, premium visual menu OS for sports-bar branches.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              Mobile-first digital menus for food, drinks, specials, media and
              QR browsing. No ordering workflow, no cart, no table-specific QR
              complexity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/dashboard">Branch dashboard</Button>
              <Button href="/admin" variant="light">
                Super admin
              </Button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-hennies-blue p-4 shadow-aqua">
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80"
              alt="Sports bar"
              className="h-96 w-full rounded-[1.5rem] object-cover"
            />
            <div className="grid gap-3 p-4 sm:grid-cols-3">
              {[
                [QrCode, "One branch QR"],
                [Sparkles, "Visual specials"],
                [ShieldCheck, "Supabase ready"],
              ].map(([Icon, label]) => (
                <div
                  key={String(label)}
                  className="rounded-2xl bg-white/10 p-4"
                >
                  <Icon className="h-5 w-5 text-hennies-orange" />
                  <p className="mt-2 text-sm font-black">{String(label)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer className="py-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/50">
        {POWERED_BY}
      </footer>
    </main>
  );
}
