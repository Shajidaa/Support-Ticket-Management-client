import type { PopulatedUser } from "@/lib/types/user";

export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High";

export type TicketUserRef = string | PopulatedUser;

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  customer: TicketUserRef;
  assignedTo?: TicketUserRef | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketComment {
  _id: string;
  ticket: string;
  user: TicketUserRef;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketListQuery {
  status?: TicketStatus | "";
  priority?: TicketPriority | "";
  assignedTo?: string;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}

export interface UpdateTicketPayload {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}

export interface AssignTicketPayload {
  staffId: string;
}
