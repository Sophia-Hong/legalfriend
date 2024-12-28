import { Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Introduction = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-12">
        <Scale className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-semibold">Terms and Conditions</h1>
      </div>
      
      <Card className="mb-8 bg-white/50 backdrop-blur-sm shadow-sm">
        <CardContent className="p-6">
          <p className="text-lg text-primary">
            Welcome to LegalFriend! These Terms and Conditions govern your use of our services. By using our platform, you agree to these terms. Please read them carefully before proceeding.
          </p>
        </CardContent>
      </Card>
    </>
  );
};