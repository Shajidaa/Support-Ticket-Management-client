import { ApiRequestError, type ApiResponse } from "@/lib/types/api";

export const API_BASE_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function backendRequest<T>(
  path: string,
  init: RequestInit & { accessToken?: string; refreshToken?: string } = {},
): Promise<T> {
  const { accessToken, refreshToken, headers, ...rest } = init;
  const requestHeaders = new Headers(headers);

  if (rest.body && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  if (refreshToken) {
    requestHeaders.set("Cookie", `refreshToken=${refreshToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: requestHeaders,
    cache: "no-store",

  });

  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    throw new ApiRequestError(
      payload?.message ?? "Something went wrong. Please try again.",
      payload?.statusCode ?? response.status,
    );
  }

  return payload.data;
}
