import { TextInput, StyleSheet, TextInputProps } from "react-native";

function Textarea(props: TextInputProps) {
  return <TextInput {...props} style={[styles.textarea, props.style as any]} multiline numberOfLines={props.numberOfLines ?? 4} />;
}

const styles = StyleSheet.create({
  textarea: { minHeight: 64, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, textAlignVertical: "top" },
});

export { Textarea };
