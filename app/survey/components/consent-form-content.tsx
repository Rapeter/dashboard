"use client";

import { useEffect, useRef, useState } from "react";

type SignatureMode = "Type" | "Sign";

export type ConsentSignatureData = {
  mode: SignatureMode;
  typedSignature: string;
  drawnSignatureDataUrl: string;
};

type ConsentFormContentProps = {
  onValidityChange?: (isValid: boolean) => void;
  value?: ConsentSignatureData;
  onChange?: (value: ConsentSignatureData) => void;
};

export function ConsentFormContent({ onValidityChange, value, onChange }: ConsentFormContentProps) {
  const [signatureMode, setSignatureMode] = useState<SignatureMode>(value?.mode ?? "Type");
  const [typedSignature, setTypedSignature] = useState(value?.typedSignature ?? "");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnSignature, setHasDrawnSignature] = useState(
    (value?.drawnSignatureDataUrl ?? "").trim().length > 0,
  );
  const [drawnSignatureDataUrl, setDrawnSignatureDataUrl] = useState(value?.drawnSignatureDataUrl ?? "");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isValid = signatureMode === "Type" ? typedSignature.trim().length > 0 : hasDrawnSignature;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    onChange?.({
      mode: signatureMode,
      typedSignature,
      drawnSignatureDataUrl,
    });
  }, [drawnSignatureDataUrl, onChange, signatureMode, typedSignature]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !drawnSignatureDataUrl) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const image = new Image();
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      setHasDrawnSignature(true);
    };
    image.src = drawnSignatureDataUrl;
  }, [drawnSignatureDataUrl]);

  const getCanvasPoint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const getCanvasTouchPoint = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || event.touches.length === 0) {
      return null;
    }
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((touch.clientX - rect.left) * canvas.width) / rect.width,
      y: ((touch.clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const startDrawing = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setIsDrawing(true);
  };

  const drawLine = (x: number, y: number) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawnSignature(true);
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas && hasDrawnSignature) {
      setDrawnSignatureDataUrl(canvas.toDataURL("image/png"));
    }
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSignature(false);
    setDrawnSignatureDataUrl("");
  };

  return (
    <div className="space-y-6">
      <section className="border border-gray-200 rounded-md p-5 bg-[#f8f9fa]">
        <h2 className="text-2xl font-semibold text-[#091a40] mb-3">Consent Form</h2>
        <p className="text-sm mb-1">School of Agriculture, Food and Ecosystems Sciences</p>
        <p className="text-sm mb-1">Faculty of Science</p>
        <p className="text-sm mt-3">
          Project: Understanding the current status of Australian truffle production and
          development of a real-time management platform of industry data
        </p>
        <p className="text-sm mt-3">
          Responsible Researcher: Dr Pangzhen Zhang, Tel: +61 3 8344 6890, Email:
          pangzhen.zhang@unimelb.edu.au
        </p>
        <p className="text-sm mt-3">
          Additional Researchers: PROF Ling Zhi Cheong, A/PROF Zhongxiang Fang, Dr Patanamon
          Thongtanunam, Ms Juan Wang, Dr Zijian Liang, Mr Mingzhao Liang, Ms Chiow Lynn Ang, Yin-Yi
          Kuo
        </p>
        <a
          href="/Consent_Form.docx"
          download
          className="inline-block mt-4 text-sm text-blue-700 underline"
        >
          Download Consent Form (.docx)
        </a>
      </section>

      <section className="border border-gray-200 rounded-md p-5 bg-white text-sm text-gray-700">
        <p className="mb-3">Name of Participant:</p>
        <ul className="list-disc pl-6 space-y-2 leading-6">
          <li>
            I consent to participate in this project, the details of which have been explained to
            me, and I have been provided with a written plain language statement to keep.
          </li>
          <li>
            I understand that the purpose of this research is to understand the current status of
            Australian truffle production and develop a real-time management platform for industry
            data.
          </li>
          <li>I understand that my participation in this project is for research purposes only.</li>
          <li>
            I acknowledge that the possible effects of participating in this research project have
            been explained to my satisfaction.
          </li>
          <li>
            In this project, I will be required to complete a benchmarking survey questionnaire and
            provide details about my truffle farm, orchard, or factory, covering production,
            processing, sustainability, orchard management, and business operations. I understand
            that my participation is voluntary and that I am free to withdraw from this project
            anytime without explanation or prejudice and to withdraw any unprocessed data that I
            have provided.
          </li>
          <li>
            I understand that the raw and unpublished data from this research will be stored at the
            University of Melbourne and will be destroyed 5 years after publication.
          </li>
          <li>
            I understand research results from this project will be published on peer-reviewed
            journals, database, research project thesis. I understand the results will also be
            presented at conference and workshop. I understand my identifiable information will NOT
            be included in any forms of publications, presentations and workshops.
          </li>
          <li>
            I have been informed that the confidentiality of the information I provide will be
            safeguarded subject to any legal requirements; my data will be password protected and
            accessible only by the named researchers.
          </li>
          <li>
            I understand that after I sign and return this consent form, it will be retained by the
            researcher.
          </li>
        </ul>
      </section>

      <section className="border border-gray-200 rounded-md p-5 bg-white space-y-4">
        <h3 className="text-lg font-semibold text-[#091a40]">Participant Signature</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSignatureMode("Type")}
            className={`px-4 py-1.5 rounded text-sm ${
              signatureMode === "Type"
                ? "bg-[#091a40] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Type
          </button>
          <button
            type="button"
            onClick={() => setSignatureMode("Sign")}
            className={`px-4 py-1.5 rounded text-sm ${
              signatureMode === "Sign"
                ? "bg-[#091a40] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sign
          </button>
        </div>

        {signatureMode === "Type" ? (
          <div className="space-y-3">
            <input
              type="text"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              placeholder="Type your signature"
              className="w-full border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
            />
            <div className="border border-gray-300 rounded-md min-h-[200px] p-4 bg-white">
              <p
                className="text-4xl text-gray-700 break-words"
                style={{
                  fontFamily:
                    '"Brush Script MT", "Lucida Handwriting", "Segoe Script", cursive',
                }}
              >
                {typedSignature}
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-gray-300 rounded-md bg-white p-2 relative">
            <canvas
              ref={canvasRef}
              width={920}
              height={220}
              className="w-full h-[220px] cursor-crosshair touch-none"
              onMouseDown={(event) => {
                const point = getCanvasPoint(event);
                if (!point) {
                  return;
                }
                startDrawing(point.x, point.y);
              }}
              onMouseMove={(event) => {
                const point = getCanvasPoint(event);
                if (!point) {
                  return;
                }
                drawLine(point.x, point.y);
              }}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={(event) => {
                event.preventDefault();
                const point = getCanvasTouchPoint(event);
                if (!point) {
                  return;
                }
                startDrawing(point.x, point.y);
              }}
              onTouchMove={(event) => {
                event.preventDefault();
                const point = getCanvasTouchPoint(event);
                if (!point) {
                  return;
                }
                drawLine(point.x, point.y);
              }}
              onTouchEnd={stopDrawing}
            />
            <button
              type="button"
              onClick={clearSignature}
              className="absolute right-3 bottom-2 text-sm text-gray-600 hover:text-gray-900"
            >
              clear
            </button>
            {!hasDrawnSignature ? (
              <p className="absolute left-4 top-3 text-xs text-gray-400 pointer-events-none">
                Sign here
              </p>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
