import type { PoolClient } from "pg";

const PROVIDER_CODE = "web_form";
const PROVIDER_NAME = "Web Form";
const SURVEY_CODE = "hazelnut-baseline";
const SURVEY_VERSION = 1;

type IncomingSurvey = {
  givenName: string;
  surname: string;
  contactNumber: string;
  email: string;
  farmName: string;
  farmStreetAddress: string;
  townCity: string;
  postcode: string;
  state: string;
  region: string;
  year: number;
};

const QUESTION_DEFINITIONS = [
  { providerQid: "givenName", code: "contact_given_name", type: "text" },
  { providerQid: "surname", code: "contact_surname", type: "text" },
  { providerQid: "contactNumber", code: "contact_number", type: "text" },
  { providerQid: "email", code: "contact_email", type: "text" },
  { providerQid: "farmName", code: "farm_name", type: "text" },
  { providerQid: "farmStreetAddress", code: "farm_street_address", type: "text" },
  { providerQid: "townCity", code: "farm_town_city", type: "text" },
  { providerQid: "postcode", code: "farm_postcode", type: "text" },
  { providerQid: "state", code: "farm_state", type: "single_choice" },
  { providerQid: "region", code: "farm_region", type: "single_choice" },
] as const;

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

async function getOrCreateProviderId(client: PoolClient) {
  const providerResult = await client.query<{ id: string }>(
    `INSERT INTO survey.survey_providers (code, name)
     VALUES ($1, $2)
     ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`,
    [PROVIDER_CODE, PROVIDER_NAME],
  );
  return providerResult.rows[0].id;
}

async function getOrCreateSurveyId(client: PoolClient, providerId: string) {
  const surveyResult = await client.query<{ id: string }>(
    `INSERT INTO survey.surveys (
      provider_id, provider_survey_id, version, published_at, is_active, title, description
    )
    VALUES ($1, $2, $3, now(), true, $4, $5)
    ON CONFLICT (provider_id, provider_survey_id, version)
    DO UPDATE SET is_active = true
    RETURNING id`,
    [
      providerId,
      SURVEY_CODE,
      SURVEY_VERSION,
      "Hazelnut Baseline Survey",
      "Canonical schema-backed survey for dashboard ingestion.",
    ],
  );
  return surveyResult.rows[0].id;
}

async function ensureQuestionMetadata(client: PoolClient, surveyId: string) {
  for (const question of QUESTION_DEFINITIONS) {
    await client.query(
      `INSERT INTO survey.questions (survey_id, code, type, provider_question_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (code)
       DO UPDATE SET
         survey_id = EXCLUDED.survey_id,
         type = EXCLUDED.type,
         provider_question_id = EXCLUDED.provider_question_id`,
      [surveyId, question.code, question.type, question.providerQid],
    );

    await client.query(
      `INSERT INTO survey.provider_mapping (
         provider_qid, question_code
       ) VALUES ($1, $2)
       ON CONFLICT (
         provider_qid,
         (COALESCE(provider_row_code, '')),
         (COALESCE(provider_column_code, '')),
         (COALESCE(provider_suffix, '')),
         (COALESCE(provider_option_code, ''))
       )
       DO UPDATE SET question_code = EXCLUDED.question_code`,
      [question.providerQid, question.code],
    );
  }
}

async function getQuestionIdByCode(client: PoolClient, code: string) {
  const result = await client.query<{ id: string }>(
    `SELECT id FROM survey.questions
     WHERE code = $1`,
    [code],
  );
  return result.rows[0]?.id;
}

async function getOrCreateOptionId(
  client: PoolClient,
  questionId: string,
  rawValue: string,
) {
  const optionCode = slugify(rawValue).toUpperCase();
  const optionResult = await client.query<{ id: string }>(
    `INSERT INTO survey.question_options (question_id, code, label)
     VALUES ($1, $2, $3)
     ON CONFLICT (question_id, code)
     DO UPDATE SET label = EXCLUDED.label
     RETURNING id`,
    [questionId, optionCode, rawValue],
  );
  return optionResult.rows[0].id;
}

export async function normalizeSubmission(client: PoolClient, payload: IncomingSurvey) {
  const providerId = await getOrCreateProviderId(client);
  const surveyId = await getOrCreateSurveyId(client, providerId);
  await ensureQuestionMetadata(client, surveyId);

  const respondentResult = await client.query<{ id: string }>(
    `INSERT INTO survey.respondents (email, state, region)
     VALUES ($1, $2, $3)
     ON CONFLICT (email)
     DO UPDATE SET state = EXCLUDED.state, region = EXCLUDED.region
     RETURNING id`,
    [payload.email, payload.state, payload.region],
  );
  const respondentId = respondentResult.rows[0].id;

  const farmResult = await client.query<{ id: string }>(
    `INSERT INTO survey.farms (respondent_id, name, street, city, postcode, state, region)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [
      respondentId,
      payload.farmName,
      payload.farmStreetAddress,
      payload.townCity,
      payload.postcode,
      payload.state,
      payload.region,
    ],
  );
  const farmId = farmResult.rows[0].id;

  const providerResponseId = `WEB-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  await client.query(
    `INSERT INTO survey.raw_responses (provider_response_id, payload)
     VALUES ($1, $2::jsonb)`,
    [providerResponseId, JSON.stringify(payload)],
  );

  for (const [key, value] of Object.entries(payload)) {
    if (key === "year") {
      continue;
    }

    await client.query(
      `INSERT INTO survey.raw_response_fields (
         provider_response_id, qid, field_key, value_json, label_json
       ) VALUES ($1, $2, $3, $4::jsonb, $5::jsonb)`,
      [
        providerResponseId,
        key,
        key,
        JSON.stringify(value),
        JSON.stringify({ label: key }),
      ],
    );
  }

  const responseResult = await client.query<{ id: string }>(
    `INSERT INTO survey.survey_responses (
      respondent_id, survey_id, farm_id, year, provider_response_id, status
    ) VALUES ($1, $2, $3, $4, $5, 'submitted')
    RETURNING id`,
    [respondentId, surveyId, farmId, payload.year, providerResponseId],
  );
  const responseId = responseResult.rows[0].id;

  for (const question of QUESTION_DEFINITIONS) {
    const questionId = await getQuestionIdByCode(client, question.code);
    if (!questionId) {
      continue;
    }

    const rawValue = String(payload[question.providerQid as keyof IncomingSurvey] ?? "");
    let optionId: string | null = null;
    let otherText: string | null = rawValue;
    if (question.type === "single_choice") {
      optionId = await getOrCreateOptionId(client, questionId, rawValue);
      otherText = null;
    }

    await client.query(
      `INSERT INTO survey.answers (response_id, question_id, option_id, other_text)
       VALUES ($1, $2, $3, $4)`,
      [responseId, questionId, optionId, otherText],
    );
  }

  await client.query("SELECT analytics.refresh_fact_answers()");

  return { responseId, providerResponseId };
}

export type { IncomingSurvey };
