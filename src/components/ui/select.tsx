import { ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Select({ value, onValueChange, children }: { value?: string; onValueChange?: (v: string) => void; children?: ReactNode }) {
  return <View>{children}</View>;
}

function SelectGroup({ children }: { children?: ReactNode }) {
  return <View>{children}</View>;
}

function SelectValue({ placeholder, value }: { placeholder?: string; value?: string }) {
  return <Text style={styles.value}>{value ?? placeholder ?? ""}</Text>;
}

function SelectTrigger({ onPress, children }: { onPress?: () => void; children?: ReactNode }) {
  return <TouchableOpacity onPress={onPress} style={styles.trigger}>{children}</TouchableOpacity>;
}

function SelectContent({ children }: { children?: ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

function SelectLabel({ children }: { children?: ReactNode }) {
  return <Text style={styles.label}>{children as any}</Text>;
}

function SelectItem({ children, onPress }: { children?: ReactNode; onPress?: () => void }) {
  return <TouchableOpacity onPress={onPress} style={styles.item}><Text>{children as any}</Text></TouchableOpacity>;
}

function SelectSeparator() {
  return <View style={styles.separator} />;
}

function SelectScrollDownButton() { return <View />; }
function SelectScrollUpButton() { return <View />; }

const styles = StyleSheet.create({
  trigger: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12 },
  content: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 8 },
  value: { fontSize: 14 },
  label: { fontSize: 12, fontWeight: "600", marginBottom: 4 },
  item: { paddingVertical: 8, paddingHorizontal: 8 },
  separator: { height: 1, backgroundColor: "#E5E7EB" },
});

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue };
