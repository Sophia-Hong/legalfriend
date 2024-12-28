import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Introduction = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-12">
        <FileText className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-semibold">Terms and Conditions</h1>
      </div>
      
      <Card className="mb-8 bg-white/50 backdrop-blur-sm shadow-sm">
        <CardContent className="p-6">
          <p className="text-lg text-primary">
            Welcome to LegalFriend! These Terms and Conditions govern your use of our services. By accessing or using our services, you agree to be bound by these terms.
          </p>
        </CardContent>
      </Card>
    </>
  );
};