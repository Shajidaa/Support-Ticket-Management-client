"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { AppHeader } from "@/components/layout/app-header";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { TicketTable } from "@/components/tickets/ticket-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTickets } from "@/hooks/use-tickets";
import { useAuth } from "@/providers/auth-provider";
import type { TicketPriority, TicketStatus } from "@/lib/types/ticket";

export default function TicketsPage() {
  const { isCustomer } = useAuth();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TicketStatus | "all">("all");
  const [priority, setPriority] = useState<TicketPriority | "all">("all");

  const { data: tickets = [], isLoading, error } = useTickets(
    {
      status: status === "all" ? "" : status,
      priority: priority === "all" ? "" : priority,
    },
    status === "all",
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return tickets;
    return tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(term) ||
        ticket.description.toLowerCase().includes(term),
    );
  }, [tickets, search]);

  return (
    <>
      <AppHeader
        title="Tickets"
        description="Filter, search, and open tickets in your queue."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex flex-col gap-3">
          {isCustomer ? (
            <div className="flex justify-end">
              <Button asChild>
                <Link href="/tickets/new">New ticket</Link>
              </Button>
            </div>
          ) : null}
          <TicketFilters
            search={search}
            status={status}
            priority={priority}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
          />
        </div>
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load tickets</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : "Please try again."}
            </AlertDescription>
          </Alert>
        ) : null}
        {isLoading ? <Skeleton className="h-80" /> : <TicketTable tickets={filtered} />}
      </div>
    </>
  );
}
