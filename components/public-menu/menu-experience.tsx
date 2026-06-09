"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowUp, ChevronDown, Flame, Info, Menu, Search, X } from "lucide-react";
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

const SEARCH_SYNONYMS: Record<string, string[]> = {
  chips: ["fries", "slap chips", "tjips", "aartappel", "potato"],
  fries: ["chips", "slap chips", "tjips", "potato"],
  braaibroodjie: [
    "braai broodjie",
    "braai brood",
    "toast",
    "toasted",
    "sandwich",
    "grilled cheese",
    "bread",
  ],
  braai: ["grill", "grilled", "barbecue", "bbq"],
  broodjie: ["bread", "toast", "sandwich", "roll"],
  burger: ["burgertjie", "patty", "beef burger"],
  hotdog: ["hot dog", "horrog", "varkhondjie", "varkhond"],
  horrog: ["hot dog", "hotdog", "wors", "sausage"],
  ribs: ["ribbetjies", "ribs", "pork ribs"],
  ribbetjies: ["ribs", "pork ribs"],
  chicken: ["kippie", "hoender", "strips", "strippies", "wings"],
  kippie: ["chicken", "hoender"],
  steak: ["rump", "t-bone", "vleis", "beef"],
  vleis: ["meat", "beef", "steak"],
  breakfast: ["brekkie", "brêkkie", "brakkies", "eggs"],
  brekkie: ["breakfast", "eggs"],
  bakkie: ["basket", "bowl", "loaded"],
  pizza: ["flatbread", "slice"],
  coffee: ["americano", "cappuccino", "latte", "espresso", "koffie"],
  beer: ["bier", "lager", "draught", "dumpie", "alcohol", "alcoholic"],
  alchohol: ["alcohol", "beer", "cider", "cocktail", "spirits", "liquor"],
  alchoholic: ["alcoholic", "alcohol", "beer", "cider", "cocktail"],
  alcohol: [
    "beer",
    "bier",
    "cider",
    "cocktail",
    "spirits",
    "liquor",
    "booze",
    "drink",
    "bar",
  ],
  alcoholic: ["alcohol", "beer", "cider", "cocktail", "spirits", "liquor"],
  mocktail: ["virgin", "non alcoholic", "non-alcoholic", "zero alcohol"],
  "long island": ["hennies iced tea", "iced tea cocktail"],
  "long island iced tea": ["hennies iced tea", "iced tea cocktail"],
  pina: ["colada", "christa colada", "pina colada"],
  "pina colada": ["christa colada", "colada"],
  mule: ["ginger ninja", "moscow mule", "ginger beer cocktail"],
  "moscow mule": ["ginger ninja", "ginger cocktail"],
  "sex on the beach": ["inge on the beach", "beach cocktail"],
  daiquiri: [
    "frozen inge",
    "shaken inge",
    "strawberry daiquiri",
    "frozen cocktail",
  ],
  "frozen daiquiri": ["frozen inge", "frozen cocktail"],
  margarita: ["strawberry margarita", "tequila cocktail"],
};

const CATEGORY_SEARCH_LABELS: Record<string, string[]> = {
  "hot-drinks": ["hot drinks", "coffee", "tea", "koffie", "warm drinks"],
  "cold-drinks": [
    "cold drinks",
    "sodas",
    "juice",
    "cooldrink",
    "soft drink",
    "water",
  ],
  milkshakes: ["milkshakes", "shake", "dessert drink"],
  "beers-and-ciders": [
    "beer",
    "bier",
    "cider",
    "alcohol",
    "alcoholic",
    "lager",
    "bar",
  ],
  cocktails: [
    "cocktail",
    "alcohol",
    "alcoholic",
    "spirits",
    "liquor",
    "bar",
    "mixed drink",
  ],
  "non-alcoholic": [
    "non alcoholic",
    "non-alcoholic",
    "mocktail",
    "virgin",
    "zero alcohol",
    "family drinks",
  ],
  pizzas: ["pizza", "flatbread"],
  "burgers-and-horrogs": [
    "burger",
    "hot dog",
    "hotdog",
    "horrog",
    "burgertjie",
  ],
  "wings-and-ribbetjies": ["wings", "ribs", "ribbetjies", "buffalo"],
  "vleis-vreters": ["steak", "meat", "vleis", "beef", "grill"],
  "kant-happies": ["sides", "side", "chips", "fries", "sauce", "extras"],
  "loaded-meals": ["loaded", "nachos", "chips", "fries"],
};

