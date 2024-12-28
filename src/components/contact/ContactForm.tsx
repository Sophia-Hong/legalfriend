import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ContactFormFields } from "./ContactFormFields";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form data:", data);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ContactFormFields register={register} errors={errors} />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full text-white bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};