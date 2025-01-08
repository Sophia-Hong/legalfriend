import { Info } from "lucide-react";

const PrivacyNotice = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted mt-12 max-w-2xl mx-auto text-center">
      <Info className="w-4 h-4 flex-shrink-0" />
      <p>
        Your privacy is our priority. All uploaded documents are encrypted and handled with strict confidentiality. We only use this information to provide you with accurate contract analysis.
      </p>
    </div>
  );
};

export default PrivacyNotice;