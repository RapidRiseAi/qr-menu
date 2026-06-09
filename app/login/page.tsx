import { APP_CONFIG } from "@/lib/constants";
import { LoginForm } from "./login-form";
export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#2b2416,#0d0d0f_50%)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-glow backdrop-blur">
        <h1 className="text-3xl font-black">Branch login</h1>
        <p className="mt-2 text-white/60">
          Demo: {APP_CONFIG.demoEmail} / {APP_CONFIG.demoPassword}
        </p>
        <LoginForm />
        <p className="mt-4 text-sm text-red-300">
          Check the URL query for membership errors after login.
        </p>
      </div>
    </main>
  );
}
