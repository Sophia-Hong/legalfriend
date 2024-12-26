import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Introduction = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-12">
        <Shield className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
      </div>
      
      <Card className="mb-8 bg-white/50 backdrop-blur-sm shadow-sm">
        <CardContent className="p-6">
          <p className="text-lg text-primary">
            Welcome to LegalFriend! Your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you use our services, which include AI-powered lease agreement analysis.
          </p>
        </CardContent>
      </Card>
    </>
  );
};