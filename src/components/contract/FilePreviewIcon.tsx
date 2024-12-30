import { Upload, FileText, File } from "lucide-react";

interface FilePreviewIconProps {
  file: File | null;
}

const FilePreviewIcon = ({ file }: FilePreviewIconProps) => {
  if (!file) return <Upload className="w-12 h-12 text-primary" />;
  
  return file.type === "application/pdf" ? (
    <File className="w-12 h-12 text-primary" />
  ) : (
    <FileText className="w-12 h-12 text-primary" />
  );
};

export default FilePreviewIcon;