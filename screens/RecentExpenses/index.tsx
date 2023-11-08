import { useContext, useEffect } from "react";
import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpensesContext } from "../../store/expense-context";
import { getDateMinusDays } from "../../utils/date";
import { Expense } from "../../components/ExpensesOutput/types";
import { fetchExpenses } from "../../utils/http";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses: Array<Expense> = expensesCtx.expenses.expenses.filter(
    (expense) => {
      const today = new Date();
      const date7Days = getDateMinusDays(today, 7);
      return expense.date > date7Days;
    }
  );

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
