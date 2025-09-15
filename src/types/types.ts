export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string; // formato YYYY-MM-DD
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
}

export interface KpiCardsData {
  name: string,
  amount: number,
  variance: number,
  variancePercentage: number
}

export interface SimpleBarChartData {
  name: string,
  incomes: number,
  expenses: number,
  amt: number,
}

export interface PieChartData {
  name: string,
  value: number,
  color: string
}

export interface EChartPieChartData {
  name: string;
  value: number;
  itemStyle: {
    color: string;
  };
}

export type EChartBarChartData = {
  category: string;  // La clave 'category' es de tipo string y es fija
} & {
  [key in Exclude<string, 'category'>]: number;  // Las claves dinámicas son de tipo 'number' pero no afectan a 'category'
};

export type AlertType = 'success' | 'error' | 'info';

export type TransactionType = 'expense' | 'income';

