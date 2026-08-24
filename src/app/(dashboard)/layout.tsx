import { AppSidebar } from "@/components/layout/app-sidebar";
import { AuthGuard } from "@/components/layout/auth-guard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
