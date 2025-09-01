import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isTransactionTypeMenuOpened, setIsTransactionTypeMenuOpened] = useState(false);

  const onChangeAction = (value: string) => {
    onChange(value);
    setIsTransactionTypeMenuOpened(false);
  }

  return (
    <div className='justify-self-end'>
      <button
        onClick={() => setIsTransactionTypeMenuOpened(!isTransactionTypeMenuOpened)}
        className="cursor-pointer rounded-md bg-white text-blue-800/80 py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-gray-300 focus:shadow-none active:bg-gray-300 hover:bg-gray-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
        <div className='flex gap-2 items-center'>
          { value } { isTransactionTypeMenuOpened ? <IoIosArrowUp /> : <IoIosArrowDown /> }
        </div>
      </button>
      {
        isTransactionTypeMenuOpened &&
        <ul
          className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none"
        >
          {options.map((option) => {
            return (
              <li
                key={option.value}
                onClick={() => onChangeAction(option.value)}
                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};
