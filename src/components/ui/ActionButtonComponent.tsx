import React from "react";

type ActionButtonProps = {
  label: string;
  icon?: React.ElementType;
  isMobileDesign?: boolean;
  disabled?: boolean;
  style?: 'normal' | 'secondary' | 'remove'; 
  action?: (e: React.FormEvent) => void;
};

const typeStyles = {
  normal: "text-white bg-accent dark:border-1 dark:border-sky-700",
  secondary: "bg-white/80 text-accent dark:border-2 dark:border-gray-700",
  remove: "bg-white text-rose-500 border-1 border-rose-500"
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  isMobileDesign = false,
  disabled = false,
  style = 'normal',
  action,
}) => {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={
        `group relative inline-flex gap-3 h-12 items-center justify-center overflow-hidden font-medium ${typeStyles[style]}
        ${isMobileDesign ? 'w-12 rounded-full' : 'rounded-xl px-6'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`
      }>
      <span className='flex gap-2 items-center'>{Icon && <Icon />} {!isMobileDesign && label}</span>
    </button>
  );
};
