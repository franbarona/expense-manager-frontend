import { FaXmark } from "react-icons/fa6";
import { type MouseEvent } from 'react';

interface ModalProps {
  onClose: () => void;
  handleOverlayClick: (e: MouseEvent<HTMLDivElement>) => void;
  showCloseButton?: boolean
  children: React.ReactNode;
  specialClass?: string;
}

export const ModalComponent: React.FC<ModalProps> = ({ onClose, handleOverlayClick, showCloseButton = true, children, specialClass }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm bg-opacity-50 z-50 ${specialClass}`}
      onClick={handleOverlayClick} // Detecta el clic en el overlay
    >
      <div className={`relative overflow-auto bg-white bg-surface rounded-lg shadow-lg max-w-lg max-h-[95%] w-full ${showCloseButton ? 'px-4 lg:px-10 py-6 m-5 border-primary' : ''}`}>
        {
          showCloseButton &&
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:text-blue-950 text-2xl cursor-pointer dark:text-neutral-400 dark:hover:text-white"
          >
            <FaXmark />
          </button>
        }
        {children}
      </div>
    </div>

  );
};
