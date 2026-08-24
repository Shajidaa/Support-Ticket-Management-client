import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession =
    Boolean(request.cookies.get("accessToken")?.value) ||
    Boolean(request.cookies.get("refreshToken")?.value);

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (!hasSession && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
