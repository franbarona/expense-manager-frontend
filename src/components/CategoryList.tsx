import type { Category, TransactionType } from '../types/types';
import { filterCategoriesByType } from '../utils/transforms';
import CategoryIconFilled from './CategoryIconFilled';

interface Props {
  categories: Category[];
  transactionType: TransactionType | undefined;
  onEdit: (category: Category) => void;
}

const CategoryList = ({ categories, transactionType, onEdit }: Props) => {
  return (
    <div className='flex flex-wrap justify-center overflow-x-hidden overflow-y-auto p-4'>
      {
        filterCategoriesByType(categories, transactionType).map((category) => (
          <button
            type='button'
            onClick={() => onEdit(category)}
            key={category.id}
            className={`w-1/4 flex flex-col justify-center items-center overflow-hidden text-ellipsis text-2xl p-2 cursor-pointer group`}
          >
            <CategoryIconFilled category={category} />
            <span className='text-sm md:text-base overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full dark:text-white group-hover:font-medium'>
              {category.name}
            </span>
          </button>
        ))
      }
    </div>
  )
}

export default CategoryList;
