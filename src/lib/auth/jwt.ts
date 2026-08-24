import type { AuthUser } from "@/lib/types/user";

function decodeBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLength);

  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64").toString("utf-8");
  }

  return decodeURIComponent(
    atob(base64)
      .split("")
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join(""),
  );
}

export function decodeAccessToken(token: string): AuthUser | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const parsed = JSON.parse(decodeBase64Url(payload)) as AuthUser & {
      exp?: number;
    };

    if (!parsed.id || !parsed.email || !parsed.role) return null;
    if (parsed.exp && parsed.exp * 1000 < Date.now()) return null;

    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
    };
  } catch {
    return null;
  }
}
