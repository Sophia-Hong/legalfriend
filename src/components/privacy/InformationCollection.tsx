import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InformationCollection = () => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6" />
          1. Information We Collect
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-3">a. Information You Provide Directly</h3>
            <ul className="list-disc pl-6 space-y-2 text-primary">
              <li>
                <strong>Uploaded Documents</strong>: If you upload lease agreements or other documents, we collect the information contained within these documents to provide our services. This may include:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Personal identifiers (e.g., names, addresses)</li>
                  <li>Contract terms (e.g., rent amount, lease duration, obligations, and conditions)</li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">b. Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-primary">
              <li>
                <strong>Usage Data</strong>: When you interact with our website, we may collect technical information such as:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>IP addresses</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our website</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};