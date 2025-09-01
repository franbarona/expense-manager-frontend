import {
  format, startOfWeek, endOfWeek, isSameDay,
  isSameWeek, isSameMonth, isSameYear, parseISO,
  subDays, subWeeks, subMonths, subYears,
  addDays, addWeeks, addMonths, addYears,
  getWeek
} from 'date-fns';

export type TimeFilter = 'day' | 'week' | 'month' | 'year';

export function getPeriodLabel (filter: TimeFilter, refDate: Date): string {
  switch (filter) {
    case 'day':
      return format(refDate, 'MMMM d, yyyy');
    case 'week':
      const start = startOfWeek(refDate, { weekStartsOn: 1 });
      const end = endOfWeek(refDate, { weekStartsOn: 1 });
      return `${format(start, 'MMMM d, yyyy')} - ${format(end, 'MMMM d, yyyy')}`;
    case 'month':
      return format(refDate, 'MMMM yyyy');
    case 'year':
      return format(refDate, 'yyyy');
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
  const now = new Date();
  switch (timeFilter) {
    case 'day':
      return period.toLocaleDateString() >= now.toLocaleDateString();

    case 'week':
      return getWeek(period) >= getWeek(now) && period.getMonth() >= now.getMonth() && period.getFullYear() >= now.getFullYear();

    case 'month':
      return period.getMonth() >= now.getMonth() && period.getFullYear() >= now.getFullYear();

    case 'year':
      return period.getFullYear() >= now.getFullYear();

    default:
      return period.getFullYear() >= now.getFullYear();
  }
}
