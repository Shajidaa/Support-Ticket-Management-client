"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AppHeader } from "@/components/layout/app-header";
import { TicketForm, type TicketFormValues } from "@/components/tickets/ticket-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTicketMutations } from "@/hooks/use-tickets";
import { useAuth } from "@/providers/auth-provider";

export default function NewTicketPage() {
  const { isCustomer, isLoading } = useAuth();
  const router = useRouter();
  const { createTicket } = useTicketMutations();

  const onSubmit = async (values: TicketFormValues) => {
    try {
      const ticket = await createTicket.mutateAsync(values);
      toast.success("Ticket created");
      router.push(`/tickets/${ticket._id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create ticket");
    }
  };

  return (
    <>
      <AppHeader
        title="New ticket"
        description="Open a support request. Only customers can create tickets."
      />
      <div className="flex flex-1 justify-center p-4 md:p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Ticket details</CardTitle>
          </CardHeader>
          <CardContent>
            {!isLoading && !isCustomer ? (
              <Alert>
                <AlertTitle>Staff accounts cannot open tickets</AlertTitle>
                <AlertDescription>
                  Use the tickets list to assign and comment on existing work.
                </AlertDescription>
              </Alert>
            ) : (
              <TicketForm
                submitLabel="Create ticket"
                isSubmitting={createTicket.isPending}
                onSubmit={onSubmit}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
