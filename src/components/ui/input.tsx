import { TextInput, StyleSheet, TextInputProps } from "react-native";

function Input(props: TextInputProps) {
  return <TextInput {...props} style={[styles.input, props.style as any]} />;
}

const styles = StyleSheet.create({
  input: { height: 40, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
});

export { Input };
