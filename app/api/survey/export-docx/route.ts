import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { query } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/setup";

type ProgressRow = {
  payload: unknown;
  submitted_at: string | null;
};

type SurveyPayload = {
  formData?: Record<string, unknown>;
  consent?: unknown;
  backgroundEmail?: unknown;
  backgroundPostcode?: unknown;
  studyYear?: unknown;
  completedPreviousYears?: unknown;
  industryWorkTypes?: unknown;
  plantingTimes?: unknown;
  soilTypesIdentified?: unknown;
  estimatedRainfall?: unknown;
  solidFertiliserKg?: unknown;
  readyLiquidFertiliserLitres?: unknown;
  concentrateFertiliserLitres?: unknown;
  fertiliserMonitoring?: unknown;
  fertiliserMatrixValues?: Record<string, Record<string, unknown>>;
  soilTestsSince2021?: unknown;
  soilTestsSince2024?: unknown;
  sapOrLeafTestingSince2024?: unknown;
  structuredFarmPlanAnswers?: unknown;
  bioIssuesTopThree?: unknown;
  competingFungiManagement?: unknown;
  solidChemicalsAmount?: unknown;
  readyLiquidChemicalsAmount?: unknown;
  concentratedChemicalsAmount?: unknown;
  chemicalMonitoring?: unknown;
  section3ChemicalMatrixValues?: Record<string, Record<string, unknown>>;
  usesPoultryForPestControl?: unknown;
  traceabilitySystem?: unknown;
  plannedProductsIn5Years?: unknown;
  annualRevenueCategory?: unknown;
  annualRevenueEstimate?: unknown;
  annualOperationalCostEstimate?: unknown;
  estimatedFixedAssetValue?: unknown;
  estimatedBusinessValue?: unknown;
  petrolDieselUsage?: unknown;
  naturalGasUsage?: unknown;
  electricityUsage?: unknown;
  solarElectricityProduced?: unknown;
  irrigationWaterUsage?: unknown;
  isOnAustralianTruffleMap?: unknown;
};

