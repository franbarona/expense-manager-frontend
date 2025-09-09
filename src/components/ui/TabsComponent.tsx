import React from "react";
import { v4 as uuidv4 } from 'uuid';

type Option = {
  label: string;
  value: string | undefined;
};

type TabsProps = {
  options: Option[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
};

export const TabsComponent: React.FC<TabsProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="mb-2 flex justify-center gap-10">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={uuidv4()}
            type="button"
            onClick={() => onChange(option.value)}
            className={`transition-colors cursor-pointer font-semibold text-lg
              ${active
                ? "border-b-2 dark:text-white border-blue-800/70 dark:border-sky-700"
                : "text-neutral-400  hover:text-neutral-800 dark:hover:text-neutral-50"}
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
