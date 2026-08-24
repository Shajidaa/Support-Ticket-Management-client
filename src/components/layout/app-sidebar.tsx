"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeadsetIcon,
  LayoutDashboardIcon,
  PlusIcon,
  TicketIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/lib/constants";
import { useAuth } from "@/providers/auth-provider";

export function AppSidebar() {
  const pathname = usePathname();
  const { isCustomer } = useAuth();

  const items = [
    {
      href: "/",
      label: "Overview",
      icon: LayoutDashboardIcon,
    },
    {
      href: "/tickets",
      label: "Tickets",
      icon: TicketIcon,
    },
    ...(isCustomer
      ? [
          {
            href: "/tickets/new",
            label: "New ticket",
            icon: PlusIcon,
          },
        ]
      : []),
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-4">
        <Link href="/" className="flex items-center gap-2 px-1">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeadsetIcon className="size-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-sm font-semibold">{APP_NAME}</span>
            <span className="text-xs text-muted-foreground">Support desk</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 pb-4 text-xs text-muted-foreground">
        Role-aware helpdesk for customers and staff.
      </SidebarFooter>
    </Sidebar>
  );
}
