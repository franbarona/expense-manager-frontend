import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { formatNumber, formatNumberParts } from "../utils/transforms";
import { TitleComponent } from "./ui/TitleComponent";
import type { TimeFilter } from "../utils/dateUtils";
import type { KpiCardsData } from "../types/types";
import Tooltip from "./ui/TootipComponent";
import { LuInfo } from "react-icons/lu";

interface Props {
  card: KpiCardsData;
  timeFilter: TimeFilter;
}

const KpiCard = ({ card, timeFilter }: Props) => {
  const { decimalPart } = formatNumberParts(card.amount);

  return (
    <div key={card.name} className='bg-surface dark:border-1 border-primary rounded-xl shadow p-6 flex flex-col gap-4 justify-center col-span-12 xl:col-span-4 lg:col-span-6'>
      <div className='flex justify-between gap-5 items-center'>
        <TitleComponent extraClass="text-lg">{card.name}</TitleComponent>
        <div className="flex gap-1 items-baseline">
          <div
            className={`cursor-default rounded-xl flex justify-center items-center gap-2 px-1 text-sm md:text-base font-semibold ${card.variancePercentage > 0 ? 'bg-green-100 text-green-900 dark:bg-transparent dark:text-emerald-500' : 'bg-rose-100 text-red-900 dark:bg-transparent dark:text-rose-400'}`}>
            {card.variancePercentage > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
            {formatNumber(card.variancePercentage, 1)}%
          </div>
          <div className="hidden lg:block">
            <Tooltip message={`Percentage variation with prev. ${timeFilter}`}><LuInfo className="cursor-pointer dark:text-white text-lg" /></Tooltip>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <h2 className='text-primary'>
          <span className="text-2xl font-semibold">{formatNumber(card.amount, 0)}</span>
          <span className="text-lg font-medium">.{decimalPart}$</span>
        </h2>
      </div>
      <span className="text-gray-400 text-sm">{card.variance > 0 && '+'}{formatNumber(card.variance, 0)}$ compared with prev. {timeFilter}</span>
    </div>
  )
}

export default KpiCard;