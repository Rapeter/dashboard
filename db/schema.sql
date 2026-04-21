CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS survey;
CREATE SCHEMA IF NOT EXISTS analytics;

CREATE TABLE IF NOT EXISTS survey.survey_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS survey.surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES survey.survey_providers(id),
  provider_survey_id text NOT NULL,
  version integer NOT NULL,
  published_at timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  title text,
  description text,
  UNIQUE (provider_id, provider_survey_id, version)
);

CREATE TABLE IF NOT EXISTS survey.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid NOT NULL REFERENCES survey.surveys(id),
  code text NOT NULL,
  type text NOT NULL,
  is_first_year_only boolean NOT NULL DEFAULT false,
  provider_question_id text,
  UNIQUE (survey_id, code)
);

CREATE TABLE IF NOT EXISTS survey.question_rows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES survey.questions(id),
  code text NOT NULL,
  label text NOT NULL,
  has_other_text boolean NOT NULL DEFAULT false,
  UNIQUE (question_id, code)
);

CREATE TABLE IF NOT EXISTS survey.question_columns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES survey.questions(id),
  code text NOT NULL,
  label text NOT NULL,
  UNIQUE (question_id, code)
);

CREATE TABLE IF NOT EXISTS survey.question_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES survey.questions(id),
  code text NOT NULL,
  label text NOT NULL,
  has_other_text boolean NOT NULL DEFAULT false,
  UNIQUE (question_id, code)
);

CREATE TABLE IF NOT EXISTS survey.provider_mapping (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_qid text NOT NULL,
  provider_row_code text,
  provider_column_code text,
  provider_suffix text,
  provider_option_code text,
  question_code text NOT NULL,
  row_code text,
  row_label text,
  column_code text,
  column_label text,
  option_code text,
  option_label text
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_provider_mapping_signature
ON survey.provider_mapping (
  provider_qid,
  COALESCE(provider_row_code, ''),
  COALESCE(provider_column_code, ''),
  COALESCE(provider_suffix, ''),
  COALESCE(provider_option_code, '')
);

CREATE TABLE IF NOT EXISTS survey.respondents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  email text UNIQUE,
  state text,
  region text
);

CREATE TABLE IF NOT EXISTS survey.farms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_id uuid NOT NULL REFERENCES survey.respondents(id),
  name text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  postcode text NOT NULL,
  state text NOT NULL,
  region text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS survey.survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_id uuid NOT NULL REFERENCES survey.respondents(id),
  survey_id uuid NOT NULL REFERENCES survey.surveys(id),
  farm_id uuid NOT NULL REFERENCES survey.farms(id),
  year integer NOT NULL,
  provider_response_id text NOT NULL UNIQUE,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  status text DEFAULT 'submitted'
);

CREATE TABLE IF NOT EXISTS survey.answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid NOT NULL REFERENCES survey.survey_responses(id),
  question_id uuid NOT NULL REFERENCES survey.questions(id),
  row_id uuid REFERENCES survey.question_rows(id),
  column_id uuid REFERENCES survey.question_columns(id),
  option_id uuid REFERENCES survey.question_options(id),
  value_number numeric,
  other_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS survey.raw_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_response_id text NOT NULL UNIQUE,
  ingested_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS survey.raw_response_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_response_id text NOT NULL,
  qid text NOT NULL,
  field_key text NOT NULL,
  row_code text,
  column_code text,
  suffix text,
  value_json jsonb,
  label_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider_response_id, field_key)
);

CREATE OR REPLACE FUNCTION analytics.refresh_fact_answers()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW analytics.fact_answers;
END;
$$;

DROP MATERIALIZED VIEW IF EXISTS analytics.fact_answers;
CREATE MATERIALIZED VIEW analytics.fact_answers AS
SELECT
  sr.respondent_id,
  sr.farm_id,
  sr.year,
  sr.id AS response_id,
  q.code AS question_code,
  qr.code AS row_code,
  qc.code AS column_code,
  a.value_number,
  qo.code AS option_code,
  qo.label AS option_label,
  a.other_text
FROM survey.answers a
JOIN survey.survey_responses sr ON sr.id = a.response_id
JOIN survey.questions q ON q.id = a.question_id
LEFT JOIN survey.question_rows qr ON qr.id = a.row_id
LEFT JOIN survey.question_columns qc ON qc.id = a.column_id
LEFT JOIN survey.question_options qo ON qo.id = a.option_id;

CREATE UNIQUE INDEX IF NOT EXISTS idx_fact_answers_response_question
ON analytics.fact_answers (
  response_id,
  question_code,
  COALESCE(row_code, ''),
  COALESCE(column_code, ''),
  COALESCE(option_code, '')
);
