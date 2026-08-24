import { cn } from "@/lib/utils";
import type { TicketPriority } from "@/lib/types/ticket";
import { Badge } from "@/components/ui/badge";

const priorityStyles: Record<TicketPriority, string> = {
  Low: "border-transparent bg-muted text-muted-foreground",
  Medium: "border-transparent bg-orange-500/10 text-orange-700 dark:text-orange-300",
  High: "border-transparent bg-red-500/10 text-red-700 dark:text-red-300",
};

export function TicketPriorityBadge({ priority }: { priority: TicketPriority }) {
  return (
    <Badge variant="outline" className={cn(priorityStyles[priority])}>
      {priority}
    </Badge>
  );
}
