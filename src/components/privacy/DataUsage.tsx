import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DataUsage = () => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6" />
          2. How We Use Your Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-primary mb-4">We use the information collected to:</p>
        <ol className="list-decimal pl-6 space-y-2 text-primary">
          <li>Provide our services, including analyzing lease agreements and offering insights</li>
          <li>Improve our services through anonymized data analysis and insights</li>
          <li>Communicate with you regarding your use of our services, updates, and support requests</li>
          <li>Ensure compliance with applicable laws and prevent fraudulent activities</li>
        </ol>
      </CardContent>
    </Card>
  );
};