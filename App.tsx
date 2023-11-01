import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./AppNavigation";
import ExpensesContextProvider from "./store/expense-context";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <AppNavigation />
      </ExpensesContextProvider>
    </>
  );
}
