import { NextResponse } from "next/server";

import { setAuthCookies } from "@/lib/auth/cookies";
import { backendRequest } from "@/lib/api/backend";
import { decodeAccessToken } from "@/lib/auth/jwt";
import { ApiRequestError } from "@/lib/types/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await backendRequest<{
      accessToken: string;
      refreshToken: string;
    }>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    await setAuthCookies(data);

    const user = decodeAccessToken(data.accessToken);

    return NextResponse.json({
      success: true,
      message: "Signed in successfully",
      data: user,
    });
  } catch (error) {
    const status = error instanceof ApiRequestError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Unable to sign in.";
    return NextResponse.json({ success: false, message }, { status });
  }
}
