import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&h=1072"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-white/90">
                Have questions? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto -mt-20 relative z-10 mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ContactInfo />
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;