function expandSearchTokens(search: string) {
  const normalizedSearch = normalizeSearchText(search);
  const baseTokens = tokenize(normalizedSearch);
  const expanded = new Set([...baseTokens, normalizedSearch]);

  baseTokens.forEach((token) => {
    SEARCH_SYNONYMS[token]?.forEach((synonym) => {
      expanded.add(synonym);
      tokenize(synonym).forEach((part) => expanded.add(part));
    });
  });

  Object.entries(SEARCH_SYNONYMS).forEach(([key, synonyms]) => {
    if (
      normalizedSearch.includes(normalizeSearchText(key)) ||
      synonyms.some((synonym) =>
        normalizedSearch.includes(normalizeSearchText(synonym)),
      )
    ) {
      expanded.add(key);
      tokenize(key).forEach((part) => expanded.add(part));
      synonyms.forEach((synonym) => {
        expanded.add(synonym);
        tokenize(synonym).forEach((part) => expanded.add(part));
      });
    }
  });

  return [...expanded].filter((token) => token.length > 1);
}

function scoreMenuItem(item: MenuItem, search: string) {
  const query = normalizeSearchText(search);
  const tokens = expandSearchTokens(search);
  const wantsAlcohol = tokens.some((token) =>
    [
      "alcohol",
      "alchohol",
      "alcoholic",
      "alchoholic",
      "booze",
      "liquor",
      "spirits",
      "bar",
    ].includes(token),
  );
  const wantsNonAlcohol = tokens.some((token) =>
    [
      "non",
      "non alcoholic",
      "non-alcoholic",
      "zero",
      "mocktail",
      "virgin",
    ].includes(token),
  );
  if (
    wantsAlcohol &&
    !wantsNonAlcohol &&
    item.category_slug === "non-alcoholic"
  )
    return 0;
  const name = normalizeSearchText(item.name);
  const description = normalizeSearchText(item.description);
  const tags = normalizeSearchText(item.tags.join(" "));
  const allergens = normalizeSearchText(item.allergens.join(" "));
  const categoryText = normalizeSearchText(
    [
      item.category_slug,
      ...(CATEGORY_SEARCH_LABELS[item.category_slug] || []),
    ].join(" "),
  );
  const ingredients = getItemIngredients(item);
  const ingredientsText = normalizeSearchText(ingredients.join(" "));
  const primaryIngredients = ingredients.slice(0, 3).map(normalizeSearchText);
  let score = 0;

  if (name === query) score += 1000;
  if (name.startsWith(query)) score += 850;
  if (name.includes(query)) score += 680;
  if (
    primaryIngredients.some(
      (ingredient) => ingredient === query || ingredient.includes(query),
    )
  )
    score += 560;
  if (ingredientsText.includes(query)) score += 430;
  if (description.includes(query)) score += 220;
  if (tags.includes(query)) score += 180;
  if (allergens.includes(query)) score += 120;
  if (categoryText.includes(query)) score += 360;

  tokens.forEach((token) => {
    if (name.split(" ").includes(token)) score += 120;
    else if (name.includes(token)) score += 92;

    if (
      primaryIngredients.some(
        (ingredient) =>
          ingredient.split(" ").includes(token) || ingredient.includes(token),
      )
    )
      score += 82;
    else if (ingredientsText.includes(token)) score += 58;

    if (description.includes(token)) score += 26;
    if (categoryText.includes(token)) score += 34;
    if (tags.includes(token)) score += 18;
  });

  if (item.is_popular && score > 0) score += 8;
  return score;
}

