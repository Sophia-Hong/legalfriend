import { X } from "lucide-react";

interface RemoveFileButtonProps {
  onRemove: (e: React.MouseEvent) => void;
}

const RemoveFileButton = ({ onRemove }: RemoveFileButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(e);
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-2 right-2 p-1 rounded-full hover:bg-surface/50 transition-colors"
      title="Remove file"
    >
      <X className="w-5 h-5 text-muted-foreground" />
    </button>
  );
};

export default RemoveFileButton;