import { BRAND_PLACEHOLDER } from "@/lib/constants";

export default function PublicMenuLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-hennies-night px-5 text-white">
      <section className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-hennies-navy p-6 text-center shadow-aqua">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-[1.25rem] border border-hennies-sky bg-hennies-cream text-sm font-black text-hennies-navy">
          HDM
        </div>
        <p className="mt-5 text-[11px] font-black uppercase tracking-[0.28em] text-hennies-orange">
          {BRAND_PLACEHOLDER}
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight">Loading menu</h1>
        <p className="mt-2 text-sm font-semibold text-white/62">
          Getting the good stuff ready…
        </p>
        <div className="mt-6 grid gap-3">
          <div className="hennies-skeleton h-10 rounded-2xl" />
          <div className="grid grid-cols-3 gap-2">
            <div className="hennies-skeleton h-12 rounded-2xl" />
            <div className="hennies-skeleton h-12 rounded-2xl" />
            <div className="hennies-skeleton h-12 rounded-2xl" />
          </div>
          <div className="hennies-skeleton h-36 rounded-[1.5rem]" />
        </div>
      </section>
    </main>
  );
}
