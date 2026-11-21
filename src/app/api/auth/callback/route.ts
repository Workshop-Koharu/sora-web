import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

function getSessionsDir(): string {
  const root = process.cwd();
  const p = path.resolve(root, "../data/sessions");
  try {
    fs.mkdirSync(p, { recursive: true });
  } catch {}
  return p;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/?error=missing_code", req.url));
  }

  const clientId = process.env.DISCORD_CLIENT_ID || "1558397761861451805";
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI || "https://sora.koharu.live/api/auth/callback";

  if (!clientSecret) {
    console.error("Missing DISCORD_CLIENT_SECRET environment variable");
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
    const rawGuilds = (await guildsRes.json()) as any[];

    // Filter guilds where user has Administrator (0x8) or ManageGuild (0x20) or Owner
    const adminGuilds = Array.isArray(rawGuilds)
      ? rawGuilds.filter((g: any) => {
          const perms = BigInt(g.permissions || 0);
          const isAdmin = (perms & BigInt(0x8)) === BigInt(0x8);
          const canManage = (perms & BigInt(0x20)) === BigInt(0x20);
          return isAdmin || canManage || g.owner;
        })
      : [];

    const mappedGuilds = adminGuilds.map((g: any) => ({
      id: g.id,
      name: g.name,
      icon: g.icon,
      owner: !!g.owner,
    }));

    // 4. Save server-side session file as fallback
    try {
      const sessionsDir = getSessionsDir();
      fs.writeFileSync(
        path.join(sessionsDir, `${user.id}.json`),
        JSON.stringify(
          {
            user: {
              id: user.id,
              username: user.username,
              global_name: user.global_name || user.username,
              avatar: user.avatar,
            },
            guilds: mappedGuilds,
            accessToken,
            updatedAt: new Date().toISOString(),
          },
          null,
          2
        ),
        "utf-8"
      );
    } catch (e) {
      console.warn("Session file write warning:", e);
    }

    // 5. Store session in cookie directly for 100% Vercel serverless persistence
    const sessionPayload = {
      user: {
        id: user.id,
        username: user.username,
        global_name: user.global_name || user.username,
        avatar: user.avatar,
      },
      guilds: mappedGuilds.slice(0, 30),
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
