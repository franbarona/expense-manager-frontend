import React from "react";

type Option = {
  label: string;
  value: string;
};

type SegmentedControlProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const SegmentedControlComponent: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex bg-gray-200 rounded-full p-1 text-sm">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer
              ${active
                ? "bg-white text-blue-800/70 shadow"
                : "text-gray-600 hover:bg-gray-300"}
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
