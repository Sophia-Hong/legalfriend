import { X } from "lucide-react";

interface FilePreviewProps {
  file: File;
  onDelete: () => void;
}

const FilePreview = ({ file, onDelete }: FilePreviewProps) => {
  return (
    <div className="relative inline-block px-6">
      <button
        onClick={onDelete}
        className="absolute -top-1 -right-1 p-1 rounded-full bg-surface hover:bg-muted/20 transition-colors shadow-sm"
        aria-label="Remove file"
      >
        <X className="w-4 h-4 text-primary" />
      </button>
      <p className="text-primary font-medium">{file.name}</p>
      <p className="text-sm text-muted mt-1">
        {(file.size / (1024 * 1024)).toFixed(2)} MB
      </p>
    </div>
  );
};

export default FilePreview;