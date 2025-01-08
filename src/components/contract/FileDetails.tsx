interface FileDetailsProps {
  file: File | null;
}

const FileDetails = ({ file }: FileDetailsProps) => {
  if (!file) {
    return (
      <>
        <p className="text-primary font-medium mb-2">
          Drag & Drop your contract here
        </p>
        <p className="text-lg text-blue-600 underline decoration-2 hover:text-blue-700 transition-colors font-medium cursor-pointer">
          or Click to Browse
        </p>
        <p className="text-sm text-muted mt-2">(PDF or DOCX files accepted)</p>
      </>
    );
  }

  return (
    <div className="space-y-2">
      <p 
        className="text-lg text-primary font-medium truncate max-w-[90%] mx-auto" 
        title={file.name}
      >
        {file.name}
      </p>
      <p className="text-sm text-muted">
        {(file.size / (1024 * 1024)).toFixed(2)} MB
      </p>
      <p className="text-xs text-muted mt-1">
        Click or drag to replace
      </p>
    </div>
  );
};

export default FileDetails;