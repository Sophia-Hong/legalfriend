import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ContactInfo = () => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-6 h-6" />
          13. Contact Us
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-primary mb-6">If you have questions or concerns about this Privacy Policy, please contact us at:</p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-primary">info@legalfriend.ai</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Mailing Address</p>
              <p className="text-primary">41593 Winchester Rd. Suite 200, Temecula, CA 92590</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Phone Number</p>
              <p className="text-primary">+1 571 382 8738</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary mt-8">Effective Date: December 8, 2024</p>
      </CardContent>
    </Card>
  );
};