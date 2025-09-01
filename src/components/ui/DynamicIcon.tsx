import * as PiIcons from "react-icons/pi";


type DynamicIconProps = {
  name: string | undefined;
};

const DynamicIcon: React.FC<DynamicIconProps> = ({ name }) => {
  const IconComponent = name ? (PiIcons as Record<string, React.ElementType>)[name] : undefined;

  if (!IconComponent) {
    return <PiIcons.PiQuestionMark></PiIcons.PiQuestionMark>;
  }

  return <IconComponent />;
};

export default DynamicIcon;
