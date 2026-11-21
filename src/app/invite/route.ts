import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.redirect(
    "https://discord.com/oauth2/authorize?client_id=1558397761861451805&permissions=0&integration_type=0&scope=bot%20applications.commands",
    {
      status: 307,
    }
  );
}
