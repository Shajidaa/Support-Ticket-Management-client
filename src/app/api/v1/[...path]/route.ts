import { NextRequest, NextResponse } from "next/server";

import { API_BASE_URL } from "@/lib/api/backend";
import { getValidAccessToken } from "@/lib/api/session";
import { clearAuthCookies } from "@/lib/auth/cookies";

async function proxy(request: NextRequest, path: string[]) {
  const accessToken = await getValidAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 401,
        message: "You are not logged in. Please log in to access this resource.",
      },
      { status: 401 },
    );
  }

  const search = request.nextUrl.search;
  const target = `${API_BASE_URL}/api/v1/${path.join("/")}${search}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);

  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: body || undefined,
    cache: "no-store",
  });

  if (response.status === 401) {
    await clearAuthCookies();
  }

  const payload = await response.text();
  return new NextResponse(payload, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}
