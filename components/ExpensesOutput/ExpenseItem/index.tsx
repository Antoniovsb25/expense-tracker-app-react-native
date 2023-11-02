import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GlobalStyles } from "../../../styles";
import { getFormattedDate } from "../../../utils/date";

interface PropsExpenseItem {
  id?: string;
  description?: string;
  amount?: number;
  date: Date;
}

type RootStackParamList = {
  ManageExpenses: { expenseId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ManageExpenses">;

const ExpenseItem = ({ id, description, amount, date }: PropsExpenseItem) => {
  const navigation = useNavigation<NavigationProp>();
  const expensePressHandler = () => {
    if (id) navigation.navigate("ManageExpenses", { expenseId: id });
  };
  return (
    <TouchableOpacity onPress={expensePressHandler}>
      <View style={styles.expensesItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            ${amount?.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expensesItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 100,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
