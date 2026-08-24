"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { TicketPriorityBadge } from "@/components/tickets/ticket-priority-badge";
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, getUserName } from "@/lib/format";
import type { Ticket } from "@/lib/types/ticket";

export function TicketTable({ tickets }: { tickets: Ticket[] }) {
  const router = useRouter();

  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">No tickets found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different filter or create a new ticket.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow
            key={ticket._id}
            className="cursor-pointer"
            onClick={() => router.push(`/tickets/${ticket._id}`)}
          >
            <TableCell className="max-w-56 truncate font-medium">
              {ticket.title}
            </TableCell>
            <TableCell>{getUserName(ticket.customer)}</TableCell>
            <TableCell>{getUserName(ticket.assignedTo, "Unassigned")}</TableCell>
            <TableCell>
              <TicketStatusBadge status={ticket.status} />
            </TableCell>
            <TableCell>
              <TicketPriorityBadge priority={ticket.priority} />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(ticket.updatedAt)}
            </TableCell>
            <TableCell className="text-right">
              <Button asChild variant="ghost" size="sm" onClick={(event) => event.stopPropagation()}>
                <Link href={`/tickets/${ticket._id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
