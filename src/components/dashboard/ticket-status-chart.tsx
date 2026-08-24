"use client";

import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TICKET_STATUSES } from "@/lib/constants";
import type { Ticket } from "@/lib/types/ticket";

const chartConfig = {
  Open: { label: "Open", color: "var(--chart-1)" },
  "In Progress": { label: "In Progress", color: "var(--chart-2)" },
  Resolved: { label: "Resolved", color: "var(--chart-3)" },
  Closed: { label: "Closed", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function TicketStatusChart({ tickets }: { tickets: Ticket[] }) {
  const data = TICKET_STATUSES.map((status) => ({
    status,
    count: tickets.filter((ticket) => ticket.status === status).length,
  })).filter((item) => item.count > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status mix</CardTitle>
        <CardDescription>Distribution of tickets by workflow stage</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No ticket data yet.
          </p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-72">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={data} dataKey="count" nameKey="status" innerRadius={48}>
                {data.map((entry) => (
                  <Cell key={entry.status} fill={`var(--chart-${TICKET_STATUSES.indexOf(entry.status as typeof TICKET_STATUSES[number]) + 1})`} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
