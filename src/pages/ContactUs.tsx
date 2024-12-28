import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

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

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
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