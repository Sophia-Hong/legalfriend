import RemoveFileButton from "./RemoveFileButton";
import UploadZoneContent from "./UploadZoneContent";
import { useFileUpload } from "@/hooks/useFileUpload";

interface FileUploadZoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUploadZone = ({ file, onFileChange }: FileUploadZoneProps) => {
  const {
    dragActive,
    inputRef,
    handleDrag,
    handleDrop,
    handleChange,
    handleRemoveFile,
  } = useFileUpload(onFileChange);

  const handleZoneClick = (e: React.MouseEvent) => {
    console.log("Zone clicked");
    e.preventDefault();
    e.stopPropagation();
    if (!file) {
      console.log("Triggering file input click");
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
        ${dragActive ? "border-highlight bg-surface/50" : "border-muted"}
        ${file ? "bg-surface/30" : "hover:bg-surface/10"}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleZoneClick}
    >
      {file && <RemoveFileButton onRemove={handleRemoveFile} />}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleChange}
        className="hidden"
        onClick={(e) => e.stopPropagation()}
      />

      <UploadZoneContent file={file} />
    </div>
  );
};

export default FileUploadZone;