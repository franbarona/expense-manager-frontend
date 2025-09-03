import type { Category } from '../types/types';
import { filterCategoriesByType } from '../utils/transforms';
import DynamicIcon from './ui/DynamicIcon';

interface Props {
  categories: Category[];
  onEdit: (category: Category) => void;
}

const CategoryList = ({ categories, onEdit }: Props) => {
    return (
      <div className='flex flex-wrap justify-center overflow-x-hidden overflow-y-auto p-4'>
        {
          filterCategoriesByType(categories, 'expense').map((category) => (
            <button
              type='button'
              onClick={() => onEdit(category)}
              key={category.id}
              className={`w-1/4 flex flex-col justify-center items-center overflow-hidden text-ellipsis text-2xl p-2 cursor-pointer group`}
            >
              <span className={`rounded-[50%] shadow p-4 scale-95 hover:scale-105`} style={{ background: `${category.color}30`, color: `${category.color}` }}>
                <DynamicIcon name={category.icon}></DynamicIcon>
              </span>
              <span className='text-sm md:text-base overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full dark:text-gray-300 group-hover:text-white'>
                {category.name}
              </span>
            </button>
          ))
        }
      </div>
    )
  }

export default CategoryList;
