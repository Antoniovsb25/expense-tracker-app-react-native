import { Text, TextInput, View } from "react-native";

interface PropsInput {
  label?: string;
  textInputConfig?: Record<any, any>;
}

const Input = ({ label, textInputConfig }: PropsInput) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
};

export default Input;
