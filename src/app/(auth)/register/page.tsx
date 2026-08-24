import { RegisterForm } from "@/components/auth/register-form";
import { BorderBeam } from "@/components/ui/border-beam";

export default function RegisterPage() {
  return (
    <div className="relative h-125 w-full overflow-hidden">
 <div className="grid gap-6 p-2 ">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl font-semibold">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Register as a customer or staff member.
        </p>
      </div>
      <RegisterForm />
      
    </div>
      <BorderBeam />
    </div>
   
  );
}
