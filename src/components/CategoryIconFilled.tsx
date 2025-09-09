import type { Category } from "../types/types";
import DynamicIcon from "./ui/DynamicIcon"

interface Props {
  category: Category | {
    icon: undefined;
    color: string;
  } | undefined;
}


const CategoryIconFilled = ({ category }: Props) => {
  return (
    <span className={`rounded-[50%] text-2xl p-2`} style={{ background: `${category?.color}20`, color: `${category?.color}`, border: `1px solid ${category?.color}30` }}>
      <DynamicIcon name={category?.icon}></DynamicIcon>
    </span>
  )
}

export default CategoryIconFilled;