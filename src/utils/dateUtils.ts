import {
  format, startOfWeek, endOfWeek, isSameDay,
  isSameWeek, isSameMonth, isSameYear, parseISO,
  subDays, subWeeks, subMonths, subYears,
  addDays, addWeeks, addMonths, addYears,
  getISOWeek
} from 'date-fns';

export type TimeFilter = 'day' | 'week' | 'month' | 'year';

export const getCurrentYear = () => {
  return new Date().getFullYear();
}

export function getPeriodLabel (filter: TimeFilter, refDate: Date): string {
  const periodDate = refDate > new Date() ? new Date() : new Date(refDate);
  switch (filter) {
    case 'day':
      return format(periodDate, 'MMMM d, yyyy');
    case 'week':
      {
        const start = startOfWeek(periodDate, { weekStartsOn: 1 });
        const end = endOfWeek(periodDate, { weekStartsOn: 1 });

        return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
      }
    case 'month':
      return format(periodDate, 'MMMM yyyy');
    case 'year':
      return format(periodDate, 'yyyy');
    default:
      return '';
  }
}

export function isInPeriod (dateStr: string, filter: TimeFilter, refDate: Date): boolean {
  const date = parseISO(dateStr);
  switch (filter) {
    case 'day':
      return isSameDay(date, refDate);
    case 'week':
      return isSameWeek(date, refDate, { weekStartsOn: 1 });
    case 'month':
      return isSameMonth(date, refDate);
    case 'year':
      return isSameYear(date, refDate);
    default:
      return true;
  }
}

export function getPrevPeriod (timeFilter: TimeFilter, period: Date): Date {
  switch (timeFilter) {
    case "day":
      return subDays(period, 1);
    case "week":
      return subWeeks(period, 1);
    case "month":
      return subMonths(period, 1);
    case "year":
      return subYears(period, 1);
    default:
      return period;
  }
}

export function getNextPeriod (timeFilter: TimeFilter, period: Date): Date {
  switch (timeFilter) {
    case "day":
      return addDays(period, 1);
    case "week":
      return addWeeks(period, 1);
    case "month":
      return addMonths(period, 1);
    case "year":
      return addYears(period, 1);
    default:
      return period;
  }
}

export function isNextDisabled (period: Date, timeFilter: TimeFilter): boolean {
  const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  switch (timeFilter) {
    case 'day':
      return period >= now;

    case 'week':
      return getISOWeek(period) >= getISOWeek(now) && period.getMonth() >= now.getMonth() && period.getFullYear() >= now.getFullYear();

    case 'month':
      return period.getMonth() >= now.getMonth() && period.getFullYear() >= now.getFullYear();

    case 'year':
      return period.getFullYear() >= now.getFullYear();

    default:
      return period.getFullYear() >= now.getFullYear();
  }
}
