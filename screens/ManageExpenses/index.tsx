import { useContext, useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import IconButton from "../../components/IconButton";
import { GlobalStyles } from "../../styles";
import { ExpensesContext } from "../../store/expense-context";
import ExpenseForm from "../../components/ExpenseForm";
import { Expense } from "../../components/ExpensesOutput/types";
import { storeExpense, updateExpense, deleteExpense } from "../../utils/http";
import LoadingOverlay from "../../components/LoadingOverlay";
import ErrorOverlay from "../../components/ErrorOverlay";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<null | string>();
  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;
  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.expenses.find(
    (expense) => expense.id === expenseId
  );

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    if (expenseId) {
      try {
        expensesCtx.deleteExpense(expenseId);
        await deleteExpense(expenseId);
        navigation.goBack();
      } catch (error) {
        setError("Could not delete expenses");
        setIsSubmitting(false);
      }
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: Expense) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      }

      if (!isEditing) {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data");
      setIsSubmitting(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  if (error && !isSubmitting)
    return <ErrorOverlay message={error} />;

  if (isSubmitting) return <LoadingOverlay />;

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
