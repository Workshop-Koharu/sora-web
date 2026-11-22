import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/?error=missing_code", req.url));
  }

  const clientId = process.env.DISCORD_CLIENT_ID || "1558397761861451806";
  const clientSecret = process.env.DISCORD_CLIENT_SECRET || "8lK6v8DuvLK3W1pgpv3MbyJ6gk8s-kmk";
  const redirectUri = process.env.DISCORD_REDIRECT_URI || "https://sora.koharu.live/api/auth/callback";

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

    // 3. Store session in cookie (Lightweight payload to NEVER exceed 4096-byte limit)
    const sessionPayload = {
      user: {
        id: user.id,
        username: user.username,
        global_name: user.global_name || user.username,
        avatar: user.avatar,
      },
      token: accessToken,
    };

    const isSecure = req.nextUrl.protocol === "https:";
    const res = NextResponse.redirect(new URL("/dashboard?login=success", req.url));

    res.cookies.set("sora_session", JSON.stringify(sessionPayload), {
      httpOnly: false,
      secure: isSecure,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    });

    res.cookies.set("sora_user", JSON.stringify({
      id: user.id,
      username: user.username,
      global_name: user.global_name || user.username,
      avatar: user.avatar,
      token: accessToken,
    }), {
      httpOnly: false,
      secure: isSecure,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    console.error("OAuth2 error:", err);
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(err.message)}`, req.url));
  }
}
