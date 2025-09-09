import { useCategories } from "../context/CategoriesContext";
import type { Category } from "../types/types";
import DynamicIcon from "./ui/DynamicIcon";

type CategoryPickerProps = {
  filteredCategories: Category[];
  categorySelected: string | undefined;
  onChange: (value: string) => void;
};

export const CategoryPicker: React.FC<CategoryPickerProps> = ({ filteredCategories, categorySelected, onChange }) => {
  const { categories } = useCategories();

  return (
    <div className='flex flex-wrap max-h-[200px] overflow-x-hidden overflow-y-auto'>
      {
        filteredCategories.map((category) => (
          <button
            type='button'
            key={category.id}
            onClick={() => onChange}
            className={`w-1/4 flex flex-col justify-center items-center overflow-hidden text-ellipsis text-2xl p-2 cursor-pointer ${categorySelected !== category.name ? 'opacity-40' : 'opacity-100'}`}
          >
            <span className={`rounded-[50%] p-4`} style={{ background: `${categories.find(cat => cat.name === category.name)?.color}20`, color: `${categories.find(cat => cat.name === category.name)?.color}` }}>
              <DynamicIcon name={categories.find(cat => cat.name === category.name)?.icon} />
            </span>
            <span className='text-base overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full'>
              {category.name}
            </span>
          </button>
        ))
      }
    </div>
  );
};
