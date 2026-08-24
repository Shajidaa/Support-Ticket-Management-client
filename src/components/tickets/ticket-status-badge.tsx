import { cn } from "@/lib/utils";
import type { TicketStatus } from "@/lib/types/ticket";
import { Badge } from "@/components/ui/badge";

const statusStyles: Record<TicketStatus, string> = {
  Open: "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300",
  "In Progress":
    "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Resolved: "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Closed: "border-transparent bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return (
    <Badge variant="outline" className={cn(statusStyles[status])}>
      {status}
    </Badge>
  );
}
