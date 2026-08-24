export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "HelpDesk";

export const TICKET_STATUSES = [
  "Open",
  "In Progress",
  "Resolved",
  "Closed",
] as const;

export const TICKET_PRIORITIES = ["Low", "Medium", "High"] as const;

export const USER_ROLES = ["Customer", "Staff"] as const;
