import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withTransaction } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/setup";
import { normalizeSubmission, type IncomingSurvey } from "@/lib/survey/normalizer";
import { upsertSurveyProgress } from "@/lib/survey/progress";

type SubmitSurveyBody = {
  currentPage?: string;
  payload?: {
    formData?: {
      givenName?: string;
      surname?: string;
      contactNumber?: string;
      email?: string;
      farmName?: string;
      farmStreetAddress?: string;
      townCity?: string;
      postcode?: string;
      state?: string;
      region?: string;
    };
    studyYear?: string;
  };
};

function getTrimmed(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseYear(studyYear: string) {
  const parsed = Number.parseInt(studyYear, 10);
  return Number.isFinite(parsed) ? parsed : new Date().getFullYear();
}

async function getSessionUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("session_user_id")?.value ?? null;
}

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as SubmitSurveyBody;
    const formData = body.payload?.formData;
    const normalizedPayload: IncomingSurvey = {
      givenName: getTrimmed(formData?.givenName),
      surname: getTrimmed(formData?.surname),
      contactNumber: getTrimmed(formData?.contactNumber),
      email: getTrimmed(formData?.email),
      farmName: getTrimmed(formData?.farmName),
      farmStreetAddress: getTrimmed(formData?.farmStreetAddress),
      townCity: getTrimmed(formData?.townCity),
      postcode: getTrimmed(formData?.postcode),
      state: getTrimmed(formData?.state),
      region: getTrimmed(formData?.region),
      year: parseYear(getTrimmed(body.payload?.studyYear)),
    };

    const requiredFields: Array<keyof IncomingSurvey> = [
      "givenName",
      "surname",
      "contactNumber",
      "email",
      "farmName",
      "farmStreetAddress",
      "townCity",
      "postcode",
      "state",
      "region",
    ];
    for (const field of requiredFields) {
      if (!normalizedPayload[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    await ensureSchema();

    const currentPage = body.currentPage?.trim() || "final";
    const payloadForSave = body.payload ?? {};
    const result = await withTransaction(async (client) => {
      const submission = await normalizeSubmission(client, normalizedPayload);
      const progress = await upsertSurveyProgress(client, {
        authUserId: userId,
        currentPage,
        payload: payloadForSave,
        status: "submitted",
        responseId: submission.responseId,
      });

      return { submission, progress };
    });

    return NextResponse.json({
      ok: true,
      responseId: result.submission.responseId,
      providerResponseId: result.submission.providerResponseId,
      submittedWithinOneYear: result.progress.submitted_within_one_year,
      lastSubmittedAt: result.progress.submitted_at,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
