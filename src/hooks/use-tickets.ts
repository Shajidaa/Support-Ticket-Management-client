"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ticketApi } from "@/lib/api/tickets";
import type { TicketListQuery } from "@/lib/types/ticket";

export function useAssignedTickets() {
  return useQuery({
    queryKey: ["tickets", "assigned"],
    queryFn: ticketApi.listAssigned,
  });
}

export function useTickets(query: TicketListQuery, fetchAllStatuses: boolean) {
  return useQuery({
    queryKey: ["tickets", query, fetchAllStatuses],
    queryFn: () =>
      fetchAllStatuses
        ? ticketApi.listAllStatuses({
          priority: query.priority,
          assignedTo: query.assignedTo,
        })
        : ticketApi.list(query),
  });
}

export function useTicket(id: string) {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => ticketApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useTicketComments(id: string) {
  return useQuery({
    queryKey: ["ticket-comments", id],
    queryFn: () => ticketApi.comments(id),
    enabled: Boolean(id),
  });
}

export function useTicketMutations(ticketId?: string) {
  const queryClient = useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tickets"] });
    if (ticketId) {
      await queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      await queryClient.invalidateQueries({
        queryKey: ["ticket-comments", ticketId],
      });
    }
  };

  const createTicket = useMutation({
    mutationFn: ticketApi.create,
    onSuccess: invalidate,
  });

  const updateTicket = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof ticketApi.update>[1] }) =>
      ticketApi.update(id, payload),
    onSuccess: invalidate,
  });

  const deleteTicket = useMutation({
    mutationFn: ticketApi.remove,
    onSuccess: invalidate,
  });

  const assignTicket = useMutation({
    mutationFn: ({ id, staffId }: { id: string; staffId: string }) =>
      ticketApi.assign(id, { staffId }),
    onSuccess: invalidate,
  });

  const addComment = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      ticketApi.addComment(id, content),
    onSuccess: invalidate,
  });

  return {
    createTicket,
    updateTicket,
    deleteTicket,
    assignTicket,
    addComment,
  };
}
