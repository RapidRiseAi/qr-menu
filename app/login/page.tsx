import { LoginForm } from "./login-form";
export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-hennies-navy p-4">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-hennies-blue p-6 shadow-aqua">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-hennies-aqua">
          Branch login
        </p>
        <h1 className="mt-2 text-4xl font-black text-white">Welcome back</h1>
        <p className="mt-2 text-white/65">
          Use Supabase Auth for Super Admin and Branch Admin access. Demo routes
          also work without credentials for presentation.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
