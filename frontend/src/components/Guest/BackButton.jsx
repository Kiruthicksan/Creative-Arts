import { ChevronLeft } from "lucide-react";


const BackButton = () => {
  return (
    <div>
      <button
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        onClick={() => window.history.back()}
      >
        <ChevronLeft size={18} /> Back to Browse
      </button>
    </div>
  );
};

export default BackButton;
