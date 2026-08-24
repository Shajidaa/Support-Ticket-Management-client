import { ApiRequestError, type ApiResponse } from "@/lib/types/api";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, {
    ...init,
    headers,
    credentials: "include",
  });

  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  if (response.status === 401 && !path.startsWith("/api/auth/")) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  if (!response.ok || (payload && "success" in payload && payload.success === false)) {
    throw new ApiRequestError(
      payload?.message ?? "Request failed",
      payload?.statusCode ?? response.status,
    );
  }

  if (!payload || !("data" in payload)) {
    return undefined as T;
  }

  return payload.data;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
