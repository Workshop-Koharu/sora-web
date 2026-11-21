import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

function getSessionsDir(): string {
  const root = process.cwd();
  const p = path.resolve(root, "../data/sessions");
  fs.mkdirSync(p, { recursive: true });
  return p;
}

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

    // Filter guilds where user has Administrator (0x8) or ManageGuild (0x20) or Owner
    const adminGuilds = Array.isArray(guilds)
      ? guilds.filter((g: any) => {
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
      owner: g.owner,
      permissions: g.permissions,
    }));

    // 4. Save server-side session file to prevent 4KB cookie overflow
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
      console.error("Failed to save session file:", e);
    }

    // 5. Set compact lightweight cookie (Only ~180 bytes, fits 100% in 4KB limit)
    const clientPayload = {
      id: user.id,
      username: user.username,
      global_name: user.global_name || user.username,
      avatar: user.avatar,
      token: accessToken,
    };

    const res = NextResponse.redirect(new URL("/dashboard", req.url));

    res.cookies.set("sora_user", JSON.stringify(clientPayload), {
      httpOnly: false,
      secure: false, // works seamlessly on both http localhost & https
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    console.error("OAuth2 error:", err);
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(err.message)}`, req.url));
  }
}
