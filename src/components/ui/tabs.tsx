import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Tabs({ children }: { children?: React.ReactNode }) { return <View>{children}</View>; }
function TabsList({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.list, style]}>{children}</View>; }
function TabsTrigger({ title, onPress, active }: { title?: React.ReactNode; onPress?: () => void; active?: boolean }) { return <TouchableOpacity onPress={onPress} style={[styles.trigger, active ? styles.triggerActive : null]}><Text style={active ? styles.triggerTextActive : styles.triggerText}>{title as any}</Text></TouchableOpacity>; }
function TabsContent({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.content, style]}>{children}</View>; }

const styles = StyleSheet.create({
  list: { flexDirection: "row", columnGap: 8 },
  trigger: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: "#F3F4F6" },
  triggerActive: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5E7EB" },
  triggerText: { color: "#6B7280" },
  triggerTextActive: { color: "#111827", fontWeight: "600" },
  content: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 12, marginTop: 8 },
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
