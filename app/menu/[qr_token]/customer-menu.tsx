"use client";
import { useMemo, useState } from "react";
import { MenuMedia } from "@/components/menu/media-card";
import { money } from "@/lib/utils/format";
type Item = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  media_type: string | null;
  media_url: string | null;
  is_available: boolean;
};
export function CustomerMenu({
  token,
  branch,
  table,
  categories,
  items,
}: {
  token: string;
  branch: any;
  table: any;
  categories: any[];
  items: Item[];
}) {
  const [cart, setCart] = useState<
    Record<string, { item: Item; qty: number; note: string }>
  >({});
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<any>(null);
  const total = useMemo(
    () =>
      Object.values(cart).reduce((s, c) => s + Number(c.item.price) * c.qty, 0),
    [cart],
  );
  function add(item: Item) {
    setCart((c) => ({
      ...c,
      [item.id]: {
        item,
        qty: (c[item.id]?.qty || 0) + 1,
        note: c[item.id]?.note || "",
      },
    }));
  }
  function qty(id: string, d: number) {
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return c;
      next[id].qty += d;
      if (next[id].qty <= 0) delete next[id];
      return next;
    });
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        qr_token: token,
        customer_name: fd.get("customer_name"),
        customer_phone: fd.get("customer_phone"),
        order_note: fd.get("order_note"),
        items: Object.values(cart).map((c) => ({
          menu_item_id: c.item.id,
          quantity: c.qty,
          item_note: c.note,
        })),
      }),
    });
    const json = await res.json();
    if (res.ok) {
      setDone(json.order);
      setCart({});
    } else alert(json.error || "Order failed");
  }
  if (done)
    return (
      <main className="min-h-screen bg-stone-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 text-center text-slate-950">
          <div className="text-5xl">✅</div>
          <h1 className="mt-4 text-3xl font-black">Order sent</h1>
          <p className="mt-2 text-slate-500">
            Your order {done.order_number} has been received by the kitchen.
          </p>
          <button
            onClick={() => setDone(null)}
            className="mt-6 rounded-2xl bg-black px-4 py-3 font-bold text-white"
          >
            Place another order
          </button>
        </div>
      </main>
    );
  return (
    <main className="min-h-screen bg-[#101010] pb-28 text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 px-4 py-4 backdrop-blur">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm text-gold">{branch.name}</p>
          <h1 className="text-2xl font-black">
            {table.table_number} {table.table_name}
          </h1>
        </div>
      </header>
      <nav className="sticky top-[73px] z-10 flex gap-2 overflow-x-auto bg-[#101010]/95 px-4 py-3 no-scrollbar">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#cat-${c.id}`}
            className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-black"
          >
            {c.name}
          </a>
        ))}
      </nav>
      <section className="mx-auto grid max-w-2xl gap-7 px-4 py-5">
        {categories.map((cat) => {
          const catItems = items.filter(
            (i) => i.category_id === cat.id && i.is_available,
          );
          return (
            <div key={cat.id} id={`cat-${cat.id}`}>
              <h2 className="mb-3 text-2xl font-black">{cat.name}</h2>
              <div className="grid gap-4">
                {catItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[2rem] bg-white p-4 text-slate-950 shadow-xl"
                  >
                    <MenuMedia
                      type={item.media_type}
                      url={item.media_url}
                      name={item.name}
                    />
                    <div className="mt-4 flex gap-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-black">{item.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.description}
                        </p>
                        <p className="mt-2 text-lg font-black">
                          {money(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => add(item)}
                        className="self-end rounded-2xl bg-black px-5 py-3 font-bold text-white"
                      >
                        Add
                      </button>
                    </div>
                    {cart[item.id] && (
                      <div className="mt-3 rounded-2xl bg-slate-100 p-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => qty(item.id, -1)}
                            className="h-10 w-10 rounded-full bg-white font-black"
                          >
                            −
                          </button>
                          <b>{cart[item.id].qty}</b>
                          <button
                            onClick={() => qty(item.id, 1)}
                            className="h-10 w-10 rounded-full bg-white font-black"
                          >
                            +
                          </button>
                        </div>
                        <input
                          placeholder="Item note e.g. no onions"
                          value={cart[item.id].note}
                          onChange={(e) =>
                            setCart((c) => ({
                              ...c,
                              [item.id]: {
                                ...c[item.id],
                                note: e.target.value,
                              },
                            }))
                          }
                          className="mt-2 w-full rounded-xl px-3 py-2 text-sm"
                        />
                      </div>
                    )}
                  </article>
                ))}
                {catItems.length === 0 && (
                  <p className="rounded-3xl border border-white/10 p-5 text-white/50">
                    No available items in this category right now.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>
      {Object.keys(cart).length > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-2xl items-center justify-between rounded-3xl bg-gold px-5 py-4 font-black text-black shadow-glow"
        >
          <span>
            View cart ({Object.values(cart).reduce((s, c) => s + c.qty, 0)})
          </span>
          <span>{money(total)}</span>
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/70 p-4 backdrop-blur">
          <form
            onSubmit={submit}
            className="mx-auto mt-8 max-h-[86vh] max-w-md overflow-auto rounded-[2rem] bg-white p-5 text-slate-950"
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-black">Your order</h2>
              <button type="button" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
            {Object.values(cart).map((c) => (
              <div
                key={c.item.id}
                className="my-3 flex justify-between border-b py-3"
              >
                <span>
                  {c.qty} × {c.item.name}
                </span>
                <b>{money(c.qty * Number(c.item.price))}</b>
              </div>
            ))}
            <input
              name="customer_name"
              placeholder="Name (optional)"
              className="mt-3 w-full rounded-2xl bg-slate-100 px-4 py-3"
            />
            <input
              name="customer_phone"
              placeholder="Phone (optional)"
              className="mt-3 w-full rounded-2xl bg-slate-100 px-4 py-3"
            />
            <textarea
              name="order_note"
              placeholder="General order note"
              className="mt-3 w-full rounded-2xl bg-slate-100 px-4 py-3"
            />
            <div className="mt-4 flex justify-between text-xl font-black">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
            <button className="mt-4 w-full rounded-2xl bg-black px-4 py-4 font-black text-white">
              Submit order
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
