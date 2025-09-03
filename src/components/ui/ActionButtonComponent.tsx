import React from "react";

type ActionButtonProps = {
  label: string;
  icon?: React.ElementType;
  isMobileDesign?: boolean;
  action: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  isMobileDesign = false,
  action,
}) => {
  return (
    <button
      onClick={action}
      className={`group relative inline-flex gap-3 h-12 items-center justify-center overflow-hidden font-medium cursor-pointer text-white bg-blue-800/70 dark:bg-blue-900/90 dark:border-1 dark:border-sky-700 ${isMobileDesign ? 'w-12 rounded-full' : 'rounded-xl px-6'}`}>
      <span className='flex gap-2 items-center'>{Icon && <Icon />} {!isMobileDesign && label}</span>
    </button>
  );
};
