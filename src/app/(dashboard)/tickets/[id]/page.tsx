"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { AppHeader } from "@/components/layout/app-header";
import { AssignTicketDialog } from "@/components/tickets/assign-ticket-dialog";
import { CommentThread } from "@/components/tickets/comment-thread";
import { TicketForm, type TicketFormValues } from "@/components/tickets/ticket-form";
import { TicketPriorityBadge } from "@/components/tickets/ticket-priority-badge";
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTicket, useTicketComments, useTicketMutations } from "@/hooks/use-tickets";
import { formatDate, getUserName } from "@/lib/format";
import { useAuth } from "@/providers/auth-provider";

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { isCustomer, isStaff } = useAuth();
  const { data: ticket, isLoading, error } = useTicket(id);
  const { data: comments = [] } = useTicketComments(id);
  const { updateTicket, deleteTicket } = useTicketMutations(id);
  const [editing, setEditing] = useState(false);

  const onUpdate = async (values: TicketFormValues) => {
    try {
      await updateTicket.mutateAsync({ id, payload: values });
      toast.success("Ticket updated");
      setEditing(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update ticket");
    }
  };

  const onDelete = async () => {
    try {
      await deleteTicket.mutateAsync(id);
      toast.success("Ticket deleted");
      router.push("/tickets");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete ticket");
    }
  };

  return (
    <>
      <AppHeader title={ticket?.title ?? "Ticket"} description="Conversation, status, and assignment" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load this ticket</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : "Please try again."}
            </AlertDescription>
          </Alert>
        ) : null}
        {isLoading || !ticket ? (
          <Skeleton className="h-96" />
        ) : (
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader className="flex-row items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="font-heading text-xl">{ticket.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Opened {formatDate(ticket.createdAt)} · Updated {formatDate(ticket.updatedAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {isCustomer ? (
                    <Button variant="outline" onClick={() => setEditing((value) => !value)}>
                      {editing ? "Cancel edit" : "Edit"}
                    </Button>
                  ) : null}
                  {isStaff ? <AssignTicketDialog ticketId={ticket._id} /> : null}
                  {isCustomer && ticket.status === "Closed" ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this ticket?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Only closed tickets can be deleted. This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                {editing ? (
                  <TicketForm
                    ticket={ticket}
                    submitLabel="Save changes"
                    isSubmitting={updateTicket.isPending}
                    onSubmit={onUpdate}
                    isOwner={isCustomer}
                  />
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-6">{ticket.description}</p>
                )}
                <CommentThread ticketId={ticket._id} comments={comments} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Status</span>
                  <TicketStatusBadge status={ticket.status} />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Priority</span>
                  <TicketPriorityBadge priority={ticket.priority} />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Customer</span>
                  <span>{getUserName(ticket.customer)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Assigned to</span>
                  <span>{getUserName(ticket.assignedTo, "Unassigned")}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
