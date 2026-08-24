import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TICKET_STATUSES } from "@/lib/constants";
import type { Ticket, TicketStatus } from "@/lib/types/ticket";
import { CircleDotIcon, Clock3Icon, CheckCircle2Icon, ArchiveIcon } from "lucide-react";

const icons: Record<TicketStatus, typeof CircleDotIcon> = {
  Open: CircleDotIcon,
  "In Progress": Clock3Icon,
  Resolved: CheckCircle2Icon,
  Closed: ArchiveIcon,
};

export function StatsCards({ tickets }: { tickets: Ticket[] }) {
  const counts = TICKET_STATUSES.reduce(
    (acc, status) => {
      acc[status] = tickets.filter((ticket) => ticket.status === status).length;
      return acc;
    },
    {} as Record<TicketStatus, number>,
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {TICKET_STATUSES.map((status) => {
        const Icon = icons[status];
        return (
          <Card key={status}>
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <Icon className="size-4" />
                {status}
              </CardDescription>
              <CardTitle className="font-heading text-3xl">{counts[status]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {status === "Open"
                  ? "Waiting for staff"
                  : status === "In Progress"
                    ? "Currently being handled"
                    : status === "Resolved"
                      ? "Ready to close"
                      : "Archived tickets"}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
