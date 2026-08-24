import { NextResponse } from "next/server";

import { refreshSessionAccessToken } from "@/lib/api/session";

export async function POST() {
  const accessToken = await refreshSessionAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: "Session expired. Please sign in again." },
      { status: 401 },
    );
  }

  return NextResponse.json({ success: true, message: "Session refreshed" });
}
