"use client";

const researchers = [
  "PROF Ling Zhi Cheong - lingzhi.cheong@unimelb.edu.au",
  "A/PROF Zhongxiang Fang - zhongxiang.fang@unimelb.edu.au",
  "Dr Patanamon Thongtanunam - patanamon.t@unimelb.edu.au",
  "Ms Juan Wang - juan.wang.2@unimelb.edu.au",
  "Dr Zijian Liang - zijian.liang1@unimelb.edu.au",
  "Mr Mingzhao Liang - mingzhao.liang1@unimelb.edu.au",
  "Ms Chiow Lynn Ang - chiowlynn.ang1@student.unimelb.edu.au",
  "Ms Yin-Yi Kuo - yinyi.kuo@student.unimelb.edu.au",
];

export function PlainLanguageStatementContent() {
  return (
    <div className="space-y-6">
      <section className="border border-gray-200 rounded-md p-5 bg-[#f8f9fa]">
        <h1 className="text-2xl font-semibold text-[#091a40] mb-3">Plain Language Statement</h1>
        <p className="text-sm mb-1">School of Agriculture, Food and Ecosystems Sciences</p>
        <p className="text-sm mb-1">Faculty of Science</p>
        <p className="text-sm mt-4">
          Project: Understanding the current status of Australian hazelnut production and
          development of a real-time management platform of industry data.
        </p>
        <p className="text-sm mt-3">
          Responsible Researcher: Dr Pangzhen Zhang, Tel: +61 3 8344 6890, Email:
          pangzhen.zhang@unimelb.edu.au
        </p>
        <p className="text-sm mt-3 mb-2">Additional Researchers:</p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          {researchers.map((researcher) => (
            <li key={researcher}>{researcher}</li>
          ))}
        </ul>
        <a
          href="/Plain_Language_Statement.docx"
          download
          className="inline-block mt-4 text-sm text-blue-700 underline"
        >
          Download Plain Language Statement (.docx)
        </a>
      </section>

      <section className="space-y-5 text-sm leading-6">
        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">Introduction</h2>
          <p>
            Thank you for your interest in participating in this research project. The following
            pages provide detailed information about the study so you can make an informed decision
            about whether you would like to participate. Please read this information carefully and
            feel free to ask any questions if there is anything you do not understand or would like
            to know more about.
          </p>
          <p className="mt-2">
            Your participation is entirely voluntary. If you choose not to take part, that is
            perfectly fine. If you do decide to participate, you may withdraw at any time without
            any consequences.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">What is this research about?</h2>
          <p>
            <strong>Background:</strong> This project will create a benchmarking framework for the
            Australian hazelnut industry, analyzing orchard performance across profitability,
            sustainability, farming practices, and processing/by-product development. Through a
            comprehensive Qualtrics-based survey, the framework will collect industry-wide data to
            identify individual orchard performance metrics and guide sustainable development. The
            results will support decision-making in market access, traceability, biosecurity, yield
            forecasting, carbon storage, and quality control, while setting new standards for
            agricultural industries. This project is funded by AgriFutures Australia through the
            Australian Hazelnut Program of Research.
          </p>
          <p className="mt-2">
            <strong>Aims:</strong> This study aims to understand the current status of Australian
            hazelnut production and develop a real-time management platform for industry data.
          </p>
          <p className="mt-2">
            <strong>Methods:</strong> An online system will be built on the Qualtrics platform (or
            equivalent) to collect benchmarking data electronically. Farm owners, factory
            personnel, and other stakeholders in the Australian hazelnut industry will be invited
            via advertisements on the Australian Hazelnut Industry Association website, direct
            emails to all registered hazelnut orchard owners/farmers, and hybrid
            (online/in-person) briefing sessions. After providing consent, participants will
            complete the online benchmarking survey hosted on the secure Qualtrics platform (or
            equivalent). Data will be stored, managed and analysed automatically. Statistical
            analysis methods will process the benchmarking data, which will then be illustrated in
            a dashboard in Qualtrics (or equivalent).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">
            Am I eligible to participate in this research?
          </h2>
          <p>
            You are eligible if you are engaged in the Australian hazelnut industry, such as a
            grower, processor, or policymaker.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">What will you be asked to do?</h2>
          <p>If you choose to participate in this research, you will be asked to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Attend an optional briefing session online or face to face.</li>
            <li>
              Complete an online survey on the secure Qualtrics platform (or equivalent), including
              orchard production, sustainability practices, and financial performance. The survey
              takes approximately 30 to 60 minutes.
            </li>
            <li>
              Review your personalized farm dashboard on Qualtrics (or equivalent) and compare your
              results with industry benchmarks (aggregated data only).
            </li>
            <li>Optionally provide feedback on the benchmarking framework.</li>
          </ul>
          <p className="mt-2">
            You can skip any questions you are uncomfortable answering, pause and return later, and
            withdraw at any time before December 31, 2027.
          </p>
          <p className="mt-2">
            All data you provide will be treated confidentially and used only for the purposes
            outlined in this statement.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">Time, location and transport</h2>
          <p>
            Online or face to face briefing sessions will be arranged and communicated in
            advertisements or via direct email to farmers. Face to face briefing sessions may be
            conducted at industry premises.
          </p>
          <p className="mt-2">
            <strong>Online participation:</strong> The study will run until December 31, 2027. You
            can complete it at your convenience using any internet-connected device.
          </p>
          <p className="mt-2">
            Estimated time: The questionnaire has two sections. General Part 1 takes about 40
            minutes. The second section contains four sub-questionnaires (A. Profitability
            analysis; B. Social awareness and sustainability; C. Farm practice; D. Hazelnut
            processing and by-product development). After completing Part 1, participants may
            choose whether to continue and which specific sub-questionnaires to complete. Each
            sub-questionnaire takes about 20 minutes.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">What are the possible benefits?</h2>
          <p>
            Participating in this research can provide valuable insights into the Australian
            hazelnut industry. By contributing data, you gain access to benchmarking information
            about profitability, social awareness and sustainability, farm practice, and hazelnut
            processing/by-product development. This can support better farm management, resource
            allocation, and business planning. The framework aims to improve industry performance by
            setting new standards for efficiency, quality, and sustainability. The online platform
            provides real-time feedback to compare your operations with industry benchmarks and
            identify areas for improvement. While there may be no direct financial benefit, the
            study supports long-term growth and sustainability across the industry.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">What are the possible risks?</h2>
          <p>There are minimal risks associated with participation. Potential risks include:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              <strong>Privacy concerns:</strong> There is a minimal chance of accidental exposure
              due to farm-specific identification. Protection includes encryption, access controls
              and de-identification for shared results; farm identity will not be disclosed in
              reports.
            </li>
            <li>
              <strong>Commercial sensitivity:</strong> Some participants may worry about sharing
              operational/financial data. Protection includes aggregation with at least 5 farms per
              benchmark; competitors cannot access individual farm data. You may skip sensitive
              questions.
            </li>
            <li>
              <strong>Time burden:</strong> Participation can require 1 to 2 hours online. Flexible
              scheduling and pause/save features help reduce disruption.
            </li>
          </ul>
          <p className="mt-2">
            If you have concerns about these risks, please contact the research team for
            clarification.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">Do I have to take part?</h2>
          <p>
            No. Participation is completely voluntary. You can withdraw at any time. If you
            withdraw, your anonymity will be maintained by removing identifying details (such as
            names and locations) from the data.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">
            Will I hear about the results of this project?
          </h2>
          <p>
            Participants can access a summary of findings. Results may be shared through reports,
            industry briefings, or an online dashboard. If you would like updates, please inform
            the research team.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">
            What will happen to information about me?
          </h2>
          <p>To ensure safety and confidentiality, this study applies the following measures:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              <strong>Data use and protection:</strong> Data will be used to build farm-specific
              benchmarking dashboards and aggregated industry analyses. A unique farm ID will be
              assigned. Identifiable data will not be shared with other farms. Only regional
              averages are provided to Hazelnut Growers of Australia, and published results are
              anonymized and industry-wide.
            </li>
            <li>
              <strong>Identification procedures:</strong> Farm identifying information is required
              at survey start. Only responses with this information are recorded. Data from each
              farm remains linked to that farm and is not mixed with others.
            </li>
            <li>
              <strong>Secure data storage:</strong> Data is stored on password-protected University
              cloud storage (OneDrive) and password-protected University computers. Access is
              restricted to authorized researchers only.
            </li>
            <li>
              <strong>Data aggregation:</strong> Where possible, responses are combined for
              analysis. Publications/presentations/workshops use only anonymized aggregated data.
            </li>
            <li>
              <strong>Data retention and deletion:</strong> Raw datasets with identifiers are
              retained securely for up to five years after project completion, then personally
              identifiable information is permanently deleted. Only de-identified aggregated data
              may be archived for future research subject to separate ethics approval.
            </li>
            <li>
              <strong>Limited access:</strong> Access is restricted to the research team. Farm
              specific data is not shared without explicit consent.
            </li>
            <li>
              <strong>Your rights:</strong> You may access submitted data, request corrections, or
              withdraw information at any time before December 31, 2027, via the Qualtrics
              platform. Contact: pangzhen.zhang@unimelb.edu.au.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">
            Where can I get further information?
          </h2>
          <p>Dr Pangzhen Zhang, pangzhen.zhang@unimelb.edu.au, Ph: 0425 896 788</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#091a40]">
            Who can I contact if I have concerns about the project?
          </h2>
          <p>
            This project has been approved by the Human Research Ethics Committee of The University
            of Melbourne. Ethics approval ID: 2025-32538-70108-3.
          </p>
          <p className="mt-2">
            If you have concerns or complaints you do not wish to discuss with the research team,
            contact the Research Integrity Administrator, Office of Research Ethics and Integrity,
            University of Melbourne, VIC 3010. Tel: +61 3 8344 1376, Email:
            research-integrity@unimelb.edu.au. All complaints are treated confidentially. Please
            include the research team name and/or ethics ID in correspondence.
          </p>
        </div>
      </section>
    </div>
  );
}
