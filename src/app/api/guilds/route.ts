import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const KCS_DEFAULT_GUILD = {
  id: "1569310289013379174",
  name: "KCS - Koharu Coding Server",
  icon: null,
  owner: true,
  botConfigured: true,
};

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("sora_session");
    const userCookie = req.cookies.get("sora_user");

    let user: any = null;
    let guilds: any[] = [];
    let accessToken = "";

    // 1. Parse session cookie
    if (sessionCookie) {
      try {
        const parsed = JSON.parse(sessionCookie.value);
        if (parsed.user) user = parsed.user;
        if (parsed.token) accessToken = parsed.token;
      } catch (e) {
        console.warn("Failed to parse sora_session cookie:", e);
      }
    }

    // 2. Parse user cookie fallback
    if (!user && userCookie) {
      try {
        const parsed = JSON.parse(userCookie.value);
        user = {
          id: parsed.id,
          username: parsed.username,
          global_name: parsed.global_name || parsed.username,
          avatar: parsed.avatar,
        };
        if (parsed.token) accessToken = parsed.token;
      } catch (e) {
        console.warn("Failed to parse sora_user cookie:", e);
      }
    }

    // 3. Live fetch user's guilds from Discord API if accessToken exists
    if (accessToken) {
      try {
        const discordRes = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (discordRes.ok) {
          const rawGuilds = await discordRes.json();
          if (Array.isArray(rawGuilds)) {
            const adminGuilds = rawGuilds.filter((g: any) => {
              const perms = BigInt(g.permissions || 0);
              const isAdmin = (perms & BigInt(0x8)) === BigInt(0x8);
              const canManage = (perms & BigInt(0x20)) === BigInt(0x20);
              return isAdmin || canManage || g.owner;
            });
            guilds = adminGuilds.map((g: any) => ({
              id: g.id,
              name: g.name,
              icon: g.icon,
              owner: !!g.owner,
              botConfigured: true,
            }));
          }
        }
      } catch (e) {
        console.warn("Live Discord guilds fetch failed:", e);
      }
    }

    // 4. Always ensure KCS server is included
    if (!guilds.some((g) => g.id === KCS_DEFAULT_GUILD.id)) {
      guilds.unshift(KCS_DEFAULT_GUILD);
    }

    return NextResponse.json({
      user,
      guilds,
    });
  } catch (err: any) {
    console.error("API /api/guilds error:", err);
    // Never fail with 500: return fallback
    return NextResponse.json({
      user: null,
      guilds: [KCS_DEFAULT_GUILD],
    });
  }
}
