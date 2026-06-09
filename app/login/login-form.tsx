import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/form";
import { signIn } from "./actions";

export function LoginForm() {
  return (
    <form action={signIn} className="mt-6 grid gap-4">
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
      <Button>Login</Button>
    </form>
  );
}
