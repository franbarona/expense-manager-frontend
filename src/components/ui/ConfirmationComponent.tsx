import { ActionButton } from "./ActionButtonComponent";
import { TitleComponent } from "./TitleComponent";

interface ConfirmationProps {
  title?: string
  message?: string;
  onAccept: () => void;
  onCancel: () => void;
}

export const ConfirmationComponent: React.FC<ConfirmationProps> = ({ title, message, onAccept, onCancel }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-4">
      <TitleComponent>{title}</TitleComponent>
      <p className="text-secondary">{message}</p>
      <div className="m-auto flex gap-4">
        <ActionButton label='Accept' action={onAccept}></ActionButton>
        <ActionButton label='Cancel' action={onCancel} style='secondary'></ActionButton>
      </div>
    </div>
  );
};
