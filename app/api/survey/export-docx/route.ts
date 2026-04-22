import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { query } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/setup";

type ProgressRow = {
  payload: unknown;
  submitted_at: string | null;
};

type SurveyPayload = {
  formData?: Record<string, unknown>;
  csvAnswers?: Record<string, unknown>;
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
    return items.length ? items.join("\n") : "N/A";
  }
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function buildAnswerParagraph(answer: unknown) {
  const formattedAnswer = formatValue(answer);
  const lines = formattedAnswer.split("\n");
  const children: TextRun[] = [];

  lines.forEach((line, index) => {
    if (index > 0) {
      children.push(new TextRun({ text: "", break: 1 }));
    }
    children.push(new TextRun({ text: line }));
  });

  return new Paragraph({
    children,
    spacing: { after: 200 },
  });
}

function buildQuestionParagraphs(question: string, answer: unknown) {
  return [
    new Paragraph({
      children: [new TextRun({ text: question, bold: true })],
      spacing: { after: 60 },
    }),
    buildAnswerParagraph(answer),
  ];
}

function hasMatrixContent(matrix: Record<string, Record<string, unknown>> | undefined) {
  if (!matrix || Object.keys(matrix).length === 0) {
    return false;
  }
  return Object.values(matrix).some((row) =>
    Object.values(row ?? {}).some((value) => formatValue(value) !== "N/A"),
  );
}