function getItemIngredients(item: MenuItem) {
  const text = normalizeSearchText(
    `${item.name} ${item.description} ${item.tags.join(" ")}`,
  );
  const ingredients: string[] = [];
  const add = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) ingredients.push(ingredient);
  };

  const checks: Array<[string, string[]]> = [
    ["chips / fries", ["chips", "fries", "loaded fries", "slap"]],
    ["braai toast bread", ["braaibroodjie", "broodjie", "toast", "bread"]],
    ["beef", ["beef", "rump", "steak", "t-bone", "patty", "burger"]],
    ["chicken", ["chicken", "kippie", "wings", "schnitzel", "strippies"]],
    [
      "pork",
      ["pork", "vark", "eisbein", "rib", "ribbetjies", "bacon", "pulled pork"],
    ],
    ["cheese", ["cheese", "cheesy", "mozzarella", "feta", "halloumi"]],
    ["egg", ["egg", "omelette", "breakfast", "brekkie"]],
    ["mushrooms", ["mushroom", "mushrooms"]],
    ["jalapeño", ["jalapeno", "jalapeño", "popper"]],
    ["tomato", ["tomato", "salsa"]],
    ["lettuce / greens", ["lettuce", "greens", "salad", "rocket"]],
    ["pizza base", ["pizza", "focaccia"]],
    [
      "coffee",
      ["coffee", "americano", "cappuccino", "latte", "mochaccino", "espresso"],
    ],
    ["milk", ["milkshake", "latte", "cappuccino", "milk", "cream"]],
    ["beer", ["beer", "lager", "lite", "stella", "black label", "castle"]],
    ["cider", ["cider", "savanna", "hunter"]],
    [
      "alcohol",
      [
        "cocktail",
        "mojito",
        "daiquiri",
        "margarita",
        "bloody mary",
        "sunset",
        "inge on the beach",
        "hennies iced tea",
        "ginger ninja",
        "christa colada",
        "beer",
        "lager",
        "cider",
      ],
    ],
    [
      "cocktail mix",
      [
        "cocktail",
        "mojito",
        "daiquiri",
        "margarita",
        "bloody mary",
        "long island",
        "pina colada",
        "moscow mule",
        "sex on the beach",
      ],
    ],
  ];

  checks.forEach(([ingredient, needles]) => {
    if (needles.some((needle) => text.includes(normalizeSearchText(needle))))
      add(ingredient);
  });

  item.tags.forEach((tag) => add(tag));
  return ingredients.slice(0, 8);
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalizeSearchText(value).split(" ").filter(Boolean);
}

