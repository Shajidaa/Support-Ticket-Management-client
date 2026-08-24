import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl font-semibold">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Register as a customer or staff member.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
