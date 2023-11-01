import React, { createContext, useReducer, ReactNode } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

interface ExpensesState {
  expenses: Expense[];
}

interface AddExpenseAction {
  type: "ADD";
  payload: Expense;
}

interface UpdateExpenseAction {
  type: "UPDATE";
  payload: { id: string; data: Expense };
}

interface DeleteExpenseAction {
  type: "DELETE";
  payload: string;
}

type ExpensesAction =
  | AddExpenseAction
  | UpdateExpenseAction
  | DeleteExpenseAction;

interface ExpensesContextType {
  expenses: ExpensesState;
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, data: Expense) => void;
}

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-10-31"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  }
];

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: { expenses: [] },
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

function expensesReducer(state: Expense[], action: ExpensesAction): Expense[] {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

interface ExpensesContextProviderProps {
  children: ReactNode;
}

function ExpensesContextProvider({ children }: ExpensesContextProviderProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expense: Expense) => {
    dispatch({ type: "ADD", payload: expense });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id: string, data: Expense) => {
    dispatch({ type: "UPDATE", payload: { id, data } });
  };

  const value: ExpensesContextType = {
    expenses: { expenses: expensesState },
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
