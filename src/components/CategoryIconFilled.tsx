import type { Category } from "../types/types";
import DynamicIcon from "./ui/DynamicIcon"

interface Props {
  category: Category | {
    icon: undefined;
    color: string;
  } | undefined;
  background?: boolean
}


const CategoryIconFilled = ({ category, background = true }: Props) => {
  return (
    <span className={`text-3xl w-full h-full flex justify-center items-center`} style={{ background: background ? `${category?.color}30` : '', color: `${category?.color}` }}>
      <DynamicIcon name={category?.icon}></DynamicIcon>
    </span>
  )
}

export default CategoryIconFilled;