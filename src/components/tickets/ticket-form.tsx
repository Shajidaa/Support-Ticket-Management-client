"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TICKET_PRIORITIES, TICKET_STATUSES } from "@/lib/constants";
import type { Ticket } from "@/lib/types/ticket";

const ticketSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(TICKET_STATUSES),
  priority: z.enum(TICKET_PRIORITIES),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;

// Statuses a ticket owner (customer) can set when editing
const OWNER_EDITABLE_STATUSES = ["Resolved", "Closed"] as const;

export function TicketForm({
  ticket,
  submitLabel,
  onSubmit,
  isSubmitting,
  isOwner = false,
}: {
  ticket?: Ticket;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (values: TicketFormValues) => Promise<void> | void;
  isOwner?: boolean;
}) {
  const isEditing = Boolean(ticket);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: ticket?.title ?? "",
      description: ticket?.description ?? "",
      status: ticket?.status ?? "Open",
      priority: ticket?.priority ?? "Medium",
    },
  });

  return (
    <form
      className="grid gap-4"
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...form.register("title")} />
        {form.formState.errors.title ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.title.message}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={6} {...form.register("description")} />
        {form.formState.errors.description ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.description.message}
          </p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Status</Label>
          {isEditing && isOwner ? (
            // Owner editing: can only move to Resolved or Closed
            <Select
              value={form.watch("status")}
              onValueChange={(value) =>
                form.setValue("status", value as TicketFormValues["status"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OWNER_EDITABLE_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            // Creating a ticket or non-owner: status is locked to current value
            <Input
              id="status"
              value={ticket?.status ?? "Open"}
              disabled
              className="w-full bg-muted cursor-not-allowed"
            />
          )}
        </div>
        <div className="grid gap-2">
          <Label>Priority</Label>
          <Select
            value={form.watch("priority")}
            onValueChange={(value) =>
              form.setValue("priority", value as TicketFormValues["priority"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TICKET_PRIORITIES.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
