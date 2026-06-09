"use client";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/constants";
export function StatusButtons({
  orderId,
  current,
}: {
  orderId: string;
  current: OrderStatus;
}) {
  async function setStatus(status: string) {
    await fetch(`/api/orders/${orderId}/status`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    location.reload();
  }
  return (
    <div className="flex flex-wrap gap-2">
      {ORDER_STATUSES.map((s) => (
        <button
          key={s}
          onClick={() => setStatus(s)}
          className={`rounded-full px-3 py-2 text-xs font-bold ${s === current ? "bg-gold text-black" : "bg-white/10 text-white"}`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
