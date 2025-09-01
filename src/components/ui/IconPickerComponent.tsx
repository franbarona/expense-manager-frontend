import { CATEGORY_ICON_LIST } from "../../constants/constants";
import DynamicIcon from "./DynamicIcon";

type IconPickerProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

export const IconPickerComponent: React.FC<IconPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="font-semibold">Select an icon:</h2>

      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORY_ICON_LIST.map((icon, index) => (
          <div
            key={index}
            className={`text-2xl w-12 h-12 rounded-full cursor-pointer transition transform hover:scale-110 flex justify-center items-center ${value === icon ? 'ring-4 ring-offset-2 ring-indigo-300' : ''
              }`}
            onClick={() => onChange(icon)}
          >
            <DynamicIcon name={icon} />
          </div>
        ))}
      </div>
    </div>
  );
};
