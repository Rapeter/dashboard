import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/setup";

type SubmissionStatusRow = {
  submitted_within_one_year: boolean;
  last_submitted_at: string | null;
  last_autosaved_at: string | null;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureSchema();
    const result = await query<SubmissionStatusRow>(
      `SELECT
         submitted_within_one_year,
         last_autosaved_at::text AS last_autosaved_at,
         last_submitted_at::text AS last_submitted_at
       FROM survey.user_submission_status
       WHERE auth_user_id = $1`,
      [userId],
    );

    const row = result.rows[0];
    return NextResponse.json({
      ok: true,
      submittedWithinOneYear: row?.submitted_within_one_year ?? false,
      lastAutosavedAt: row?.last_autosaved_at ?? null,
      lastSubmittedAt: row?.last_submitted_at ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
