import { NextResponse } from "next/server";
import { ensureSchema } from "@/lib/db/setup";
import { query } from "@/lib/db/client";

type FactAnswerRow = {
  respondent_id: string;
  farm_id: string;
  year: number;
  response_id: string;
  question_code: string;
  row_code: string | null;
  column_code: string | null;
  value_number: string | null;
  option_code: string | null;
  option_label: string | null;
  other_text: string | null;
};

export async function GET(request: Request) {
  try {
    await ensureSchema();

    const url = new URL(request.url);
    const limitParam = Number(url.searchParams.get("limit") ?? "200");
    const limit = Number.isFinite(limitParam)
      ? Math.max(1, Math.min(limitParam, 1000))
      : 200;

    const rows = await query<FactAnswerRow>(
      `SELECT respondent_id, farm_id, year, response_id, question_code, row_code, column_code,
              value_number, option_code, option_label, other_text
       FROM analytics.fact_answers
       ORDER BY year DESC
       LIMIT $1`,
      [limit],
    );

    return NextResponse.json({ ok: true, count: rows.rowCount, data: rows.rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
