import React, { createContext, useReducer, ReactNode } from "react";

interface Expense {
  id?: string;
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

interface SetExpenseAction {
  type: "SET";
  payload: Expense[];
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
  | SetExpenseAction
  | UpdateExpenseAction
  | DeleteExpenseAction;

interface ExpensesContextType {
  expenses: ExpensesState;
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, data: Expense) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: { expenses: [] },
  addExpense: () => {},
  setExpenses: (expenses) => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

function expensesReducer(state: Expense[], action: ExpensesAction): Expense[] {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "SET":
      const invertedExpenses = action.payload.reverse();
      return invertedExpenses;

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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expense: Expense) => {
    dispatch({ type: "ADD", payload: expense });
  };

  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: "SET", payload: expenses });
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
    setExpenses,
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
