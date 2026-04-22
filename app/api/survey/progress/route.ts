import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withTransaction } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/setup";
import {
  getSurveyProgress,
  type SurveyProgressStatus,
  upsertSurveyProgress,
} from "@/lib/survey/progress";

type UpdateProgressBody = {
  currentPage?: string;
  payload?: unknown;
  status?: SurveyProgressStatus;
};

async function getSessionUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("session_user_id")?.value ?? null;
}

export async function GET() {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureSchema();
    const progress = await withTransaction((client) => getSurveyProgress(client, userId));

    return NextResponse.json({ ok: true, progress });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as UpdateProgressBody;
    const currentPage = body.currentPage?.trim() || "page1";
    const status: SurveyProgressStatus = body.status === "submitted" ? "submitted" : "draft";
    const payload = body.payload ?? {};

    await ensureSchema();
    const progress = await withTransaction((client) =>
      upsertSurveyProgress(client, {
        authUserId: userId,
        currentPage,
        payload,
        status,
      }),
    );

    return NextResponse.json({ ok: true, progress });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureSchema();
    const result = await withTransaction((client) =>
      client.query(
        `DELETE FROM survey.user_survey_progress
         WHERE auth_user_id = $1
           AND status = 'draft'`,
        [userId],
      ),
    );

    return NextResponse.json({ ok: true, deleted: result.rowCount ?? 0 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
