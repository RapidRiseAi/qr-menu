import { APP_CONFIG } from "@/lib/constants";
import { LoginForm } from "./login-form";
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#2b2416,#0d0d0f_50%)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-glow backdrop-blur">
        <h1 className="text-3xl font-black">Branch login</h1>
        <p className="mt-2 text-white/60">
          Demo: {APP_CONFIG.demoEmail} / {APP_CONFIG.demoPassword}
        </p>
        <LoginForm initialError={error} />
      </div>
    </main>
  );
}
