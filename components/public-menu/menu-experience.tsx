"use client";

import { useMemo, useState } from "react";
import {
  ArrowUp,
  BadgeInfo,
  Clock,
  Flame,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { BRAND_PLACEHOLDER, POWERED_BY } from "@/lib/constants";
import type {
  Branch,
  MenuCategory,
  MenuItem,
  Special,
} from "@/lib/menu/demo-data";

type Props = {
  branch: Branch;
  categories: MenuCategory[];
  items: MenuItem[];
  specials: Special[];
};

export function MenuExperience({ branch, categories, items, specials }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const normalized = query.toLowerCase();
  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesQuery =
          !normalized ||
          [item.name, item.description, item.tags.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(normalized);
        const matchesCategory =
          activeCategory === "all" || item.category_slug === activeCategory;
        return matchesQuery && matchesCategory && item.is_available_global;
      }),
    [activeCategory, items, normalized],
  );
  const popular = filtered.filter((item) => item.is_popular).slice(0, 8);
  const grouped = categories
    .map((category) => ({
      category,
      items: filtered.filter((item) => item.category_slug === category.slug),
    }))
    .filter((group) => group.items.length);

  return (
    <main className="min-h-screen overflow-hidden bg-hennies-navy text-white">
      <section className="sticky top-0 z-40 border-b border-white/10 bg-hennies-navy/92 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-hennies-aqua/60 bg-white text-center text-[10px] font-black uppercase leading-none text-hennies-navy shadow-aqua">
                HDM
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-hennies-orange">
                  {BRAND_PLACEHOLDER}
                </p>
                <h1 className="text-lg font-black leading-tight sm:text-2xl">
                  {branch.name}
                </h1>
              </div>
            </div>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
              Open today
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
            <Search className="h-4 w-4 text-hennies-aqua" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search burgers, wings, drinks, pizzas…"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/55"
            />
          </div>
        </div>
        <nav className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 md:justify-center">
          <button
            onClick={() => setActiveCategory("all")}
            className={tabClass(activeCategory === "all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={tabClass(activeCategory === category.slug)}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-10 pt-5">
        <div className="absolute inset-x-0 top-0 -z-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(25,211,209,.3),transparent_35%),radial-gradient(circle_at_top_right,rgba(255,122,26,.28),transparent_38%)]" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-hennies-blue shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80"
            alt="Sports bar food spread"
            className="h-56 w-full object-cover opacity-70 sm:h-72"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hennies-navy via-hennies-navy/45 to-transparent" />
          <div className="absolute bottom-0 p-5 sm:p-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-hennies-orange px-3 py-1 text-xs font-black uppercase text-white">
              <Flame className="h-4 w-4" /> No ordering. Just lekker browsing.
            </div>
            <h2 className="max-w-3xl text-4xl font-black leading-none sm:text-6xl">
              Visual menu for food, drinks & branch specials.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
              Scan once per branch. Browse images, prices, allergens and
              specials. Ask your waiter to order at the table.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <InfoCard
            icon={<Clock className="h-5 w-5" />}
            label="Trading hours"
            value={branch.trading_hours}
          />
          <InfoCard
            icon={<BadgeInfo className="h-5 w-5" />}
            label="Branch"
            value={branch.address}
          />
          <InfoCard
            icon={<Sparkles className="h-5 w-5" />}
            label="Service buttons"
            value="Call waiter / bill request are optional future features"
          />
        </div>

        {specials.length > 0 && (
          <Section
            title="Specials & promotions"
            subtitle="Branch-friendly promos without checkout clutter."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {specials.map((special) => (
                <article
                  key={special.id}
                  className="overflow-hidden rounded-3xl border border-hennies-orange/30 bg-hennies-orange/15"
                >
                  <img
                    src={special.image_url}
                    alt=""
                    className="h-36 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-hennies-orange">
                      {special.is_global ? "Global special" : "Branch special"}
                    </p>
                    <h3 className="text-xl font-black">{special.title}</h3>
                    <p className="mt-1 text-sm text-white/75">
                      {special.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        )}
        {popular.length > 0 && (
          <Section
            title="Popular picks"
            subtitle="Fan favourites for quick browsing."
          >
            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
              {popular.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelected(item)}
                  compact
                />
              ))}
            </div>
          </Section>
        )}
        <Section
          title="Full menu"
          subtitle={`${filtered.length} items available for visual browsing.`}
        >
          {grouped.map(({ category, items: groupItems }) => (
            <div
              key={category.slug}
              id={category.slug}
              className="scroll-mt-36 py-4"
            >
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-hennies-aqua">
                    {category.description}
                  </p>
                  <h3 className="text-2xl font-black">{category.name}</h3>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                  {groupItems.length}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {groupItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => setSelected(item)}
                  />
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
              <h3 className="text-2xl font-black">No menu matches found</h3>
              <p className="mt-2 text-white/70">
                Try searching for wings, burgers, pizza, coffee or cocktails.
              </p>
            </div>
          )}
        </Section>
      </section>
      <button
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-hennies-orange shadow-orange"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <footer className="border-t border-white/10 px-4 py-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/60">
        {POWERED_BY}
      </footer>
      {selected && (
        <ItemModal item={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
function tabClass(active: boolean) {
  return `whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${active ? "bg-hennies-orange text-white shadow-orange" : "bg-white/10 text-white/75 hover:bg-white/15"}`;
}
function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/8 p-4">
      <div className="flex items-center gap-2 text-hennies-aqua">
        {icon}
        <span className="text-xs font-black uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold text-white/85">{value}</p>
    </div>
  );
}
function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-3xl font-black">{title}</h2>
        <p className="text-sm text-white/65">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}
function ItemCard({
  item,
  onClick,
  compact = false,
}: {
  item: MenuItem;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group overflow-hidden rounded-3xl border border-white/10 bg-white text-left text-hennies-navy shadow-xl transition hover:-translate-y-1 hover:shadow-aqua ${compact ? "min-w-[260px]" : ""}`}
    >
      <div className="relative">
        <img
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
        />{" "}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {item.is_popular && <Badge text="Popular" />}
          {item.is_new && <Badge text="New" />}
          {item.is_sold_out && <Badge text="Sold out" tone="dark" />}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black leading-tight">{item.name}</h3>
          <p className="rounded-full bg-hennies-orange px-3 py-1 text-sm font-black text-white">
            R{item.base_price}
          </p>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {item.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-hennies-aqua/15 px-2 py-1 text-[11px] font-bold text-hennies-blue"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
function Badge({
  text,
  tone = "orange",
}: {
  text: string;
  tone?: "orange" | "dark";
}) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-[11px] font-black uppercase ${tone === "orange" ? "bg-hennies-orange text-white" : "bg-slate-950 text-white"}`}
    >
      {text}
    </span>
  );
}
function ItemModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <article
        onClick={(event) => event.stopPropagation()}
        className="mx-auto max-h-[92vh] max-w-lg overflow-auto rounded-[2rem] bg-white text-hennies-navy shadow-2xl"
      >
        <div className="relative">
          <img
            src={item.image_url}
            alt={item.name}
            className="h-72 w-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-3xl font-black">{item.name}</h2>
            <p className="rounded-full bg-hennies-orange px-4 py-2 text-lg font-black text-white">
              R{item.base_price}
            </p>
          </div>
          <p className="mt-3 text-slate-700">{item.description}</p>
          <div className="mt-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Tags
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-hennies-aqua/15 px-3 py-1 text-xs font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Allergens
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {item.allergens.length
                ? item.allergens.join(", ")
                : "Ask your waiter if you have dietary requirements."}
            </p>
          </div>
          <div className="mt-5 rounded-2xl bg-slate-100 p-3 text-sm font-semibold text-slate-600">
            Ordering is intentionally not available in this MVP. Please order
            with your waiter.
          </div>
        </div>
      </article>
    </div>
  );
}
