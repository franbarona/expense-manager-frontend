import React from "react";

type ActionButtonProps = {
  label: string;
  icon?: React.ElementType;
  action: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  action,
}) => {
  return (
    <button
      onClick={action}
      className={`group relative inline-flex gap-3 h-12 items-center justify-center overflow-hidden rounded-xl px-6 font-medium cursor-pointer text-white bg-blue-800/70`}>
      <span className='flex gap-2 items-center'>{Icon && <Icon />} {label}</span>
    </button>
  );
};
