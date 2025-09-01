import { TAILWIND_COLORS_600 } from '../../constants/constants';

type ColorPickerProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

export const ColorPickerComponent: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="font-semibold">Select a color:</h2>

      <div className="flex flex-wrap gap-2">
        {Object.values(TAILWIND_COLORS_600).map((color) => (
          <div
            key={color}
            className={`w-12 h-12 rounded-full cursor-pointer transition transform hover:scale-110 ${value === color ? 'ring-4 ring-offset-2 ring-indigo-300' : ''
              }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
    </div>
  );
};
