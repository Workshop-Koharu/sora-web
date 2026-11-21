import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

function getSessionsDir(): string {
  const root = process.cwd();
  const p = path.resolve(root, "../data/sessions");
  fs.mkdirSync(p, { recursive: true });
  return p;
}

function getGuildsDir(): string {
  const root = process.cwd();
  const p1 = path.resolve(root, "../data/guilds");
  if (fs.existsSync(p1)) return p1;
  const p2 = path.resolve(root, "data/guilds");
  if (fs.existsSync(p2)) return p2;
  fs.mkdirSync(p1, { recursive: true });
  return p1;
}

export async function GET(req: NextRequest) {
  try {
    const userCookie = req.cookies.get("sora_user");
    if (!userCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let parsedCookie: any;
    try {
      parsedCookie = JSON.parse(userCookie.value);
    } catch {
      return NextResponse.json({ error: "Invalid session cookie" }, { status: 401 });
    }

    const userId = parsedCookie.id;
    const accessToken = parsedCookie.token;
    const sessionsDir = getSessionsDir();
    const sessionFile = path.join(sessionsDir, `${userId}.json`);

    let user = {
      id: parsedCookie.id,
      username: parsedCookie.username,
      global_name: parsedCookie.global_name || parsedCookie.username,
      avatar: parsedCookie.avatar,
    };
    let guilds: any[] = [];

    // 1. Try reading from server session file
    if (fs.existsSync(sessionFile)) {
      try {
        const fileData = JSON.parse(fs.readFileSync(sessionFile, "utf-8"));
        user = fileData.user || user;
        guilds = fileData.guilds || [];
      } catch (e) {
        console.error("Failed to read session file:", e);
      }
    }

    // 2. If guilds are empty, fetch live from Discord API using accessToken
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
              owner: g.owner,
            }));
          }
        }
      } catch (e) {
        console.error("Live Discord guilds fetch failed:", e);
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
    console.error("Error in /api/guilds:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
