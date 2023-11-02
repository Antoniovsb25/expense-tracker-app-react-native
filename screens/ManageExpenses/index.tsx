import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import IconButton from "../../components/IconButton";
import { GlobalStyles } from "../../styles";
import Button from "../../components/Button";
import { ExpensesContext } from "../../store/expense-context";

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

  const deleteExpenseHandler = () => {
    if (expenseId) expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing)
      expensesCtx.updateExpense(expenseId, {
        id: expenseId,
        description: "Test Update Expense",
        amount: 25.99,
        date: new Date("2023-11-01"),
      });
    if (!isEditing)
      expensesCtx.addExpense({
        description: "Test Adding Expense",
        amount: 25.99,
        date: new Date("2023-11-01"),
      });
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
