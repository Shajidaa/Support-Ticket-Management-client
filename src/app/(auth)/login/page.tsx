import { LoginForm } from "@/components/auth/login-form";
import { APP_NAME } from "@/lib/constants";

export default function LoginPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Access your {APP_NAME} workspace.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
