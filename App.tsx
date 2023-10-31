import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./AppNavigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigation />
    </>
  );
}
