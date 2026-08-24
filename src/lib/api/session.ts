import { decodeAccessToken } from "@/lib/auth/jwt";
import {
  clearAuthCookies,
  getAuthCookies,
  setAuthCookies,
} from "@/lib/auth/cookies";
import { backendRequest } from "@/lib/api/backend";
import type { AuthUser } from "@/lib/types/user";

export async function refreshSessionAccessToken() {
  const { refreshToken } = await getAuthCookies();
  if (!refreshToken) return null;

  try {
    const data = await backendRequest<{ accessToken: string }>(
      "/api/v1/auth/refresh-token",
      {
        method: "POST",
        refreshToken,
      },
    );

    await setAuthCookies({ accessToken: data.accessToken });
    return data.accessToken;
  } catch {
    await clearAuthCookies();
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { accessToken } = await getAuthCookies();
  if (!accessToken) {
    const refreshed = await refreshSessionAccessToken();
    return refreshed ? decodeAccessToken(refreshed) : null;
  }

  const user = decodeAccessToken(accessToken);
  if (user) return user;

  const refreshed = await refreshSessionAccessToken();
  return refreshed ? decodeAccessToken(refreshed) : null;
}

export async function getValidAccessToken() {
  const { accessToken } = await getAuthCookies();
  if (accessToken && decodeAccessToken(accessToken)) {
    return accessToken;
  }

  return refreshSessionAccessToken();
}
