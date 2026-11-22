import { NextRequest, NextResponse } from "next/server";
import { dbPool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  try {
    const res = await dbPool.query(
      "SELECT data FROM user_profiles WHERE user_id = $1",
      [userId]
    );

    if (res.rows.length > 0) {
      const rowData = res.rows[0].data;
      const data = typeof rowData === "string" ? JSON.parse(rowData) : rowData;
      return NextResponse.json(data);
    }

    return NextResponse.json({
      userId,
      globalPoints: 0,
      level: 1,
      xp: 0,
      badges: ["NEWBIE"],
      verification: { phoneVerified: false, emailVerified: false },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  try {
    const updates = await req.json();

    let current = {
      userId,
      globalPoints: 0,
      level: 1,
      xp: 0,
      badges: ["NEWBIE"],
      verification: { phoneVerified: false, emailVerified: false },
    };

    try {
      const curRes = await dbPool.query(
        "SELECT data FROM user_profiles WHERE user_id = $1",
        [userId]
      );
      if (curRes.rows.length > 0) {
        const d = typeof curRes.rows[0].data === "string" ? JSON.parse(curRes.rows[0].data) : curRes.rows[0].data;
        current = { ...current, ...d };
      }
    } catch {}

    const merged = { ...current, ...updates, userId, updatedAt: new Date().toISOString() };

    await dbPool.query(
      `
      INSERT INTO user_profiles (user_id, data, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();
    `,
      [userId, JSON.stringify(merged)]
    );

    return NextResponse.json({ success: true, data: merged });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
