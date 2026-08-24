import { cookies } from "next/headers";

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";

const isProduction = process.env.NODE_ENV === "production";

const baseCookie = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: isProduction,
  path: "/",
};

export async function setAuthCookies(tokens: {
  accessToken: string;
  refreshToken?: string;
}) {
  const store = await cookies();

  store.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...baseCookie,
    maxAge: 60 * 15,
  });

  if (tokens.refreshToken) {
    store.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
      ...baseCookie,
      maxAge: 60 * 60 * 24 * 7,
    });
  }
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS_TOKEN_COOKIE);
  store.delete(REFRESH_TOKEN_COOKIE);
}

export async function getAuthCookies() {
  const store = await cookies();
  return {
    accessToken: store.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: store.get(REFRESH_TOKEN_COOKIE)?.value,
  };
}