function buildMatrixTable(
  title: string,
  matrix: Record<string, Record<string, unknown>> | undefined,
  columns: Array<{ key: string; label: string }>,
) {
  if (!hasMatrixContent(matrix)) {
    return [] as Array<Paragraph | Table>;
  }

  const rows = Object.entries(matrix ?? {}).filter(([, rowValues]) =>
    Object.values(rowValues ?? {}).some((value) => formatValue(value) !== "N/A"),
  );
  if (rows.length === 0) {
    return [] as Array<Paragraph | Table>;
  }

  const headerRow = new TableRow({
    children: [
      new TableCell({
        width: { size: 30, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ children: [new TextRun({ text: "Item", bold: true })] })],
      }),
      ...columns.map(
        (column) =>
          new TableCell({
            width: { size: Math.floor(70 / columns.length), type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: column.label, bold: true })] })],
          }),
      ),
    ],
  });

  const bodyRows = rows.map(
    ([rowName, rowValues]) =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ text: rowName })],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                width: { size: Math.floor(70 / columns.length), type: WidthType.PERCENTAGE },
                children: [new Paragraph({ text: formatValue(rowValues?.[column.key]) })],
              }),
          ),
        ],
      }),
  );

  return [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 240, after: 120 },
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [headerRow, ...bodyRows],
    }),
    new Paragraph({ text: "", spacing: { after: 180 } }),
  ] as Array<Paragraph | Table>;
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
    const csvAnswers = payload.csvAnswers ?? {};

    const qaPairs: Array<[string, unknown]> = [
      ["Contact given name", formData.givenName],
      ["Contact surname", formData.surname],
      ["Contact number", formData.contactNumber],
      ["Email", formData.email],
      ["Farm name", formData.farmName],
      ["Farm street address", formData.farmStreetAddress],
      ["Town/City", formData.townCity],
      ["Postcode", formData.postcode],
      ["State", formData.state],
      ["Region", formData.region],
      ["Do you consent to participate?", payload.consent],
      ["Background email", payload.backgroundEmail],
      ["Background postcode", payload.backgroundPostcode],
      ["Year of survey", payload.studyYear],
      [
        "Did you complete this questionnaire in previous years?",
        payload.completedPreviousYears,
      ],
      ["Work in truffle industry", payload.industryWorkTypes],
      ["Q1: Total size of the farm in hectares", csvAnswers.q1FarmTotalHectares],
      [
        "Q2: Total size of the farm under trees for truffle production in hectares",
        csvAnswers.q2FarmPlantedHectares,
      ],
      [
        "Q3.1: At the same farm location, was the orchard planted in different years?",
        payload.plantingTimes,
      ],
      [
        "Q3.2: Host tree species / number of trees / year of planting details",
        csvAnswers.q3_2HostTreeDetails,
      ],
      [
        "Q4: Truffle species on your farm and host tree (choose all that apply)",
        csvAnswers.q4TruffleSpecies,
      ],
      ["Q5a: Total annual yield in most recent harvest (kg)", csvAnswers.q5aTotalAnnualYieldKg],
      [
        "Q5b: Total annual sales volume in most recent harvest (kg)",
        csvAnswers.q5bTotalSalesVolumeKg,
      ],
      ["Q5c: Do you monitor yield for each type of truffle?", csvAnswers.q5cMonitorYieldByType],
      ["Q5d: Yield details by truffle type", csvAnswers.q5dYieldByTypeDetails],
      ["Q6: Soil types identified on this farm", csvAnswers.q6SoilTypes],
      [
        "Q7: Are different soil types identified in farm mapping?",
        payload.soilTypesIdentified,
      ],
      [
        "Q8a: Years from planting until first production",
        csvAnswers.q8aYearsUntilFirstProduction,
      ],
      [
        "Q8b: Do you monitor first production time by truffle type?",
        csvAnswers.q8bMonitorFirstProductionByType,
      ],
      ["Q8c: First production details by species", csvAnswers.q8cFirstProductionBySpecies],
      ["Q9: Estimated rainfall in last calendar year (mm)", payload.estimatedRainfall],
      ["Q10: Source of irrigation water", csvAnswers.q10IrrigationSources],
      ["Q11: How is your farm irrigated?", csvAnswers.q11IrrigationMethods],
      ["Q12: Which irrigation emitters are used?", csvAnswers.q12IrrigationEmitters],
      ["Q13: Do you use soil moisture monitoring equipment?", csvAnswers.q13UsesSoilMoistureMonitoring],
      ["Q14: Do you use dosing equipment for irrigation inputs?", csvAnswers.q14UsesDosingEquipment],
      ["Q15: Leaf litter control practice", csvAnswers.q15LeafLitterControl],
      ["Q16a: Solid fertiliser used (kg)", payload.solidFertiliserKg],
      [
        "Q16a: Ready-to-use liquid fertiliser used (litres)",
        payload.readyLiquidFertiliserLitres,
      ],
      [
        "Q16a: Liquid concentrate fertiliser used (litres)",
        payload.concentrateFertiliserLitres,
      ],
      ["Q16b: Fertiliser monitoring", payload.fertiliserMonitoring],
      ["Q17a: Soil tests in past 5 years (since Jan 2021)", payload.soilTestsSince2021],
      ["Q17b: Soil tests since Jan 2024", payload.soilTestsSince2024],
      ["Q18: Tree foliage sap/leaf analysis since Jan 2024", payload.sapOrLeafTestingSince2024],
      ["Q19: Structured farm plan answers", payload.structuredFarmPlanAnswers],
      ["Q20: Mulch practices", csvAnswers.q20MulchPractices],
      ["Q21: Tree pruning methods", csvAnswers.q21TreePruningMethods],
      ["Q22: Cultivation methods", csvAnswers.q22CultivationMethods],
      ["Q23: Soil inoculation methods", csvAnswers.q23SoilInoculationMethods],
      ["Q24: Weed control methods", csvAnswers.q24WeedControlMethods],
      ["Q25: Top three biosecurity issues", payload.bioIssuesTopThree],
      ["Q26: Competing fungi species", csvAnswers.q26CompetingFungiSpecies],
      ["Q27: Management of competing fungi", payload.competingFungiManagement],
      ["Q28: Pest and disease monitoring methods", csvAnswers.q28PestDiseaseMonitoringMethods],
      ["Q29: Main host tree health issues", csvAnswers.q29HostTreeHealthIssues],
      ["Q30: Main truffle pests", csvAnswers.q30MainTrufflePests],
      ["Q31a: Solid chemicals amount", payload.solidChemicalsAmount],
      ["Q31a: Ready liquid chemicals amount", payload.readyLiquidChemicalsAmount],
      ["Q31a: Concentrated chemicals amount", payload.concentratedChemicalsAmount],
      ["Q31b: Chemical monitoring", payload.chemicalMonitoring],
      ["Use poultry for pest control", payload.usesPoultryForPestControl],
      ["Q32: Planted area requiring truffle covering pre-harvest (%)", csvAnswers.q32CoveringAreaPercent],
      ["Q33: Materials used to cover truffle", csvAnswers.q33CoverMaterials],
      ["Q34: Truffle dog mode", csvAnswers.q34TruffleDogMode],
      ["Q35: Dog training method", csvAnswers.q35DogTrainingMethod],
      ["Q36: Post-harvest handling details", csvAnswers.q36PostHarvestHandlingDetails],
      ["Q37: Storage capacity details", csvAnswers.q37StorageCapacityDetails],
      ["Q38: Average refrigeration time before sold (days)", csvAnswers.q38AverageRefrigerationDays],
      ["Q39a: Transport record availability", csvAnswers.q39aHasTransportRecords],
      ["Q39b: Transport methods/time/loss/cost details", csvAnswers.q39bTransportDetails],
      ["Traceability system", payload.traceabilitySystem],
      ["Q40a: Estimated total revenue last calendar year (AUD)", csvAnswers.q40aEstimatedTotalRevenue],
      ["Q40b: Share revenue composition?", csvAnswers.q40bShareRevenueComposition],
      ["Q40c: Sales channel revenue details", csvAnswers.q40cSalesChannelRevenueDetails],
      ["Q41: Product quantity and income details", csvAnswers.q41ProductQuantityIncomeDetails],
      ["Q42: Other income details", csvAnswers.q42OtherIncomeDetails],
      ["Planned products in next 5 years", payload.plannedProductsIn5Years],
      ["Annual revenue category", payload.annualRevenueCategory],
      ["Annual revenue estimate", payload.annualRevenueEstimate],
      ["Annual operational cost estimate", payload.annualOperationalCostEstimate],
      ["Q45: Fixed asset purchase cost (historical)", csvAnswers.q45FixedAssetPurchaseCost],
      ["Q46: Other establishment cost (historical)", csvAnswers.q46OtherEstablishmentCost],
      ["Estimated fixed asset value", payload.estimatedFixedAssetValue],
      ["Estimated business value", payload.estimatedBusinessValue],
      ["Petrol and diesel usage", payload.petrolDieselUsage],
      ["Natural gas usage", payload.naturalGasUsage],
      ["Electricity usage", payload.electricityUsage],
      ["Solar electricity produced", payload.solarElectricityProduced],
      ["Irrigation water usage", payload.irrigationWaterUsage],
      ["Farm on Australian Truffle Map?", payload.isOnAustralianTruffleMap],
    ];

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Truffle Survey Responses",
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
            ...qaPairs.flatMap(([question, answer]) => {
              const blocks: Array<Paragraph | Table> = [
                ...buildQuestionParagraphs(question, answer),
              ];

              if (question === "Q16b: Fertiliser monitoring") {
                blocks.push(
                  ...buildMatrixTable("Q16c: Fertiliser Matrix", payload.fertiliserMatrixValues, [
                    { key: "solid", label: "Solid Form (kg)" },
                    { key: "ready", label: "Ready-to-use Liquid (L)" },
                    { key: "concentrate", label: "Liquid Concentrate (L)" },
                    { key: "applyTimes", label: "Apply Times / Year" },
                  ]),
                );
              }

              if (question === "Q31b: Chemical monitoring") {
                blocks.push(
                  ...buildMatrixTable("Q31c: Chemicals Matrix", payload.section3ChemicalMatrixValues, [
                    { key: "solid", label: "Solid Form (kg)" },
                    { key: "ready", label: "Ready-to-use Liquid (L)" },
                    { key: "concentrate", label: "Liquid Concentrate (L)" },
                  ]),
                );
              }

              return blocks;
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `truffle-survey-responses-${new Date().toISOString().slice(0, 10)}.docx`;

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
