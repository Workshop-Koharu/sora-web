import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/?error=missing_code", req.url));
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI || "https://sora.koharu.live/api/auth/callback";

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/?error=credentials_missing", req.url));
  }

  try {
    // 1. Exchange code for access_token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("Token exchange failed:", err);
      return NextResponse.redirect(new URL("/?error=token_failed", req.url));
    }

    const tokenData = (await tokenRes.json()) as any;
    const accessToken = tokenData.access_token;

    // 2. Fetch User Profile
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const user = await userRes.json();

    // 3. Fetch User Guilds
    const guildsRes = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const guilds = (await guildsRes.json()) as any[];

    // Filter guilds where user has Administrator (0x8) or ManageGuild (0x20)
    const adminGuilds = guilds.filter((g: any) => {
      const perms = BigInt(g.permissions);
      const isAdmin = (perms & BigInt(0x8)) === BigInt(0x8);
      const canManage = (perms & BigInt(0x20)) === BigInt(0x20);
      return isAdmin || canManage || g.owner;
    });

    // 4. Create response and store in cookie
    const sessionData = {
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      },
      guilds: adminGuilds.map((g: any) => ({
        id: g.id,
        name: g.name,
        icon: g.icon,
        owner: g.owner,
      })),
      accessToken,
    };

    const res = NextResponse.redirect(new URL("/dashboard", req.url));
    res.cookies.set("sora_session", JSON.stringify(sessionData), {
      httpOnly: false, // Accessible to client dashboard for quick hydration
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("OAuth2 error:", err);
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(err.message)}`, req.url));
  }
}
