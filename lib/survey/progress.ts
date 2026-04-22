import type { PoolClient } from "pg";

export type SurveyProgressStatus = "draft" | "submitted";

export type SurveyProgressRow = {
  auth_user_id: string;
  current_page: string;
  payload: unknown;
  status: SurveyProgressStatus;
  response_id: string | null;
  last_autosaved_at: string | null;
  submitted_at: string | null;
  submitted_within_one_year: boolean;
  updated_at: string;
};

type UpsertSurveyProgressInput = {
  authUserId: string;
  currentPage: string;
  payload: unknown;
  status: SurveyProgressStatus;
  responseId?: string | null;
};

export async function getSurveyProgress(
  client: PoolClient,
  authUserId: string,
) {
  const result = await client.query<SurveyProgressRow>(
    `SELECT
       p.auth_user_id,
       p.current_page,
       p.payload,
       p.status,
       p.response_id,
       p.last_autosaved_at::text AS last_autosaved_at,
       p.submitted_at::text AS submitted_at,
       (
         p.submitted_at IS NOT NULL
         AND p.submitted_at >= now() - interval '1 year'
       ) AS submitted_within_one_year,
       p.updated_at::text AS updated_at
     FROM survey.user_survey_progress p
     WHERE p.auth_user_id = $1`,
    [authUserId],
  );

  return result.rows[0] ?? null;
}

export async function upsertSurveyProgress(
  client: PoolClient,
  input: UpsertSurveyProgressInput,
) {
  const result = await client.query<SurveyProgressRow>(
    `INSERT INTO survey.user_survey_progress (
       auth_user_id,
       current_page,
       payload,
       status,
       response_id,
       last_autosaved_at,
       submitted_at,
       created_at,
       updated_at
     )
     VALUES (
       $1,
       $2,
       $3::jsonb,
       $4,
       $5,
       now(),
       CASE WHEN $4 = 'submitted' THEN now() ELSE NULL END,
       now(),
       now()
     )
     ON CONFLICT (auth_user_id)
     DO UPDATE SET
       current_page = EXCLUDED.current_page,
       payload = EXCLUDED.payload,
       status = CASE
         WHEN survey.user_survey_progress.status = 'submitted' AND EXCLUDED.status = 'draft'
           THEN 'submitted'
         ELSE EXCLUDED.status
       END,
       response_id = COALESCE(EXCLUDED.response_id, survey.user_survey_progress.response_id),
       last_autosaved_at = now(),
       submitted_at = CASE
         WHEN EXCLUDED.status = 'submitted' THEN now()
         ELSE survey.user_survey_progress.submitted_at
       END,
       updated_at = now()
     RETURNING
       auth_user_id,
       current_page,
       payload,
       status,
       response_id,
       last_autosaved_at::text AS last_autosaved_at,
       submitted_at::text AS submitted_at,
       (
         submitted_at IS NOT NULL
         AND submitted_at >= now() - interval '1 year'
       ) AS submitted_within_one_year,
       updated_at::text AS updated_at`,
    [
      input.authUserId,
      input.currentPage,
      JSON.stringify(input.payload),
      input.status,
      input.responseId ?? null,
    ],
  );

  return result.rows[0];
}
