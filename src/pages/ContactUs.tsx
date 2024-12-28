import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/ContactForm";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@legalfriend.ai" className="text-primary hover:underline">
                      info@legalfriend.ai
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-medium">Mailing Address</p>
                    <p className="text-primary">41593 Winchester Rd. Suite 200, Temecula, CA 92590</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-medium">Phone Number</p>
                    <a href="tel:+15713828738" className="text-primary hover:underline">
                      +1 571 382 8738
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;