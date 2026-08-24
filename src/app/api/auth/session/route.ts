import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/api/session";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthenticated" },
      { status: 401 },
    );
  }

  return NextResponse.json({ success: true, data: user });
}
