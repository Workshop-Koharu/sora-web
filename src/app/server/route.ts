import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.redirect("https://discord.gg/rnD8HQDDz3", {
    status: 307,
  });
}
