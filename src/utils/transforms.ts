import type { Category, EChartBarChartData, EChartPieChartData, Transaction, TransactionType } from "../types/types";

export const variance = (num1: number, num2: number): number => {
    return num1 - num2
}

export const transformNumberToPositive = (n: number): number => {
  return Math.abs(n);
}

export const formatNumber = (num: number, decimals: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const filterTransactionsByType = (data: Transaction[], transactionType: TransactionType | undefined): Transaction[] => {
  if (!transactionType) return data;
  return data.filter(transaction => transaction.type === transactionType);
};

export const filterCategoriesByType = (data: Category[], transactionType: TransactionType | undefined): Category[] => {
  if (!transactionType) return data;
  return data.filter(category => category.type === transactionType);
};

export const getStoredCategories = () => {
  const stored = localStorage.getItem("categories");
  if (stored) {
    return JSON.parse(stored);
  } else {
    return [];
  }
}

export const groupTransactionsByCategory = (data: Transaction[]): Record<string, number> => {
  return data
    .reduce((map: Record<string, number>, transaction) => {
      map[transaction.category] = (map[transaction.category] || 0) + transaction.amount;
      return map;
    }, {});
};

export const mapToPieChartData = (groupedData: Record<string, number>, categories: Category[]): EChartPieChartData[] => {
  return Object.entries(groupedData).map(([categoryId, value]) => ({
    name: categories.find(category => category.id === categoryId)?.name || 'undefined',
    value: value,
    itemStyle: {
      color: categories.find(category => category.id === categoryId)?.color || '#000'
    }
  }));
};

export const groupTransactionsByMonthAndType = (data: Transaction[]) => {
  const map: Record<string, { key: string; income: number; expense: number }> = {};

  data.forEach(t => {
    const d = new Date(t.date);
    if (isNaN(d.getTime())) return; // ignorar fechas inválidas

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // 01..12
    const key = `${year}-${month}`; // ej. "2025-01"

    if (!map[key]) map[key] = { key, income: 0, expense: 0 };
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expense += t.amount;
  });

  // ordenar por clave YYYY-MM (lexicográficamente funciona)
  const arr = Object.values(map).sort((a, b) => a.key.localeCompare(b.key));
  // formatear la etiqueta del eje X (ej: "ene 2025") en ES
  const formatter = new Intl.DateTimeFormat("en-EN", { month: "short" });
  return arr.map(item => {
    const label = formatter.format(new Date(`${item.key}-01`));
    return { category: label, income: item.income, expense: transformNumberToPositive(item.expense) } as unknown as EChartBarChartData;
  });
};

export const groupExpensesByDayOfTheWeek = (data: Transaction[]) => {
  {
    const map: Record<number, { total: number; count: number }> = {};
    data
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const day = new Date(t.date).getDay(); // 0 = Sunday, 1 = Monday...
        if (!map[day]) map[day] = { total: 0, count: 0 };
        map[day].total += t.amount;
        map[day].count += 1;
      });

    const weekdays = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];

    const dayOrder = [1, 2, 3, 4, 5, 6, 0];

    return dayOrder.map((dayIndex) => ({
      category: weekdays[dayIndex === 0 ? 6 : dayIndex - 1],
      Average:
        map[dayIndex]?.count ? (transformNumberToPositive(map[dayIndex].total) / map[dayIndex].count).toFixed(2) : 0,
    } as unknown as EChartBarChartData));
  }
}

export const orderTransactionByRecentDate = (transactions: Transaction[]) => {
  return transactions.sort((a, b) => b.date.localeCompare(a.date));
}