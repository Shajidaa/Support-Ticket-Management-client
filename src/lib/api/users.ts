import { apiClient } from "@/lib/api/client";
import type { PopulatedUser } from "@/lib/types/user";

export const userApi = {
    listStaff: () => apiClient.get<PopulatedUser[]>("/api/v1/user"),
};
