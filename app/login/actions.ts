"use server";

import { redirect } from "next/navigation";
import { ensureDemoBranchAdmin, isDemoBranchCredential } from "@/lib/auth/demo";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/login?error=Email%20and%20password%20are%20required");
  }

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
      redirect(
        `/login?error=${encodeURIComponent(`Demo account setup failed: ${message}`)}`,
      );
    }
  }

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}
