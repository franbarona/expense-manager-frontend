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
    <div className="inline-flex bg-secondary rounded-full p-1 text-sm">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer
              ${active
              // dark:bg-neutral-500/70
                ? "bg-white dark:bg-blue-800/70 dark:border-1 dark:border-sky-700 text-blue-800/70 dark:text-white shadow font-semibold"
                : "text-secondary hover:bg-gray-300 dark:hover:text-white dark:hover:bg-transparent "}
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
