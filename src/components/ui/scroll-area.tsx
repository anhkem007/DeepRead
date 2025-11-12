import { ScrollView, View, StyleSheet } from "react-native";

function ScrollArea({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <ScrollView contentContainerStyle={style}>{children}</ScrollView>;
}

function ScrollBar({ style }: { style?: any }) {
  return <View style={[styles.bar, style]} />;
}

const styles = StyleSheet.create({
  bar: { height: 10, width: "100%", borderRadius: 999, backgroundColor: "#E5E7EB" },
});

export { ScrollArea, ScrollBar };
