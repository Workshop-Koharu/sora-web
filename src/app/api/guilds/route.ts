import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

function getSessionsDir(): string {
  const root = process.cwd();
  const p = path.resolve(root, "../data/sessions");
  try {
    fs.mkdirSync(p, { recursive: true });
  } catch {}
  return p;
}

function getGuildsDir(): string {
  const root = process.cwd();
  const p1 = path.resolve(root, "../data/guilds");
  if (fs.existsSync(p1)) return p1;
  const p2 = path.resolve(root, "data/guilds");
  if (fs.existsSync(p2)) return p2;
  try {
    fs.mkdirSync(p1, { recursive: true });
  } catch {}
  return p1;
}

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("sora_session");
    const userCookie = req.cookies.get("sora_user");

    if (!sessionCookie && !userCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user: any = null;
    let guilds: any[] = [];
    let accessToken = "";

    // 1. Try reading directly from sora_session cookie (fastest, stateless, works on Vercel 100%)
    if (sessionCookie) {
      try {
        const parsed = JSON.parse(sessionCookie.value);
        if (parsed.user) user = parsed.user;
        if (Array.isArray(parsed.guilds)) guilds = parsed.guilds;
        if (parsed.token) accessToken = parsed.token;
      } catch (e) {
        console.warn("Failed to parse sora_session cookie:", e);
      }
    }

    // 2. Try sora_user fallback
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

    if (!user) {
      return NextResponse.json({ error: "Invalid session cookie" }, { status: 401 });
    }

    // 3. Try reading from server session file if guilds is still empty
    if (guilds.length === 0 && user.id) {
      const sessionsDir = getSessionsDir();
      const sessionFile = path.join(sessionsDir, `${user.id}.json`);
      if (fs.existsSync(sessionFile)) {
        try {
          const fileData = JSON.parse(fs.readFileSync(sessionFile, "utf-8"));
          if (Array.isArray(fileData.guilds)) guilds = fileData.guilds;
          if (fileData.accessToken) accessToken = fileData.accessToken;
        } catch {}
      }
    }

    // 4. Live fetch from Discord API if guilds is still empty and accessToken exists
    if (guilds.length === 0 && accessToken) {
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
            }));
          }
        }
      } catch (e) {
        console.warn("Live Discord guilds fetch failed:", e);
      }
    }

    const guildsDir = getGuildsDir();
    const enrichedGuilds = guilds.map((g: any) => {
      const filePath = path.join(guildsDir, `${g.id}.json`);
      return {
        ...g,
        botConfigured: fs.existsSync(filePath),
      };
    });

    return NextResponse.json({
      user,
      guilds: enrichedGuilds,
    });
  } catch (err: any) {
    console.error("API /api/guilds error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
