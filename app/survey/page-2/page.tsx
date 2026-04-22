import Link from "next/link";
import { PlainLanguageStatementContent } from "@/app/survey/components/plain-language-statement-content";

export default function SurveyPageTwo() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="bg-[#091a40] h-28 flex items-center px-8 sm:px-16">
        <img
          src="https://q.surveys.unimelb.edu.au/CP/Graphic.php?IM=IM_6PTif2kLNeUE5Bs"
          alt="The University of Melbourne"
          className="h-16"
        />
      </header>

      <div className="w-full bg-gray-300 h-[6px]">
        <div className="bg-[#091a40] h-full w-[18%]"></div>
      </div>
      <div className="px-4 py-1 text-sm text-gray-600">Page 2 - Plain Language Statement</div>

      <main className="max-w-4xl mx-auto py-10 px-6 sm:px-12 space-y-6">
        <PlainLanguageStatementContent />

        <div className="pt-4">
          <Link
            href="/survey"
            className="inline-block bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors font-medium"
          >
            Back to survey page
          </Link>
        </div>
      </main>
    </div>
  );
}
