import { useContext } from "react";
import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpensesContext } from "../../store/expense-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)
  return <ExpensesOutput expenses={expensesCtx.expenses.expenses} expensesPeriod="Total" fallbackText="No expenses registered" />
};

export default AllExpenses;
