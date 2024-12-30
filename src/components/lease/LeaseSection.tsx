import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

type AssessmentType = "success" | "warning" | "error";

interface Assessment {
  type: AssessmentType;
  text: string;
  info?: string;
}

interface LeaseSection {
  provision: string;
  section: string;
  details: string[];
  assessment: Assessment;
}

export const LeaseSection = ({ provision, section, details, assessment }: LeaseSection) => {
  return (
    <tr className="border-b border-accent/20 hover:bg-surface/50 transition-colors">
      <td className="p-3 md:p-4 align-top">
        <div className="font-medium text-primary text-left text-sm sm:text-base">{provision}</div>
        <div className="text-xs sm:text-sm text-secondary text-left">{section}</div>
      </td>
      <td className="p-3 md:p-4 text-primary/80 align-top text-left text-sm sm:text-base">
        {details.map((detail, idx) => (
          <div key={idx} className="mb-1">{detail}</div>
        ))}
      </td>
      <td className="p-3 md:p-4 align-top text-left">
        <div className="space-y-2">
          <div className={`flex items-start gap-2 ${
            assessment.type === "error" ? "text-red-600" :
            assessment.type === "warning" ? "text-amber-600" :
            "text-green-600"
          }`}>
            {assessment.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
            ) : assessment.type === "warning" ? (
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertOctagon className="h-5 w-5 mt-0.5 flex-shrink-0" />
            )}
            <span className="font-medium text-sm sm:text-base">{assessment.text}</span>
          </div>
          {assessment.info && (
            <div className="text-xs sm:text-sm text-secondary ml-7 mt-1">
              {assessment.info}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};