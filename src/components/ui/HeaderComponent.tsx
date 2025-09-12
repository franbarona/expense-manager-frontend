type HeaderProps = {
  isSticky?: boolean
  children: React.ReactNode;
};

export const HeaderComponent: React.FC<HeaderProps> = ({
  isSticky,
  children,
}) => {
  return (
    <div className={
      `flex flex-col justify-center md:justify-between md:flex-row items-center
      flex-wrap space-y-2 bg-header backdrop-blur-sm
      z-30 top-0 left-0 pt-5 px-2 md:px-5 transition-shadow pb-2 ${isSticky ? "sticky border-b border-gray-300 dark:border-gray-700" : ""}`
    }>
      {children}
    </div>
  );
};
