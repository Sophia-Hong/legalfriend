import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TermsSectionProps {
  icon: LucideIcon;
  title: string;
  number: string;
  children: React.ReactNode;
}

export const TermsSection = ({ icon: Icon, title, number, children }: TermsSectionProps) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-6 h-6" />
          {number}. {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};