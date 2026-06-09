"use client";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function LoginForm({ initialError = "" }: { initialError?: string }) {
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(form.get("email")),
        password: String(form.get("password")),
      }),
    });
    const result = (await response.json()) as { error?: string };
    setLoading(false);
    if (!response.ok) return setError(result.error || "Login failed");
    router.push("/dashboard");
    router.refresh();
  }
  return (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      <Field label="Email">
        <input className={inputClass} name="email" type="email" required />
      </Field>
      <Field label="Password">
        <input
          className={inputClass}
          name="password"
          type="password"
          required
        />
      </Field>
      {error && (
        <div className="rounded-2xl bg-red-500/15 p-3 text-sm text-red-200">
          {error}
        </div>
      )}
      <Button disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>
    </form>
  );
}
