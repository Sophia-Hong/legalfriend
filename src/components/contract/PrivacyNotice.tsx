import { AlertCircle } from "lucide-react";

const PrivacyNotice = () => {
  return (
    <div className="mt-8 p-4 bg-surface/50 rounded-lg flex gap-3">
      <AlertCircle className="text-primary shrink-0" />
      <p className="text-sm text-secondary">
        Your privacy is our priority. All uploaded documents are encrypted and
        handled with strict confidentiality. We only use this information to
        provide you with accurate contract analysis.
      </p>
    </div>
  );
};

export default PrivacyNotice;