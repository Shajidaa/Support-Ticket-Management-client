"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading) {
    return (
      <div className="grid gap-4 p-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}
