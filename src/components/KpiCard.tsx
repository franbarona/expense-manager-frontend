import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { formatNumber } from "../utils/transforms";
import { TitleComponent } from "./ui/TitleComponent";
import type { TimeFilter } from "../utils/dateUtils";
import type { KpiCardsData } from "../types/types";

interface Props {
  card: KpiCardsData;
  timeFilter: TimeFilter;
}


const KpiCard = ({ card, timeFilter }: Props) => {
  return (
    <div key={card.name} className='bg-white dark:bg-gray-950/95 dark:border-1 dark:border-gray-700 rounded-xl shadow p-6 flex flex-col gap-4 justify-center col-span-12 xl:col-span-4 lg:col-span-6'>
      <div className='flex justify-between gap-5 items-center'>
        <TitleComponent extraClass="text-lg">{card.name}</TitleComponent>
        <div className={`rounded-xl flex justify-center items-center gap-2 px-4 text-sm md:text-base font-semibold ${card.variancePercentage > 0 ? 'bg-green-100 text-green-900 dark:bg-transparent dark:text-emerald-500' : 'bg-rose-100 text-red-900 dark:bg-transparent dark:text-rose-600'}`}>
          {card.variancePercentage > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
          {formatNumber(card.variancePercentage, 1)}%
        </div>
      </div>
      <div className="flex gap-2">
        <h2 className='text-2xl font-semibold dark:text-white'>{formatNumber(card.amount, 0)}$</h2>
      </div>
      <span className="text-gray-400 text-sm">{card.variance > 0 && '+'}{formatNumber(card.variance, 1)} compared with prev. {timeFilter}</span>
    </div>
  )
}

export default KpiCard;