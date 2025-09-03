import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  onClose: () => void;
  showCloseButton?: boolean
  children: React.ReactNode;
}

export const ModalComponent: React.FC<ModalProps> = ({ onClose, showCloseButton = true, children }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg max-w-lg relative w-full ${showCloseButton ? 'p-5 m-5' : ''}`}>
      {
        showCloseButton &&
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-blue-950 text-lg cursor-pointer"
        >
          <FaXmark />
        </button>
      }
      {children}
    </div>
  );
};
