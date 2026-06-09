"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=980&q=58";

export function MenuExperience({ branch, categories, items, specials }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const menuStartRef = useRef<HTMLDivElement>(null);
  const normalized = query.trim().toLowerCase();
  const isCategoryView = activeCategory !== "all";
  const activeCategoryMeta = categories.find(
    (category) => category.slug === activeCategory,
  );

  useEffect(() => {
    const preloadUrls = [
      HERO_IMAGE,
      ...items.slice(0, 10).map((i) => i.image_url),
    ];
    let loaded = 0;
    const finish = () => {
      loaded += 1;
      if (loaded >= Math.min(preloadUrls.length, 7)) setIsBooting(false);
    };
    const timer = window.setTimeout(() => setIsBooting(false), 900);
    preloadUrls.forEach((url) => {
      const image = new Image();
      image.decoding = "async";
      image.loading = "eager";
      image.onload = finish;
      image.onerror = finish;
      image.src = compactImageUrl(url, 640, 55);
    });
    return () => window.clearTimeout(timer);
  }, [items]);

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

  const popular = items
    .filter((item) => item.is_popular && item.is_available_global)
    .slice(0, 8);
  const grouped = categories
    .map((category) => ({
      category,
      items: filtered.filter((item) => item.category_slug === category.slug),
    }))
    .filter((group) => group.items.length);

  function selectCategory(slug: string) {
    setActiveCategory(slug);
    window.requestAnimationFrame(() => {
      if (slug === "all") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      menuStartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  if (isBooting) {
    return <BrandedLoader branchName={branch.name} />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-hennies-night text-white">
      <section className="sticky top-0 z-40 border-b border-white/10 bg-hennies-night/95 shadow-[0_12px_35px_rgba(0,0,0,.28)] backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[1.1rem] border border-hennies-sky bg-hennies-cream text-center text-[11px] font-black uppercase leading-none text-hennies-navy shadow-aqua">
                HDM
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-black uppercase tracking-[0.24em] text-hennies-orange">
                  {BRAND_PLACEHOLDER}
                </p>
                <h1 className="truncate text-lg font-black leading-tight sm:text-2xl">
                  {branch.name}
                </h1>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-hennies-green/20 px-3 py-2 text-xs font-black leading-tight text-hennies-cream ring-1 ring-hennies-green/30">
              Open
              <br /> today
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-[1.25rem] border border-white/10 bg-white/10 px-3 py-3 shadow-inner">
            <Search className="h-5 w-5 text-hennies-sky" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search burgers, wings, drinks, pizzas…"
              className="w-full bg-transparent text-[16px] font-semibold text-white outline-none placeholder:text-white/48"
            />
          </div>
        </div>
        <nav className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 md:justify-center">
          <CategoryTab
            label="All"
            active={activeCategory === "all"}
            onClick={() => selectCategory("all")}
          />
          {categories.map((category) => (
            <CategoryTab
              key={category.slug}
              label={category.name}
              active={activeCategory === category.slug}
              onClick={() => selectCategory(category.slug)}
            />
          ))}
        </nav>
      </section>

      <section
        ref={menuStartRef}
        className="relative mx-auto max-w-6xl scroll-mt-36 px-4 pb-10 pt-4"
      >
        <div className="absolute inset-x-0 top-0 -z-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(82,198,226,.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(240,171,0,.16),transparent_40%)]" />

        {!isCategoryView && !normalized && (
          <>
            <HeroCard />
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
                value="Optional future feature — browse now, order with staff."
              />
            </div>

            {specials.length > 0 && (
              <Section
                title="Specials & promotions"
                subtitle="Match-day energy, branch promos and lekker crowd favourites."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {specials.map((special) => (
                    <SpecialCard key={special.id} special={special} />
                  ))}
                </div>
              </Section>
            )}

            {popular.length > 0 && (
              <Section
                title="Popular picks"
                subtitle="Fan favourites for quick browsing."
              >
                <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
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
          </>
        )}

        <Section
          title={
            isCategoryView && activeCategoryMeta
              ? activeCategoryMeta.name
              : normalized
                ? "Search results"
                : "Full menu"
          }
          subtitle={
            isCategoryView && activeCategoryMeta
              ? activeCategoryMeta.description
              : `${filtered.length} items available for visual browsing.`
          }
          tight={isCategoryView || Boolean(normalized)}
        >
          {isCategoryView && activeCategoryMeta && (
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-hennies-sky">
                {filtered.length} items in this category
              </span>
              <button
                onClick={() => selectCategory("all")}
                className="rounded-full bg-hennies-orange px-3 py-2 text-xs font-black text-white"
              >
                Show all
              </button>
            </div>
          )}

          {grouped.map(({ category, items: groupItems }) => (
            <div
              key={category.slug}
              id={category.slug}
              className="scroll-mt-36 py-3 first:pt-0"
            >
              {!isCategoryView && (
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-hennies-sky">
                      {category.description}
                    </p>
                    <h3 className="text-2xl font-black">{category.name}</h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                    {groupItems.length}
                  </span>
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
          {filtered.length === 0 && <EmptyState />}
        </Section>
      </section>
      <button
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-hennies-orange text-white shadow-orange ring-4 ring-hennies-orange/15"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <footer className="border-t border-white/10 px-4 py-6 text-center text-xs font-black uppercase tracking-[0.2em] text-white/55">
        {POWERED_BY}
      </footer>
      {selected && (
        <ItemModal item={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}

function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-hennies-navy shadow-2xl">
      <img
        src={HERO_IMAGE}
        alt="Sports bar food spread"
        className="h-[21rem] w-full object-cover opacity-75 sm:h-80"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-hennies-night via-hennies-night/45 to-transparent" />
      <div className="absolute bottom-0 p-5 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-hennies-orange px-3 py-1.5 text-xs font-black uppercase text-white shadow-orange">
          <Flame className="h-4 w-4" /> Hennie’s-style menu browsing
        </div>
        <h2 className="max-w-3xl text-4xl font-black leading-[0.94] sm:text-6xl">
          Blêrrie lekker food, drinks & branch specials.
        </h2>
        <p className="mt-3 max-w-xl text-sm font-semibold text-white/82 sm:text-base">
          Scan once per branch. Browse photos, prices, allergens and promos —
          then order with your waiter.
        </p>
      </div>
    </div>
  );
}

function CategoryTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-black transition ${
        active
          ? "bg-hennies-orange text-white shadow-orange"
          : "bg-white/10 text-white/78 hover:bg-white/15"
      }`}
    >
      {label}
    </button>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/7 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <div className="flex items-center gap-2 text-hennies-sky">
        {icon}
        <span className="text-xs font-black uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm font-bold leading-relaxed text-white/86">
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
  tight = false,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  tight?: boolean;
}) {
  return (
    <section className={tight ? "mt-2" : "mt-8"}>
      <div className="mb-4">
        <h2 className="text-3xl font-black leading-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-1 text-sm font-semibold text-white/62">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function SpecialCard({ special }: { special: Special }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-hennies-orange/30 bg-hennies-charcoal shadow-[0_12px_30px_rgba(0,0,0,.25)]">
      <img
        src={compactImageUrl(special.image_url, 620, 55)}
        alt=""
        className="h-36 w-full object-cover sm:h-44"
        loading="lazy"
        decoding="async"
      />
      <div className="p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-hennies-orange">
          {special.is_global ? "Global special" : "Branch special"}
        </p>
        <h3 className="mt-1 text-xl font-black leading-tight text-white">
          {special.title}
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-white/72">
          {special.description}
        </p>
      </div>
    </article>
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
      className={`group grid overflow-hidden rounded-[1.45rem] border border-white/12 bg-hennies-cream text-left text-hennies-navy shadow-[0_14px_30px_rgba(0,0,0,.28)] transition hover:-translate-y-1 hover:shadow-aqua ${
        compact
          ? "min-w-[78vw] snap-start sm:min-w-[320px]"
          : "grid-cols-[128px_1fr] sm:grid-cols-1"
      }`}
    >
      <div className={`relative ${compact ? "" : "min-h-full sm:min-h-0"}`}>
        <img
          src={compactImageUrl(item.image_url, compact ? 520 : 460, 54)}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
            compact ? "h-44" : "min-h-[164px] sm:h-44"
          }`}
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {item.is_popular && <Badge text="Popular" />}
          {item.is_new && <Badge text="New" />}
          {item.is_sold_out && <Badge text="Sold out" tone="dark" />}
        </div>
      </div>
      <div className="flex min-h-full flex-col p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-lg font-black leading-[1.05] sm:text-xl">
            {item.name}
          </h3>
          <p className="shrink-0 rounded-full bg-hennies-orange px-3 py-1.5 text-sm font-black text-white shadow-orange">
            R{item.base_price}
          </p>
        </div>
        <p className="mt-2 line-clamp-3 text-sm font-medium leading-relaxed text-slate-700 sm:line-clamp-2">
          {item.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {item.tags.slice(0, compact ? 2 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-hennies-sky/18 px-2.5 py-1 text-[11px] font-black text-hennies-navy"
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
      className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${tone === "orange" ? "bg-hennies-orange text-white" : "bg-slate-950 text-white"}`}
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
        className="mx-auto max-h-[92vh] max-w-lg overflow-auto rounded-[1.75rem] bg-hennies-cream text-hennies-navy shadow-2xl"
      >
        <div className="relative">
          <img
            src={compactImageUrl(item.image_url, 760, 60)}
            alt={item.name}
            className="h-72 w-full object-cover"
            decoding="async"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-hennies-cream/95 shadow-xl"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-3xl font-black leading-tight">{item.name}</h2>
            <p className="rounded-full bg-hennies-orange px-4 py-2 text-lg font-black text-white">
              R{item.base_price}
            </p>
          </div>
          <p className="mt-3 font-medium leading-relaxed text-slate-700">
            {item.description}
          </p>
          <div className="mt-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Tags
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-hennies-sky/18 px-3 py-1 text-xs font-black"
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
            <p className="mt-1 text-sm font-medium text-slate-700">
              {item.allergens.length
                ? item.allergens.join(", ")
                : "Ask your waiter if you have dietary requirements."}
            </p>
          </div>
          <div className="mt-5 rounded-2xl bg-white p-3 text-sm font-bold text-slate-600 shadow-inner">
            Menu browsing only — please order with your waiter.
          </div>
        </div>
      </article>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
      <h3 className="text-2xl font-black">No menu matches found</h3>
      <p className="mt-2 text-white/70">
        Try searching for wings, burgers, pizza, coffee or cocktails.
      </p>
    </div>
  );
}

function BrandedLoader({ branchName }: { branchName: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-hennies-night px-5 text-white">
      <section className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-hennies-navy p-6 text-center shadow-aqua">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-[1.25rem] border border-hennies-sky bg-hennies-cream text-sm font-black text-hennies-navy">
          HDM
        </div>
        <p className="mt-5 text-[11px] font-black uppercase tracking-[0.28em] text-hennies-orange">
          Hennie’s Digital Menu
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight">{branchName}</h1>
        <p className="mt-2 text-sm font-semibold text-white/62">
          Loading lekker photos, prices and specials…
        </p>
        <div className="mt-6 grid gap-3">
          <SkeletonLine className="h-10 rounded-2xl" />
          <div className="grid grid-cols-3 gap-2">
            <SkeletonLine className="h-12 rounded-2xl" />
            <SkeletonLine className="h-12 rounded-2xl" />
            <SkeletonLine className="h-12 rounded-2xl" />
          </div>
          <SkeletonLine className="h-36 rounded-[1.5rem]" />
        </div>
      </section>
    </main>
  );
}

function SkeletonLine({ className }: { className?: string }) {
  return <div className={`hennies-skeleton ${className || ""}`} />;
}

function compactImageUrl(url: string, width = 640, quality = 58) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("images.unsplash.com")) {
      parsed.searchParams.set("auto", "format");
      parsed.searchParams.set("fit", "crop");
      parsed.searchParams.set("w", String(width));
      parsed.searchParams.set("q", String(quality));
      return parsed.toString();
    }
  } catch {}
  return url;
}
