"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TICKET_PRIORITIES, TICKET_STATUSES } from "@/lib/constants";
import type { TicketPriority, TicketStatus } from "@/lib/types/ticket";

interface TicketFiltersProps {
  search: string;
  status: TicketStatus | "all";
  priority: TicketPriority | "all";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TicketStatus | "all") => void;
  onPriorityChange: (value: TicketPriority | "all") => void;
}

export function TicketFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}: TicketFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tickets..."
      />
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as TicketStatus | "all")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {TICKET_STATUSES.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={priority}
        onValueChange={(value) =>
          onPriorityChange(value as TicketPriority | "all")
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          {TICKET_PRIORITIES.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
