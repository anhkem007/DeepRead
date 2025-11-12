import { View, Text, StyleSheet } from "react-native";

function Badge({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <View style={[styles.badge, style]}><Text style={styles.text}>{children as any}</Text></View>;
}

const styles = StyleSheet.create({
  badge: { backgroundColor: "#3B82F6", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, alignSelf: "flex-start" },
  text: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
});

const badgeVariants = styles;

export { Badge, badgeVariants };
