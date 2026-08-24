export type UserRole = "Customer" | "Staff";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface PopulatedUser {
  _id: string;
  name: string;
  email: string;
  role?: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
