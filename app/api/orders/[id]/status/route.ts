import { ORDER_STATUSES } from "@/lib/constants";
import { requireBranchUser } from "@/lib/auth/branch";
import { NextResponse } from "next/server";
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { supabase, user, branch } = await requireBranchUser();
  const { status } = await request.json();
  if (!ORDER_STATUSES.includes(status))
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .eq("branch_id", branch.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  await supabase
    .from("order_status_history")
    .insert({ order_id: id, status, changed_by: user.id });
  return NextResponse.json({ ok: true });
}
