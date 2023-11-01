import { useLayoutEffect } from "react";
import { Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  ManageExpenses: { expenseId?: number };
};

type ManageExpensesProps = StackScreenProps<
  RootStackParamList,
  "ManageExpenses"
>;

const ManageExpenses = ({ route, navigation }: ManageExpensesProps) => {
  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text>Manage Expenses screen</Text>;
};

export default ManageExpenses;
