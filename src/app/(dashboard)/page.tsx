"use client";

import { AppHeader } from "@/components/layout/app-header";
import { AssignedTickets } from "@/components/dashboard/assigned-tickets";
import { RecentTickets } from "@/components/dashboard/recent-tickets";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TicketStatusChart } from "@/components/dashboard/ticket-status-chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useTickets } from "@/hooks/use-tickets";
import { useAuth } from "@/providers/auth-provider";

export default function OverviewPage() {
  const { user, isStaff } = useAuth();
  const { data: tickets = [], isLoading, error } = useTickets({}, true);

  return (
    <>
      <AppHeader
        title="Overview"
        description={
          user
            ? `Welcome back, ${user.name}. ${isStaff ? "Staff queue and workload at a glance." : "Your support requests in one place."}`
            : undefined
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load tickets</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : "Please try again."}
            </AlertDescription>
          </Alert>
        ) : null}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-32" />
            ))}
          </div>
        ) : (
          <StatsCards tickets={tickets} />
        )}
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          {isLoading ? (
            <>
              <Skeleton className="h-80" />
              <Skeleton className="h-80" />
            </>
          ) : (
            <>
              <RecentTickets tickets={tickets} />
              <TicketStatusChart tickets={tickets} />
            </>
          )}
        </div>
        {isStaff ? <AssignedTickets /> : null}
      </div>
    </>
  );
}
