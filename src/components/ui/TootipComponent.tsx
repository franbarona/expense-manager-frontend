type TooltipProps = {
  children: React.ReactNode;
  message: string;
};

const Tooltip = ({ children, message }: TooltipProps) => {
  return (
    <div className="relative group inline-block">
      {children}

      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 mx-auto
      opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800
      text-white text-sm rounded py-1 px-2 z-10 whitespace-normal pointer-events-none max-w-xs break-words">
        {message}
      </div>
    </div>
  );
};

export default Tooltip;