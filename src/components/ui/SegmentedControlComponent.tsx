import React from "react";
import DynamicIcon from "./DynamicIcon";

type Option = {
  label: string;
  value: string;
  isIcon?: boolean;
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
                ? "bg-white dark:bg-blue-800/70 dark:border-1 dark:border-sky-700 text-blue-800/70 dark:text-white shadow font-semibold"
                : "text-secondary hover:bg-gray-300 dark:hover:text-white dark:hover:bg-transparent "}
            `}
          >
            {
              option.isIcon &&
              <div className="text-lg">
                <DynamicIcon name={option.label}></DynamicIcon>
              </div>
            }
            {
              !option.isIcon && option.label
            }
          </button>
        );
      })}
    </div>
  );
};
