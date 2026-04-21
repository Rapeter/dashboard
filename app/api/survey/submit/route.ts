import { NextResponse } from "next/server";
import { withTransaction } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/setup";
import { normalizeSubmission, type IncomingSurvey } from "@/lib/survey/normalizer";

type RequestBody = Omit<IncomingSurvey, "year"> & { year?: number };

const REQUIRED_FIELDS: Array<keyof RequestBody> = [
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

function validatePayload(payload: RequestBody) {
  for (const field of REQUIRED_FIELDS) {
    if (!payload[field] || String(payload[field]).trim().length === 0) {
      return `Missing required field: ${field}`;
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RequestBody;
    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const normalizedPayload: IncomingSurvey = {
      ...payload,
      year: payload.year ?? new Date().getFullYear(),
    };

    await ensureSchema();

    const result = await withTransaction((client) =>
      normalizeSubmission(client, normalizedPayload),
    );

    return NextResponse.json({
      ok: true,
      message: "Survey submission normalized and saved.",
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
