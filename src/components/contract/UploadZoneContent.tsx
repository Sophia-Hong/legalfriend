import FilePreviewIcon from "./FilePreviewIcon";
import FileDetails from "./FileDetails";

interface UploadZoneContentProps {
  file: File | null;
}

const UploadZoneContent = ({ file }: UploadZoneContentProps) => {
  return (
    <div className="space-y-6">
      <div className="w-24 h-24 mx-auto bg-surface rounded-full flex items-center justify-center shadow-sm">
        <FilePreviewIcon file={file} />
      </div>
      <div>
        <FileDetails file={file} />
      </div>
    </div>
  );
};

export default UploadZoneContent;