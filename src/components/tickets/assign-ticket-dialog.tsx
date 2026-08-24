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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTicketMutations } from "@/hooks/use-tickets";
import { useAuth } from "@/providers/auth-provider";

export function AssignTicketDialog({ ticketId }: { ticketId: string }) {
  const { user } = useAuth();
  const { assignTicket } = useTicketMutations(ticketId);
  const [open, setOpen] = useState(false);
  const [staffId, setStaffId] = useState(user?.id ?? "");

  const assign = async (id: string) => {
    try {
      await assignTicket.mutateAsync({ id: ticketId, staffId: id });
      toast.success("Ticket assigned");
      setOpen(false);
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
            The backend expects a staff user id. You can assign this ticket to
            yourself or another staff member.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="staffId">Staff user id</Label>
          <Input
            id="staffId"
            value={staffId}
            onChange={(event) => setStaffId(event.target.value)}
            placeholder="Mongo user id"
          />
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
            disabled={assignTicket.isPending || !staffId.trim()}
            onClick={() => assign(staffId.trim())}
          >
            {assignTicket.isPending ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
