type TitleProps = {
  children: React.ReactNode;
  extraClass?: string;
};

export const TitleComponent: React.FC<TitleProps> = ({
  children,
  extraClass
}) => {
  return (
    <h1 className={`text-2xl font-semibold dark:text-white ${extraClass}`}>{children}</h1>
  );
};
