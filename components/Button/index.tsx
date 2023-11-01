import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../styles";
import { ReactNode } from "react";

interface PropsButton {
  children?: ReactNode;
  onPress: () => void;
  mode?: string;
  style?: Record<any, any>;
}

const Button = ({ children, onPress, mode, style }: PropsButton) => {
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
});
