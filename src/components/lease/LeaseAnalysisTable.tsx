import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

type Assessment = {
  type: "success" | "warning" | "error";
  text: string;
  info?: string;
};

type Section = {
  title: string;
  items: ReadonlyArray<{
    label: string;
    value: string;
  }>;
};

interface LeaseAnalysisTableProps {
  sections: ReadonlyArray<Section>;
}

const LeaseAnalysisTable = ({ sections }: LeaseAnalysisTableProps) => {
  if (!sections) {
    return null; // Early return if sections is undefined
  }

  return (
    <div className="overflow-hidden rounded-lg border border-accent/20">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface">
              <th className="p-4 text-left text-primary font-medium border-b border-accent/20">Category</th>
              <th className="p-4 text-left text-primary font-medium border-b border-accent/20">Details</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, sectionIndex) => (
              <tr key={sectionIndex} className="border-b border-accent/20 hover:bg-surface/50 transition-colors">
                <td className="p-4 align-top">
                  <div className="font-medium text-primary">{section.title}</div>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between text-primary/80">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
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