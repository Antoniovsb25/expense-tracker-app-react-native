import { FlatList } from "react-native";
import ExpenseItem from "../ExpenseItem";
import { Expense } from "../types";

interface PropsExpensesList {
  expenses: Expense[];
}

const renderExpenseItem = ({ item }: { item: Expense }) => {
  return <ExpenseItem {...item} />;
};

const ExpensesList = ({ expenses }: PropsExpensesList) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
