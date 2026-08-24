"use client";

import Link from "next/link";

import { TicketPriorityBadge } from "@/components/tickets/ticket-priority-badge";
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { Ticket } from "@/lib/types/ticket";

export function RecentTickets({ tickets }: { tickets: Ticket[] }) {
  const recent = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Latest tickets in your workspace</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tickets to show.</p>
        ) : (
          recent.map((ticket) => (
            <Link
              key={ticket._id}
              href={`/tickets/${ticket._id}`}
              className="flex items-start justify-between gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{ticket.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(ticket.updatedAt)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <TicketStatusBadge status={ticket.status} />
                <TicketPriorityBadge priority={ticket.priority} />
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
