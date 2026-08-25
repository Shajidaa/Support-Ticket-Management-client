import { HeadsetIcon } from "lucide-react";

import { APP_NAME } from "@/lib/constants";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2 font-heading text-lg font-semibold">
          <HeadsetIcon className="size-5" />
          {APP_NAME}
        </div>
        <div className="max-w-md space-y-3">
          <h1 className="font-heading text-4xl leading-tight">
         
            Track, assign, and resolve support tickets in one place.
          </h1>
          <p className="text-sm text-primary-foreground/80">
            Customers open tickets. Staff pick them up, leave comments, and keep
            every conversation in one workflow.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/70">
          Production-ready helpdesk UI connected to the Support Ticket Management API.
        </p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
