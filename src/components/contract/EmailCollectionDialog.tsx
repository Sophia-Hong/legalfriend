import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailCollectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const EmailCollectionDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: EmailCollectionDialogProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95%] mx-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center gap-2 text-2xl md:text-3xl font-bold">
            <Mail className="w-7 h-7 md:w-8 md:h-8" />
            Get Your Analysis
          </DialogTitle>
          <DialogDescription className="text-base md:text-lg">
            We're generating your custom analysis. Where should we send the results?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 text-base md:text-lg"
          />
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="bg-highlight text-primary hover:bg-highlight/90 text-base md:text-lg px-6 py-2"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCollectionDialog;