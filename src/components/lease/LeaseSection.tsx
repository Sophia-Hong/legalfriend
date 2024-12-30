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
      <td className="p-2 sm:p-3 md:p-4 align-top">
        <div className="font-medium text-primary text-left text-sm">{provision}</div>
        <div className="text-xs text-secondary text-left">{section}</div>
      </td>
      <td className="p-2 sm:p-3 md:p-4 text-primary/80 align-top text-left text-sm">
        {details.map((detail, idx) => (
          <div key={idx} className="mb-1 leading-tight">{detail}</div>
        ))}
      </td>
      <td className="p-2 sm:p-3 md:p-4 align-top text-left">
        <div className="space-y-1.5">
          <div className={`flex items-start gap-1.5 ${
            assessment.type === "error" ? "text-red-600" :
            assessment.type === "warning" ? "text-amber-600" :
            "text-green-600"
          }`}>
            {assessment.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            ) : assessment.type === "warning" ? (
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertOctagon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            )}
            <span className="font-medium text-sm">{assessment.text}</span>
          </div>
          {assessment.info && (
            <div className="text-xs text-secondary ml-5">
              {assessment.info}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};