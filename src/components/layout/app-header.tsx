"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";

export function AppHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-heading text-sm font-semibold">{title}</h1>
        {description ? (
          <p className="truncate text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <ThemeToggle />
      <UserMenu />
    </header>
  );
}
