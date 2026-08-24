"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTicketMutations } from "@/hooks/use-tickets";
import { useStaff } from "@/hooks/use-users";
import { useAuth } from "@/providers/auth-provider";

export function AssignTicketDialog({ ticketId }: { ticketId: string }) {
  const { user } = useAuth();
  const { assignTicket } = useTicketMutations(ticketId);
  const { data: staffList, isLoading: loadingStaff } = useStaff();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const assign = async (id: string) => {
    try {
      await assignTicket.mutateAsync({ id: ticketId, staffId: id });
      toast.success("Ticket assigned");
      setOpen(false);
      setSelectedId("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to assign ticket");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Assign ticket</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign to staff</DialogTitle>
          <DialogDescription>
            Select a staff member to assign this ticket to.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 max-h-64 overflow-y-auto">
          {loadingStaff ? (
            <p className="text-sm text-muted-foreground py-2">Loading staff...</p>
          ) : staffList && staffList.length > 0 ? (
            staffList.map((staff) => (
              <button
                key={staff._id}
                type="button"
                onClick={() => setSelectedId(staff._id)}
                className={`flex flex-col items-start rounded-md border px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${selectedId === staff._id ? "border-primary bg-accent" : "border-border"
                  }`}
              >
                <span className="font-medium">{staff.name}</span>
                <span className="text-muted-foreground">{staff.email}</span>
              </button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-2">No staff members found.</p>
          )}
        </div>

        <DialogFooter>
          {user ? (
            <Button
              type="button"
              variant="secondary"
              disabled={assignTicket.isPending}
              onClick={() => assign(user.id)}
            >
              Assign to me
            </Button>
          ) : null}
          <Button
            type="button"
            disabled={assignTicket.isPending || !selectedId}
            onClick={() => assign(selectedId)}
          >
            {assignTicket.isPending ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
