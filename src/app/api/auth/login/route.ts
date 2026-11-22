import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID || "1558397761861451806";
  const redirectUri = process.env.DISCORD_REDIRECT_URI || "https://sora.koharu.live/api/auth/callback";

  // Scopes: identify (user details) + guilds (servers list)
  const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=identify%20guilds`;

  return NextResponse.redirect(discordAuthUrl);
}
