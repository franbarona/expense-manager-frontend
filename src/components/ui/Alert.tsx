import { IoCheckmarkCircle, IoCheckmarkSharp, IoInformationCircle } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import type { AlertType } from "../../types/types";

type AlertProps = {
  id: number;
  type: AlertType;
  message: string;
  onClose: (id: number) => void;
}

const typeStyles = {
  success: {
    icon: <IoCheckmarkCircle className="h-5 w-5 text-emerald-600" />,
  },
  error: {
    icon: <IoCheckmarkSharp className="h-5 w-5 text-rose-600" />,
  },
  info: {
    icon: <IoInformationCircle className="h-5 w-5 text-sky-600" />,
  },
};

const Alert = ({ id, type = 'info', message, onClose }: AlertProps) => {
  const style = typeStyles[type] || typeStyles.info;

  return (
    <div className={`flex items-start py-8 px-6 rounded-md bg-alert text-primary shadow-md max-w-[350px]`}>
      <button onClick={() => onClose(id)} className="absolute top-3 right-3 text-xl cursor-pointer text-secondary">
        <FaXmark />
      </button>
      <div className="flex gap-2 justify-start">
        {style.icon}
        <div className="mr-3 flex-1 text-sm font-medium">{message}</div>
      </div>
    </div>
  );
};

export default Alert;
