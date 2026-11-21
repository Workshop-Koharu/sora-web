import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

function getGuildsDir(): string {
  const root = process.cwd();
  // Check if we are inside sora/web or sora root
  const p1 = path.resolve(root, "../data/guilds");
  if (fs.existsSync(p1)) return p1;
  const p2 = path.resolve(root, "data/guilds");
  if (fs.existsSync(p2)) return p2;
  // Create if missing
  fs.mkdirSync(p1, { recursive: true });
  return p1;
}

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("sora_session");
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    const guildsDir = getGuildsDir();

    // Attach bot presence info
    const enrichedGuilds = session.guilds.map((g: any) => {
      const filePath = path.join(guildsDir, `${g.id}.json`);
      const hasConfig = fs.existsSync(filePath);
      return {
        ...g,
        botConfigured: hasConfig,
      };
    });

    return NextResponse.json({
      user: session.user,
      guilds: enrichedGuilds,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
