import { useContext, useState, useEffect } from "react";
import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpensesContext } from "../../store/expense-context";
import { getDateMinusDays } from "../../utils/date";
import { Expense } from "../../components/ExpensesOutput/types";
import { fetchExpenses } from "../../utils/http";
import LoadingOverlay from "../../components/LoadingOverlay";
import ErrorOverlay from "../../components/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<null | string>();
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
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching)
    return <ErrorOverlay message={error} />;

  if (isFetching) return <LoadingOverlay />;

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
