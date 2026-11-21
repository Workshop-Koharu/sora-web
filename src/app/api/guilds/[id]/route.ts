import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

function getGuildFilePath(guildId: string): string {
  const root = process.cwd();
  const dir1 = path.resolve(root, "../data/guilds");
  if (fs.existsSync(dir1)) return path.join(dir1, `${guildId}.json`);
  const dir2 = path.resolve(root, "data/guilds");
  if (fs.existsSync(dir2)) return path.join(dir2, `${guildId}.json`);
  fs.mkdirSync(dir1, { recursive: true });
  return path.join(dir1, `${guildId}.json`);
}

function getDefaultConfig(guildId: string) {
  return {
    guildId,
    verification: {
      enabled: false,
      methods: ["phone", "email", "button", "captcha"],
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
      enabled: false,
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guildId = params.id;
  const filePath = getGuildFilePath(guildId);

  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return NextResponse.json(data);
    } catch {}
  }

  const def = getDefaultConfig(guildId);
  return NextResponse.json(def);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guildId = params.id;
  const filePath = getGuildFilePath(guildId);

  try {
    const updates = await req.json();
    let current = getDefaultConfig(guildId);

    if (fs.existsSync(filePath)) {
      try {
        current = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {}
    }

    const merged = { ...current, ...updates, guildId };

    // Atomic write
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(merged, null, 2), "utf-8");
    fs.renameSync(tempPath, filePath);

    return NextResponse.json({ success: true, data: merged });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