export function MenuExperience({ branch, categories, items, specials }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [selectedSpecial, setSelectedSpecial] = useState<Special | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(true);
  const menuStartRef = useRef<HTMLDivElement>(null);
  const normalized = query.trim().toLowerCase();
  const isCategoryView = activeCategory !== "all";
  const activeCategoryMeta = categories.find(
    (category) => category.slug === activeCategory,
  );
  const categoryLookup = useMemo(
    () => new Map(categories.map((category) => [category.slug, category.name])),
    [categories],
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

  const filtered = useMemo(() => {
    const activeItems = items.filter((item) => item.is_available_global);

    if (normalized) {
      return activeItems
        .map((item) => ({ item, score: scoreMenuItem(item, normalized) }))
        .filter(({ score }) => score > 0)
        .sort(
          (a, b) =>
            b.score - a.score || a.item.display_order - b.item.display_order,
        )
        .map(({ item }) => item);
    }

    return activeItems.filter(
      (item) =>
        activeCategory === "all" || item.category_slug === activeCategory,
    );
  }, [activeCategory, items, normalized]);

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
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-[1.25rem] border border-white/10 bg-white/10 px-3 py-3 shadow-inner">
            <Search className="h-5 w-5 text-hennies-sky" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search burgers, chips, braaibroodjie, cocktails…"
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
        className="relative mx-auto max-w-7xl scroll-mt-36 px-4 pb-10 pt-4"
      >
        {isQuickMenuOpen ? (
          <aside className="fixed bottom-24 left-5 top-44 z-20 hidden w-48 flex-col rounded-[1.5rem] border border-white/10 bg-hennies-night/92 p-3 shadow-2xl backdrop-blur-xl xl:flex 2xl:left-8">
            <div className="mb-2 flex shrink-0 items-center justify-between gap-2 px-2">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-hennies-sky">
                Quick menu
              </p>
              <button
                type="button"
                onClick={() => setIsQuickMenuOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/75 transition hover:bg-white/15 hover:text-white"
                aria-label="Close quick menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto pr-1">
              <button
                type="button"
                onClick={() => selectCategory("all")}
                className={`mb-1 w-full rounded-2xl px-3 py-2 text-left text-xs font-black ${activeCategory === "all" ? "bg-hennies-orange text-white shadow-orange" : "text-white/70 hover:bg-white/10"}`}
              >
                Full menu
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.slug}
                  onClick={() => selectCategory(category.slug)}
                  className={`mb-1 w-full rounded-2xl px-3 py-2 text-left text-xs font-black ${activeCategory === category.slug ? "bg-hennies-orange text-white shadow-orange" : "text-white/70 hover:bg-white/10"}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </aside>
        ) : (
          <button
            type="button"
            onClick={() => setIsQuickMenuOpen(true)}
            className="fixed left-5 top-44 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-hennies-night/92 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-hennies-sky shadow-2xl backdrop-blur-xl transition hover:bg-hennies-blue xl:flex 2xl:left-8"
            aria-label="Open quick menu"
          >
            <Menu className="h-4 w-4" /> Quick menu
          </button>
        )}

        {!isCategoryView && !normalized && (
          <>
            <HeroCard />
            <HouseRulesCard />
            {specials.length > 0 && (
              <Section
                title="Specials & promotions"
                subtitle="Match-day energy, branch promos and lekker crowd favourites."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {specials.map((special) => (
                    <SpecialCard
                      key={special.id}
                      special={special}
                      onInfo={() => setSelectedSpecial(special)}
                    />
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
                      categoryName={
                        categoryLookup.get(item.category_slug) || "Menu"
                      }
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
            <div className="mb-5 flex items-center justify-between rounded-[1.35rem] border border-hennies-gold/25 bg-[linear-gradient(135deg,rgba(0,47,95,.92),rgba(35,32,33,.72))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
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

          {normalized ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  categoryName={
                    categoryLookup.get(item.category_slug) || "Menu"
                  }
                  onClick={() => setSelected(item)}
                />
              ))}
            </div>
          ) : (
            grouped.map(({ category, items: groupItems }) => (
              <div
                key={category.slug}
                id={category.slug}
                className="scroll-mt-36 rounded-[1.75rem] py-4 first:pt-0"
              >
                {!isCategoryView && (
                  <div className="mb-4 flex items-end justify-between gap-3 border-b border-hennies-sky/20 pb-3 pt-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.26em] text-hennies-sky">
                        {category.description}
                      </p>
                      <h3 className="text-3xl font-black leading-none">
                        {category.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-hennies-orange px-3 py-1 text-xs font-black text-white shadow-orange">
                      {groupItems.length}
                    </span>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {groupItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      categoryName={
                        categoryLookup.get(item.category_slug) || category.name
                      }
                      onClick={() => setSelected(item)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
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
      {selectedSpecial && (
        <SpecialModal
          special={selectedSpecial}
          onClose={() => setSelectedSpecial(null)}
        />
      )}
    </main>
  );
}

function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-hennies-navy shadow-2xl">
      <HenniesImage
        src={HERO_IMAGE}
        alt="Sports bar food spread"
        className="h-[21rem] w-full opacity-75 sm:h-80"
        width={980}
        quality={58}
        priority
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
          Browse signature food, ice-cold drinks, specials, prices, allergens
          and ingredients.
        </p>
      </div>
    </div>
  );
}

function HouseRulesCard() {
  const [isOpen, setIsOpen] = useState(true);
  const rules = [
    "Don’t be a d**s.",
    "Always have fun.",
    "Don’t let Rule #2 make you break Rule #1.",
    "Always drink with your left hand — Buffalo rules apply.",
    "Whistle if you need service.",
    "Always respect the bark by barking along.",
    "Don’t ring the bell unless you are buying a round.",
    "Stand up and respect the National Anthem of South Africa.",
    "Please tip your waiter or barman.",
    "You may forget some of the rules, except Rule #1 and Rule #7.",
  ];

  return (
    <section className="mt-5 overflow-hidden rounded-[1.9rem] border-[3px] border-hennies-orange bg-hennies-navy p-1.5 text-white shadow-2xl">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-4 rounded-[1.45rem] bg-hennies-navy px-4 py-4 text-left sm:px-5"
        aria-expanded={isOpen}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.2rem] bg-hennies-sky text-xs font-black text-hennies-navy shadow-aqua">
            HDM
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-hennies-orange">
              Hennie’s menu
            </p>
            <h2 className="mt-1 text-3xl font-black leading-none sm:text-5xl">
              House Rules
            </h2>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rotate-[-3deg] rounded-2xl bg-white px-3 py-2 text-lg font-black uppercase text-hennies-navy shadow-[4px_4px_0_rgba(82,198,226,.45)] sm:inline-flex">
            Rule #1
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-hennies-orange text-white shadow-orange">
            <ChevronDown
              className={`h-5 w-5 transition ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="rounded-[1.5rem] border-2 border-white bg-hennies-sky text-hennies-navy">
          <div className="flex items-center justify-between gap-3 border-b-2 border-white/80 px-5 py-3">
            <p className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
              House Rules
            </p>
            <span className="rounded-xl bg-white px-3 py-1.5 text-xl font-black uppercase shadow-[3px_3px_0_rgba(0,47,95,.22)]">
              #1
            </span>
          </div>
          <div className="grid gap-4 p-5 lg:grid-cols-[1fr_310px] lg:p-6">
            <ol className="grid gap-2 text-sm font-black leading-snug sm:grid-cols-2 sm:text-base lg:grid-cols-1">
              {rules.map((rule, index) => (
                <li key={rule} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs text-hennies-navy shadow-sm">
                    {index + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ol>
            <div className="rounded-[1.5rem] border-2 border-hennies-navy/15 bg-white p-4 shadow-inner">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-hennies-orange">
                Menu note
              </p>
              <p className="mt-2 text-lg font-black leading-tight">
                Lekker food, cold drinks and good gees. Ask your waiter about
                allergens before ordering.
              </p>
              <p className="mt-4 rounded-2xl bg-hennies-orange px-3 py-2 text-sm font-black text-white">
                Collapse these rules any time if you want to get straight to
                the menu.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
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
    <section className={tight ? "mt-3" : "mt-10"}>
      <div className="mb-5 border-l-4 border-hennies-orange pl-4">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-hennies-sky">
          Hennie’s menu
        </p>
        <h2 className="mt-1 text-3xl font-black leading-none text-hennies-cream sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-semibold text-white/62">
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}

function SpecialCard({
  special,
  onInfo,
}: {
  special: Special;
  onInfo: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-hennies-orange/30 bg-hennies-charcoal shadow-[0_12px_30px_rgba(0,0,0,.25)]">
      <HenniesImage
        src={special.image_url}
        alt={special.title}
        className="h-36 w-full sm:h-44"
        width={620}
        quality={55}
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
        <button
          type="button"
          onClick={onInfo}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-hennies-cream px-3 py-2 text-xs font-black text-hennies-navy"
          aria-label={`View details for ${special.title}`}
        >
          <Info className="h-4 w-4" /> Special info
        </button>
      </div>
    </article>
  );
}

function ItemCard({
  item,
  onClick,
  compact = false,
  categoryName,
}: {
  item: MenuItem;
  onClick: () => void;
  compact?: boolean;
  categoryName: string;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onClick();
      }}
      className={`group grid cursor-pointer overflow-hidden rounded-[1.35rem] border border-hennies-sky/20 bg-[linear-gradient(180deg,#f2e9df,#fff7ed)] text-left text-hennies-navy shadow-[0_16px_36px_rgba(0,0,0,.32)] ring-1 ring-white/10 transition hover:-translate-y-1 hover:border-hennies-orange/55 hover:shadow-orange ${
        compact
          ? "min-w-[78vw] snap-start sm:min-w-[320px]"
          : "grid-cols-[132px_1fr] sm:grid-cols-1"
      }`}
    >
      <div
        className={`relative bg-hennies-charcoal ${compact ? "" : "min-h-full sm:min-h-0"}`}
      >
        <HenniesImage
          src={item.image_url}
          alt={item.name}
          width={compact ? 520 : 460}
          quality={54}
          className={compact ? "h-44" : "min-h-[164px] sm:h-44"}
          imgClassName="transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {item.is_popular && <Badge text="Popular" />}
          {item.is_new && <Badge text="New" />}
          {item.is_sold_out && <Badge text="Sold out" tone="dark" />}
        </div>
      </div>
      <div className="flex min-h-full flex-col border-l border-hennies-orange/10 p-3.5 sm:border-l-0 sm:border-t sm:p-4">
        <div className="mb-2 inline-flex w-fit rounded-full bg-hennies-navy/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-hennies-navy">
          {categoryName}
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-lg font-black leading-[1.05] tracking-[-0.02em] sm:text-xl">
            {item.name}
          </h3>
          <p className="shrink-0 rounded-full bg-hennies-orange px-3 py-1.5 text-sm font-black text-white shadow-orange">
            R{item.base_price}
          </p>
        </div>
        <p className="mt-2 line-clamp-3 text-sm font-semibold leading-relaxed text-slate-700 sm:line-clamp-2">
          {item.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          {item.tags.slice(0, compact ? 2 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-hennies-sky/18 px-2.5 py-1 text-[11px] font-black text-hennies-navy"
            >
              #{tag}
            </span>
          ))}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClick();
            }}
            className="ml-auto inline-flex items-center gap-1 rounded-full bg-hennies-navy px-2.5 py-1 text-[11px] font-black text-hennies-cream shadow-sm"
            aria-label={`View ingredients for ${item.name}`}
          >
            <Info className="h-3.5 w-3.5" /> Info
          </button>
        </div>
      </div>
    </article>
  );
}

function HenniesImage({
  src,
  alt,
  className,
  imgClassName,
  width = 640,
  quality = 58,
  priority = false,
}: {
  src?: string | null;
  alt: string;
  className: string;
  imgClassName?: string;
  width?: number;
  quality?: number;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);
  const resolvedSrc = src ? compactImageUrl(src, width, quality) : "";

  return (
    <div
      className={`relative overflow-hidden bg-hennies-charcoal ${className}`}
    >
      {(!loaded || failed) && <ImageSkeleton label={alt} />}
      {!failed && resolvedSrc && (
        <img
          src={resolvedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName || ""}`}
        />
      )}
    </div>
  );
}

function ImageSkeleton({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_top_left,rgba(82,198,226,.22),transparent_34%),linear-gradient(135deg,#002f5f,#232021_68%,#f47c20)]">
      <div className="absolute inset-0 hennies-skeleton opacity-55" />
      <div className="relative px-4 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-hennies-cream text-[10px] font-black text-hennies-navy shadow-aqua">
          HDM
        </div>
        <p className="mt-2 line-clamp-2 text-[10px] font-black uppercase tracking-[0.18em] text-hennies-cream/85">
          {label || "Menu image loading"}
        </p>
      </div>
    </div>
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
          <HenniesImage
            src={item.image_url}
            alt={item.name}
            className="h-72 w-full"
            width={760}
            quality={60}
            priority
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
              Ingredients & key components
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {getItemIngredients(item).map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full bg-white px-3 py-1 text-xs font-black text-hennies-navy shadow-inner"
                >
                  {ingredient}
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
                : "No common allergens listed for this item."}
            </p>
          </div>
          <div className="mt-5 rounded-2xl bg-white p-3 text-sm font-bold text-slate-600 shadow-inner">
            Please confirm ingredients and allergens with the branch team if you
            have a dietary requirement.
          </div>
        </div>
      </article>
    </div>
  );
}

function SpecialModal({
  special,
  onClose,
}: {
  special: Special;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <article
        onClick={(event) => event.stopPropagation()}
        className="mx-auto max-h-[92vh] max-w-lg overflow-auto rounded-[1.75rem] bg-hennies-charcoal text-white shadow-2xl"
      >
        <div className="relative">
          <HenniesImage
            src={special.image_url}
            alt={special.title}
            className="h-72 w-full"
            width={760}
            quality={60}
            priority
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-hennies-cream/95 text-hennies-navy shadow-xl"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-hennies-orange">
            {special.is_global ? "Global promotion" : "Branch promotion"}
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            {special.title}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-white/75">
            {special.description}
          </p>
          <div className="mt-5 rounded-2xl bg-white/8 p-4 text-sm font-semibold text-white/70">
            Promotions may vary by branch and availability. Please confirm
            current details with the branch team.
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
