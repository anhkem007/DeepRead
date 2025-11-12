import { View, Text, StyleSheet } from "react-native";

function Alert({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <View style={[styles.alert, style]}>{children}</View>;
}

function AlertTitle({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <Text style={[styles.title, style]}>{children as any}</Text>;
}

function AlertDescription({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <Text style={[styles.description, style]}>{children as any}</Text>;
}

const styles = StyleSheet.create({
  alert: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, padding: 12 },
  title: { color: "#111827", fontSize: 14, fontWeight: "600" },
  description: { color: "#6B7280", fontSize: 12 },
});

export { Alert, AlertTitle, AlertDescription };
