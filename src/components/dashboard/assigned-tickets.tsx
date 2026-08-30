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
import { Skeleton } from "@/components/ui/skeleton";
import { useAssignedTickets } from "@/hooks/use-tickets";
import { formatDate, getUserName } from "@/lib/format";

export function AssignedTickets() {
    const { data: tickets = [], isLoading } = useAssignedTickets();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Assigned to me</CardTitle>
                <CardDescription>
                    {isLoading ? "Loading…" : `${tickets.length} ticket${tickets.length === 1 ? "" : "s"} in your queue`}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
                {isLoading ? (
                    <>
                        <Skeleton className="h-16" />
                        <Skeleton className="h-16" />
                        <Skeleton className="h-16" />
                    </>
                ) : tickets.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No tickets assigned to you.</p>
                ) : (
                    tickets.map((ticket) => (
                        <Link
                            key={ticket._id}
                            href={`/tickets/${ticket._id}`}
                            className="flex items-start justify-between gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                        >
                            <div className="min-w-0">
                                <p className="truncate font-medium">{ticket.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {getUserName(ticket.customer)} · {formatDate(ticket.updatedAt)}
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
