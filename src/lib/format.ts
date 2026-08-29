import type { TicketUserRef } from "@/lib/types/ticket";
import type { PopulatedUser } from "@/lib/types/user";

export function formatDate(value?: string) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function isPopulatedUser(value: TicketUserRef | null | undefined): value is PopulatedUser {
  return value !== null && value !== undefined && typeof value === "object" && "name" in value;
}

export function getUserName(value: TicketUserRef | null | undefined, fallback = "Unknown") {
  if (!value) return fallback;
  if (typeof value === "string") return fallback;
  return value.name || fallback;
}

export function getUserEmail(value: TicketUserRef | null | undefined) {
  if (!value || typeof value === "string") return "";
  return value.email;
}

export function getUserId(value: TicketUserRef | null | undefined) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value._id;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
