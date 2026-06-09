"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Signing in…");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(
        `${error.message} — using demo mode? Open dashboard directly.`,
      );
      return;
    }
    router.push("/dashboard");
  }
  return (
    <form onSubmit={submit} className="mt-6 grid gap-3">
      <input
        className="rounded-2xl px-4 py-3"
        placeholder="admin@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="rounded-2xl px-4 py-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Log in</Button>
      <Button href="/dashboard" variant="ghost">
        Continue to demo dashboard
      </Button>
      {message && <p className="text-sm text-white/65">{message}</p>}
    </form>
  );
}
