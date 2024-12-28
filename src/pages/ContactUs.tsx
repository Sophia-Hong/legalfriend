import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section with Unsplash Image */}
      <div 
        className="h-64 relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80")',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-8">
            {/* Contact Information Cards */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm space-y-8">
              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:support@legalfriend.ai" className="text-primary hover:underline">
                    support@legalfriend.ai
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium">Phone Number</p>
                  <a href="tel:+15713828738" className="text-primary hover:underline">
                    +1 571 382 8738
                  </a>
                </div>
              </div>
              
              {/* Address */}
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium">Mailing Address</p>
                  <p className="text-primary">41593 Winchester Rd. Suite 200, Temecula, CA 92590</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;