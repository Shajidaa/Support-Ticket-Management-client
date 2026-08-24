import { apiClient } from "@/lib/api/client";
import { TICKET_STATUSES } from "@/lib/constants";
import type {
  AssignTicketPayload,
  CreateTicketPayload,
  Ticket,
  TicketComment,
  TicketListQuery,
  UpdateTicketPayload,
} from "@/lib/types/ticket";

function toSearchParams(query?: TicketListQuery) {
  const params = new URLSearchParams();
  if (query?.status) params.set("status", query.status);
  if (query?.priority) params.set("priority", query.priority);
  if (query?.assignedTo) params.set("assignedTo", query.assignedTo);
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const ticketApi = {
  list: (query?: TicketListQuery) =>
    apiClient.get<Ticket[]>(`/api/v1/ticket${toSearchParams(query)}`),
  listAllStatuses: async (query?: Omit<TicketListQuery, "status">) => {
    const groups = await Promise.all(
      TICKET_STATUSES.map((status) => ticketApi.list({ ...query, status })),
    );
    const tickets = groups.flat();
    const unique = new Map(tickets.map((ticket) => [ticket._id, ticket]));
    return Array.from(unique.values());
  },
  getById: (id: string) => apiClient.get<Ticket>(`/api/v1/ticket/${id}`),
  create: (payload: CreateTicketPayload) =>
    apiClient.post<Ticket>("/api/v1/ticket", payload),
  update: (id: string, payload: UpdateTicketPayload) =>
    apiClient.patch<Ticket>(`/api/v1/ticket/${id}`, payload),
  remove: (id: string) => apiClient.delete<null>(`/api/v1/ticket/${id}`),
  assign: (id: string, payload: AssignTicketPayload) =>
    apiClient.patch<Ticket>(`/api/v1/ticket/${id}/assign`, payload),
  comments: (id: string) =>
    apiClient.get<TicketComment[]>(`/api/v1/ticket/${id}/comments`),
  addComment: (id: string, content: string) =>
    apiClient.post<TicketComment>(`/api/v1/ticket/${id}/comments`, { content }),
};
