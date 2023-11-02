import { StyleSheet, View, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../styles";
import { PropsExpensesOutput } from "./types";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }: PropsExpensesOutput) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      {expenses.length > 0 ? <ExpensesList expenses={expenses} /> : <Text style={styles.infoText}>{fallbackText}</Text> }
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
});
