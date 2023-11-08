import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../styles";
import Button from "../Button";

interface ErrorOverlayProps {
  message: string;
}

const ErrorOverlay = ({ message }: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
