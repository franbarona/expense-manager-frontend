import { PiCheckBold } from "react-icons/pi";
import type { Category } from "../../types/types";
import DynamicIcon from "./DynamicIcon";
import CategoryIconFilled from "../CategoryIconFilled";

type PickerOption = string | Category;

interface Props {
  label: string;
  type: 'colors' | 'icons' | 'categories';
  options: PickerOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  columns?: number;
  height?: number;
}

const PickerComponent = ({ label, type, options, selectedValue, onSelect, columns, height }: Props) => {

  const isSelectedValue = (option: PickerOption) => {
    if (type === 'categories') {
      return selectedValue === (option as Category).id;
    } else {
      return selectedValue === option;
    }
  }

  return (
    <>
      <label className="block mb-1 text-blue-900 dark:text-gray-200 capitalize">{label}* :</label>
      <div className={`flex flex-wrap overflow-x-hidden overflow-y-auto bg-[var(--color-primary)] shadow-[0_0_0_1px_var(--color-border)] rounded py-4 ${height ? `max-h-${height}` : 'max-h-35'}`}>
        {
          options.map((option: PickerOption, index) => (
            <button
              type='button'
              key={index}
              onClick={() => onSelect(typeof option === 'object' ? option.id : option)}
              className={`${columns ? `w-1/${columns}` : 'w-1/4'} py-1 px-3 cursor-pointer ${isSelectedValue(option) ? 'opacity-100' : 'opacity-40'}`}
            >
              {
                type === 'colors' &&
                <div
                  className={`w-10 h-10 rounded-full cursor-pointer transition transform hover:scale-110 flex justify-center items-center ${selectedValue === option ? 'ring-4 ring-offset-2 ring-indigo-300' : 'opacity-40'}`}
                  style={{ backgroundColor: option as string }}>
                  {
                    selectedValue === option &&
                    <PiCheckBold className='text-white font-semibold' />
                  }
                </div>
              }
              {
                type === 'icons' &&
                <div className={`text-3xl aspect-square p-1 rounded-full cursor-pointer transition transform hover:scale-110 flex justify-center items-center dark:text-white
              ${selectedValue === option ? 'ring-4 ring-offset-2 ring-indigo-300 dark:ring-sky-700' : 'opacity-60'}`
                }>
                  <DynamicIcon name={option as string} />
                </div>
              }
              {
                type === 'categories' &&
                <div className="flex flex-col justify-center items-center overflow-hidden text-ellipsis text-2xl">
                  <CategoryIconFilled category={option as Category} />
                  <span className='text-base overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full dark:text-white'>
                    {(option as Category).name}
                  </span>
                </div>
              }
            </button>
          ))
        }
      </div>
    </>
  )
}

export default PickerComponent;