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
    <div className=' grid gap-2 lg:gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-hidden overflow-y-auto'>
      {
        filterCategoriesByType(categories, transactionType).map((category) => (
          <button
            type='button'
            onClick={() => onEdit(category)}
            key={category.id}
            className={
              `aspect-square flex flex-col justify-center items-center overflow-hidden text-ellipsis 
              text-2xl p-2 cursor-pointer group gap-4 bg-surface dark:border-1 border-primary rounded-lg shadow last:mb-4`}
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
