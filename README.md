# Hazelnut Survey Dashboard Prototype

This project now includes a data architecture aligned to the Hazelnut PDF requirements:

- Canonical survey schema under `survey.*`
- Raw landing + staging tables (`raw_responses`, `raw_response_fields`)
- Canonical answer table (`survey.answers`)
- Analytics entry point as materialized view: `analytics.fact_answers`

## Setup

1. Create `.env.local` from `.env.example` and configure PostgreSQL:

```bash
cp .env.example .env.local
```

2. Install dependencies:

```bash
pnpm install
```

3. Initialize database objects:

```bash
pnpm db:init
```

4. Start the app:

```bash
pnpm dev
```

## API Endpoints

- `POST /api/survey/submit`  
  Accepts the survey page payload, persists `raw_*` records, normalizes into canonical tables, writes `survey.answers`, and refreshes `analytics.fact_answers`.

- `GET /api/analytics/fact-answers?limit=200`  
  Reads analysis-ready rows from `analytics.fact_answers`.

## Key Files

- `db/schema.sql` - full `survey` and `analytics` schema, including materialized view
- `lib/survey/normalizer.ts` - raw-to-canonical normalization logic
- `app/api/survey/submit/route.ts` - submission ingestion endpoint
- `app/api/analytics/fact-answers/route.ts` - analytics read endpoint
