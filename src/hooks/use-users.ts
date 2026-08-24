"use client";

import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/lib/api/users";

export function useStaff() {
    return useQuery({
        queryKey: ["staff"],
        queryFn: userApi.listStaff,
    });
}
