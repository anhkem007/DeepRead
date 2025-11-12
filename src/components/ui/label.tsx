import { Text, StyleSheet } from "react-native";

function Label({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <Text style={[styles.label, style]}>{children as any}</Text>;
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: "600" },
});

export { Label };
