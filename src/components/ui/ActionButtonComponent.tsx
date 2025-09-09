import React from "react";

type ActionButtonProps = {
  label: string;
  icon?: React.ElementType;
  isMobileDesign?: boolean;
  disabled?: boolean;
  action?: (e: React.FormEvent) => void ;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  isMobileDesign = false,
  disabled = false,
  action,
}) => {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={
        `group relative inline-flex gap-3 h-12 items-center justify-center overflow-hidden font-medium
        text-white bg-blue-800/70 dark:bg-blue-900/90 dark:border-1 dark:border-sky-700
        ${isMobileDesign ? 'w-12 rounded-full' : 'rounded-xl px-6'}
         ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`
      }>
      <span className='flex gap-2 items-center'>{Icon && <Icon />} {!isMobileDesign && label}</span>
    </button>
  );
};
