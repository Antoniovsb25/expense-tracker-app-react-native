export interface Expense {
  id?: string;
  description: string;
  amount: number;
  date: Date;
}

export interface PropsExpensesOutput {
  expenses: Expense[];
  expensesPeriod: string;
  fallbackText?: string;
}
