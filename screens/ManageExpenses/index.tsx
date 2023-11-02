import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import IconButton from "../../components/IconButton";
import { GlobalStyles } from "../../styles";
import { ExpensesContext } from "../../store/expense-context";
import ExpenseForm from "../../components/ExpenseForm";
import { Expense } from "../../components/ExpensesOutput/types";

type RootStackParamList = {
  ManageExpenses: { expenseId?: string };
};

type ManageExpensesProps = StackScreenProps<
  RootStackParamList,
  "ManageExpenses"
>;

const ManageExpenses: React.FC<ManageExpensesProps> = ({
  route,
  navigation,
}) => {
  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;
  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.expenses.find(
    (expense) => expense.id === expenseId
  );

  const deleteExpenseHandler = () => {
    if (expenseId) expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData: Expense) => {
    if (isEditing) expensesCtx.updateExpense(expenseId, expenseData);
    if (!isEditing) expensesCtx.addExpense(expenseData);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonlabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
