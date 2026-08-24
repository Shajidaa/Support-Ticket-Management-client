import { apiClient } from "@/lib/api/client";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/lib/types/user";

export const authApi = {
  login: (payload: LoginPayload) => apiClient.post<undefined>("/api/auth/login", payload),
  register: (payload: RegisterPayload) =>
    apiClient.post<undefined>("/api/auth/register", payload),
  logout: () => apiClient.post<undefined>("/api/auth/logout"),
  session: () => apiClient.get<AuthUser>("/api/auth/session"),
};
