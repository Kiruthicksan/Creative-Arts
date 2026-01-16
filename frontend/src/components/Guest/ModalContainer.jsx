import { X } from "lucide-react";
import { useEffect } from "react";

const ModalContainer = ({ children, setIsAuthModalOpen }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const escapeClose = (e) => {
      if (e.key === "Escape"){
        setIsAuthModalOpen(false)
      }
    }
    useEffect(() => {
      document.addEventListener("keydown", escapeClose);
      return () => {
        document.removeEventListener("keydown", escapeClose);
      };
    }, []);
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 min-h-screen bg-black/70">
      <div className="bg-white rounded-2xl w-[400px] relative overflow-hidden w-[450px]">
        <div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4"
          >
            <X className="w-6 h-6" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
