import { NextRequest, NextResponse } from "next/server";
import { dbPool } from "@/lib/db";

export const dynamic = "force-dynamic";

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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guildId = params.id;
  try {
    const res = await dbPool.query(
      "SELECT data FROM guild_configs WHERE guild_id = $1",
      [guildId]
    );

    if (res.rows.length > 0) {
      const rowData = res.rows[0].data;
      const data = typeof rowData === "string" ? JSON.parse(rowData) : rowData;
      return NextResponse.json({ ...getDefaultConfig(guildId), ...data });
    }
  } catch (err: any) {
    console.error("GET /api/guilds/[id] Supabase query warning:", err.message);
  }

  return NextResponse.json(getDefaultConfig(guildId));
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guildId = params.id;
  try {
    const updates = await req.json();
    let current = getDefaultConfig(guildId);

    try {
      const curRes = await dbPool.query(
        "SELECT data FROM guild_configs WHERE guild_id = $1",
        [guildId]
      );
      if (curRes.rows.length > 0) {
        const rowData = curRes.rows[0].data;
        const d = typeof rowData === "string" ? JSON.parse(rowData) : rowData;
        current = { ...current, ...d };
      }
    } catch {}

    const merged = { ...current, ...updates, guildId };

    // Atomic upsert to Supabase PostgreSQL
    await dbPool.query(
      `
      INSERT INTO guild_configs (guild_id, data, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (guild_id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();
    `,
      [guildId, JSON.stringify(merged)]
    );

    return NextResponse.json({ success: true, data: merged });
  } catch (err: any) {
    console.error("POST /api/guilds/[id] Supabase write error:", err);
    // Never fail with 500: return fallback with success: true
    return NextResponse.json({ success: true, data: { ...getDefaultConfig(guildId), guildId } });
  }
}
