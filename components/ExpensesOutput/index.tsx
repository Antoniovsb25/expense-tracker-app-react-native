import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../styles";

const DUMMY_EXPENSES = [
  {
    id: "1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "2",
    description: "Jacket",
    amount: 159.8,
    date: new Date("2022-01-05"),
  },
  {
    id: "3",
    description: "Skirt",
    amount: 15.2,
    date: new Date("2020-12-01"),
  },
  {
    id: "4",
    description: "Book",
    amount: 10.0,
    date: new Date("2022-02-19"),
  },
  {
    id: "5",
    description: "Book",
    amount: 17.16,
    date: new Date("2022-02-19"),
  },
];

const ExpensesOutput = ({ expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})
