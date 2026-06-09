import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
const Item = z.object({
  menu_item_id: z.string().uuid(),
  quantity: z.number().int().min(1).max(99),
  item_note: z.string().max(500).optional().nullable(),
});
const Payload = z.object({
  qr_token: z.string().min(3),
  customer_name: z.string().max(120).optional().nullable(),
  customer_phone: z.string().max(60).optional().nullable(),
  order_note: z.string().max(1000).optional().nullable(),
  items: z.array(Item).min(1),
});
export async function POST(request: Request) {
  const parsed = Payload.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  const supabase = await createServiceClient();
  const { data: table } = await supabase
    .from("restaurant_tables")
    .select("*, branch:branches(*)")
    .eq("qr_token", parsed.data.qr_token)
    .eq("is_active", true)
    .single();
  if (!table)
    return NextResponse.json(
      { error: "This table QR code is inactive or invalid." },
      { status: 404 },
    );
  const ids = parsed.data.items.map((i) => i.menu_item_id);
  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("id,name,price,is_available,branch_id")
    .in("id", ids)
    .eq("branch_id", table.branch_id);
  const menuMap = new Map((menuItems || []).map((i: any) => [i.id, i]));
  const orderLines = parsed.data.items.map((line) => {
    const item: any = menuMap.get(line.menu_item_id);
    if (!item || !item.is_available)
      throw new Error("Unavailable item in cart");
    const total = Number(item.price) * line.quantity;
    return {
      menu_item_id: item.id,
      item_name_snapshot: item.name,
      item_price_snapshot: item.price,
      quantity: line.quantity,
      item_note: line.item_note || null,
      line_total: total,
    };
  });
  const subtotal = orderLines.reduce((sum, i) => sum + Number(i.line_total), 0);
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const { count } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("branch_id", table.branch_id)
    .gte("created_at", new Date().toISOString().slice(0, 10));
  const prefix = (table.branch?.code || "ORD").toUpperCase();
  const order_number = `${prefix}-${today}-${String((count || 0) + 1).padStart(4, "0")}`;
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      branch_id: table.branch_id,
      table_id: table.id,
      order_number,
      customer_name: parsed.data.customer_name || null,
      customer_phone: parsed.data.customer_phone || null,
      order_note: parsed.data.order_note || null,
      subtotal,
      total: subtotal,
      status: "New",
    })
    .select("*")
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  await supabase
    .from("order_items")
    .insert(orderLines.map((i) => ({ ...i, order_id: order.id })));
  await supabase.from("order_status_history").insert({
    order_id: order.id,
    status: "New",
    note: "Order placed by customer",
  });
  return NextResponse.json({ order });
}
