import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

type Assessment = {
  type: "success" | "warning" | "error";
  text: string;
  info?: string;
};

type Section = {
  provision: string;
  section: string;
  details: string[];
  assessment: Assessment;
};

interface LeaseAnalysisTableProps {
  sections: Section[];
}

const LeaseAnalysisTable = ({ sections }: LeaseAnalysisTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-accent/20">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface">
              <th className="p-4 text-left text-primary font-medium border-b border-accent/20 w-1/4">Provision & Section</th>
              <th className="p-4 text-left text-primary font-medium border-b border-accent/20 w-2/5">Key Terms</th>
              <th className="p-4 text-left text-primary font-medium border-b border-accent/20">Analysis & Context</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, index) => (
              <tr key={index} className="border-b border-accent/20 hover:bg-surface/50 transition-colors">
                <td className="p-4 align-top">
                  <div className="font-medium text-primary text-left">{section.provision}</div>
                  <div className="text-sm text-secondary text-left">{section.section}</div>
                </td>
                <td className="p-4 text-primary/80 align-top text-left">
                  {section.details.map((detail, idx) => (
                    <div key={idx} className="mb-1">{detail}</div>
                  ))}
                </td>
                <td className="p-4 align-top text-left">
                  <div className="space-y-2">
                    <div className={`flex items-start gap-2 ${
                      section.assessment.type === "error" ? "text-red-600" :
                      section.assessment.type === "warning" ? "text-amber-600" :
                      "text-green-600"
                    }`}>
                      {section.assessment.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      ) : section.assessment.type === "warning" ? (
                        <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertOctagon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="font-medium">{section.assessment.text}</span>
                    </div>
                    {section.assessment.info && (
                      <div className="text-sm text-secondary ml-7 mt-1">
                        {section.assessment.info}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaseAnalysisTable;