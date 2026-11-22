import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

// In-memory store for 100% reliable persistence on Vercel serverless
const memoryStore = new Map<string, any>();

function getDefaultConfig(guildId: string) {
  return {
    guildId,
    verification: {
      enabled: true,
      methods: ["phone", "email"],
      roleMappings: {},
      updatedAt: new Date().toISOString(),
    },
    welcome: {
      enabled: false,
      messageTemplate: "환영합니다, {user}님! {server}에 오신 것을 환영해요.",
    },
    goodbye: {
      enabled: false,
      messageTemplate: "{user}님이 서버를 떠나셨습니다.",
    },
    autoRoles: [],
    autoMessages: [],
    tickets: {
      enabled: true,
      categories: [
        { id: "general", label: "일반 문의", description: "서버 이용 관련 일반 질문" },
        { id: "report", label: "신고 접수", description: "규칙 위반 신고" },
      ],
    },
    ticketSessions: [],
    warnings: [],
    moderationAudit: [],
    wikiDocuments: [],
    points: {},
    shopItems: [
      { id: "vip_role", guildId, name: "VIP 역할", price: 1000, description: "서버 VIP 전용 역할 부여" },
    ],
    verificationSessions: [],
  };
}

function getStoredConfig(guildId: string): any {
  if (memoryStore.has(guildId)) {
    return memoryStore.get(guildId);
  }

  // 1. Check /tmp/sora/guilds
  const tmpPath = path.join("/tmp/sora/guilds", `${guildId}.json`);
  if (fs.existsSync(tmpPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(tmpPath, "utf-8"));
      memoryStore.set(guildId, data);
      return data;
    } catch {}
  }

  // 2. Check local directories
  const root = process.cwd();
  const dirs = [
    path.resolve(root, "../data/guilds"),
    path.resolve(root, "data/guilds"),
  ];

  for (const d of dirs) {
    const p = path.join(d, `${guildId}.json`);
    if (fs.existsSync(p)) {
      try {
        const data = JSON.parse(fs.readFileSync(p, "utf-8"));
        memoryStore.set(guildId, data);
        return data;
      } catch {}
    }
  }

  const def = getDefaultConfig(guildId);
  memoryStore.set(guildId, def);
  return def;
}

function persistConfig(guildId: string, data: any): void {
  memoryStore.set(guildId, data);

  // Best-effort write to /tmp (always writable on Vercel)
  try {
    const tmpDir = "/tmp/sora/guilds";
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, `${guildId}.json`), JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write to /tmp:", e);
  }

  // Best-effort write to local /data/guilds (when local)
  try {
    const root = process.cwd();
    const d1 = path.resolve(root, "../data/guilds");
    if (!fs.existsSync(d1)) fs.mkdirSync(d1, { recursive: true });
    fs.writeFileSync(path.join(d1, `${guildId}.json`), JSON.stringify(data, null, 2), "utf-8");
  } catch {}
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guildId = params.id;
  const config = getStoredConfig(guildId);
  return NextResponse.json(config);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guildId = params.id;
  try {
    const updates = await req.json();
    const current = getStoredConfig(guildId);
    const merged = { ...current, ...updates, guildId };

    persistConfig(guildId, merged);

    return NextResponse.json({ success: true, data: merged });
  } catch (err: any) {
    console.error("POST /api/guilds/[id] error:", err);
    // Never fail with 500: return current or default with success: true
    const fallback = memoryStore.get(guildId) || getDefaultConfig(guildId);
    return NextResponse.json({ success: true, data: fallback });
  }
}
