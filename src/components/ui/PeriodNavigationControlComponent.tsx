import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { isNextDisabled, getPeriodLabel, type TimeFilter } from '../../utils/dateUtils';
import { useMemo } from 'react';

interface PeriodNavigationControlProps {
  timeFilter: TimeFilter;
  period: Date;
  goPrev: () => void;
  goNext: () => void;
}

const PeriodNavigationControlComponent: React.FC<PeriodNavigationControlProps> = ({ timeFilter, period, goPrev, goNext }) => {
  const isIncrementDisabled = useMemo(() => isNextDisabled(period, timeFilter), [period, timeFilter]);
  const periodLabel = useMemo(() => getPeriodLabel(timeFilter, period), [timeFilter, period]);

  return (
    <div className="flex w-fit justify-between items-center text-sm text-gray-600 gap-5">
      <button
        onClick={goPrev}
        className="relative cursor-pointer inline-flex p-2 items-center justify-center rounded-md border-neutral-200 text-neutral-600 dark:text-neutral-200 bg-transparent transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
      >
        <FaAngleLeft />
      </button>
      <span className='dark:text-neutral-200'>{periodLabel}</span>
      <button
        onClick={goNext}
        disabled={isIncrementDisabled}
        className={`relative cursor-pointer inline-flex p-2 items-center justify-center rounded-md border-neutral-200 text-neutral-600 dark:text-neutral-200 bg-transparent transition-colors hover:bg-neutral-200 ${isIncrementDisabled ? 'opacity-20' : ''}`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default PeriodNavigationControlComponent;