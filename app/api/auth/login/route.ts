import { isDemoBranchCredential, ensureDemoBranchAdmin } from "@/lib/auth/demo";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim();
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  let { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error && isDemoBranchCredential(email, password)) {
    try {
      await ensureDemoBranchAdmin();
      ({ error } = await supabase.auth.signInWithPassword({ email, password }));
    } catch (demoError) {
      const message =
        demoError instanceof Error
          ? demoError.message
          : "Unable to prepare the demo account.";

      return NextResponse.json(
        { error: `Demo account setup failed: ${message}` },
        { status: 500 },
      );
    }
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
