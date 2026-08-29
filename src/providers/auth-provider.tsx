"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/lib/api/auth";
import type { AuthUser } from "@/lib/types/user";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isStaff: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: authApi.session,
    retry: false,

  });

  const user = data ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isStaff: user?.role === "Staff",
        isCustomer: user?.role === "Customer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