function formatValue(value: unknown): string {
  if (value == null) return "N/A";
  if (typeof value === "string") return value.trim() || "N/A";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    const items = value.map((item) => formatValue(item)).filter((item) => item !== "N/A");
    return items.length ? items.join(", ") : "N/A";
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function buildQuestionParagraph(question: string, answer: unknown) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${question}: `, bold: true }),
      new TextRun({ text: formatValue(answer) }),
    ],
    spacing: { after: 160 },
  });
}

function buildMatrixParagraphs(
  title: string,
  matrix: Record<string, Record<string, unknown>> | undefined,
) {
  const paragraphs: Paragraph[] = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 120 },
    }),
  ];
  if (!matrix || Object.keys(matrix).length === 0) {
    paragraphs.push(new Paragraph({ text: "N/A", spacing: { after: 120 } }));
    return paragraphs;
  }

  for (const [rowName, rowValues] of Object.entries(matrix)) {
    const formattedEntries = Object.entries(rowValues ?? {})
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join(" | ");

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${rowName}: `, bold: true }),
          new TextRun({ text: formattedEntries || "N/A" }),
        ],
        spacing: { after: 120 },
      }),
    );
  }
  return paragraphs;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureSchema();
    const progressResult = await query<ProgressRow>(
      `SELECT payload, submitted_at::text AS submitted_at
       FROM survey.user_survey_progress
       WHERE auth_user_id = $1`,
      [userId],
    );
    const progress = progressResult.rows[0];
    if (!progress) {
      return NextResponse.json({ error: "No saved survey data found." }, { status: 404 });
    }

    const payload = (progress.payload ?? {}) as SurveyPayload;
    const formData = payload.formData ?? {};
    const submittedAt = progress.submitted_at
      ? new Date(progress.submitted_at).toLocaleString()
      : "Not submitted";

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Hazelnut Survey Responses",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Generated at: ", bold: true }),
                new TextRun({ text: new Date().toLocaleString() }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Submitted at: ", bold: true }),
                new TextRun({ text: submittedAt }),
              ],
              spacing: { after: 300 },
            }),
            new Paragraph({
              text: "Survey Questions and Answers",
              heading: HeadingLevel.HEADING_2,
            }),
            buildQuestionParagraph("Contact given name", formData.givenName),
            buildQuestionParagraph("Contact surname", formData.surname),
            buildQuestionParagraph("Contact number", formData.contactNumber),
            buildQuestionParagraph("Email", formData.email),
            buildQuestionParagraph("Farm name", formData.farmName),
            buildQuestionParagraph("Farm street address", formData.farmStreetAddress),
            buildQuestionParagraph("Town/City", formData.townCity),
            buildQuestionParagraph("Postcode", formData.postcode),
            buildQuestionParagraph("State", formData.state),
            buildQuestionParagraph("Region", formData.region),
            buildQuestionParagraph("Do you consent to participate?", payload.consent),
            buildQuestionParagraph("Background email", payload.backgroundEmail),
            buildQuestionParagraph("Background postcode", payload.backgroundPostcode),
            buildQuestionParagraph("Year of survey", payload.studyYear),
            buildQuestionParagraph(
              "Completed this questionnaire in previous years?",
              payload.completedPreviousYears,
            ),
            buildQuestionParagraph(
              "Work in truffle industry (multi-select)",
              payload.industryWorkTypes,
            ),
            buildQuestionParagraph("Section 1 planting times answer", payload.plantingTimes),
            buildQuestionParagraph(
              "Are different soil types identified in farm mapping?",
              payload.soilTypesIdentified,
            ),
            buildQuestionParagraph("Estimated rainfall (mm)", payload.estimatedRainfall),
            buildQuestionParagraph(
              "Solid fertiliser used (kg)",
              payload.solidFertiliserKg,
            ),
            buildQuestionParagraph(
              "Ready-to-use liquid fertiliser used (L)",
              payload.readyLiquidFertiliserLitres,
            ),
            buildQuestionParagraph(
              "Liquid concentrate fertiliser used (L)",
              payload.concentrateFertiliserLitres,
            ),
            buildQuestionParagraph("Fertiliser monitoring", payload.fertiliserMonitoring),
            ...buildMatrixParagraphs(
              "Section 2 Fertiliser Matrix",
              payload.fertiliserMatrixValues,
            ),
            buildQuestionParagraph("Soil tests since 2021", payload.soilTestsSince2021),
            buildQuestionParagraph("Soil tests since 2024", payload.soilTestsSince2024),
            buildQuestionParagraph(
              "Sap/leaf testing since 2024",
              payload.sapOrLeafTestingSince2024,
            ),
            buildQuestionParagraph(
              "Structured farm plan answers",
              payload.structuredFarmPlanAnswers,
            ),
            buildQuestionParagraph("Top 3 biosecurity issues", payload.bioIssuesTopThree),
            buildQuestionParagraph(
              "Competing fungi management",
              payload.competingFungiManagement,
            ),
            buildQuestionParagraph(
              "Solid chemicals amount",
              payload.solidChemicalsAmount,
            ),
            buildQuestionParagraph(
              "Ready liquid chemicals amount",
              payload.readyLiquidChemicalsAmount,
            ),
            buildQuestionParagraph(
              "Concentrated chemicals amount",
              payload.concentratedChemicalsAmount,
            ),
            buildQuestionParagraph("Chemical monitoring", payload.chemicalMonitoring),
            ...buildMatrixParagraphs(
              "Section 3 Chemical Matrix",
              payload.section3ChemicalMatrixValues,
            ),
            buildQuestionParagraph(
              "Use poultry for pest control?",
              payload.usesPoultryForPestControl,
            ),
            buildQuestionParagraph("Traceability system", payload.traceabilitySystem),
            buildQuestionParagraph(
              "Planned products in next 5 years",
              payload.plannedProductsIn5Years,
            ),
            buildQuestionParagraph(
              "Annual revenue category",
              payload.annualRevenueCategory,
            ),
            buildQuestionParagraph("Annual revenue estimate", payload.annualRevenueEstimate),
            buildQuestionParagraph(
              "Annual operational cost estimate",
              payload.annualOperationalCostEstimate,
            ),
            buildQuestionParagraph(
              "Estimated fixed asset value",
              payload.estimatedFixedAssetValue,
            ),
            buildQuestionParagraph("Estimated business value", payload.estimatedBusinessValue),
            buildQuestionParagraph("Petrol and diesel usage", payload.petrolDieselUsage),
            buildQuestionParagraph("Natural gas usage", payload.naturalGasUsage),
            buildQuestionParagraph("Electricity usage", payload.electricityUsage),
            buildQuestionParagraph(
              "Solar electricity produced",
              payload.solarElectricityProduced,
            ),
            buildQuestionParagraph("Irrigation water usage", payload.irrigationWaterUsage),
            buildQuestionParagraph(
              "Farm on Australian Truffle Map?",
              payload.isOnAustralianTruffleMap,
            ),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `hazelnut-survey-responses-${new Date().toISOString().slice(0, 10)}.docx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
