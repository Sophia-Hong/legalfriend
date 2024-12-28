import { Mail, MapPin, Phone } from "lucide-react";

export const ContactInfo = () => {
  return (
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
  );
};