import { View, TouchableOpacity, StyleSheet } from "react-native";

function RadioGroup({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.group, style]}>{children}</View>; }
function RadioGroupItem({ selected, onPress }: { selected?: boolean; onPress?: () => void }) { return <TouchableOpacity onPress={onPress} style={[styles.item, { borderColor: selected ? "#3B82F6" : "#E5E7EB" }]}>{selected ? <View style={styles.dot} /> : null}</TouchableOpacity>; }

const styles = StyleSheet.create({
  group: { rowGap: 8 },
  item: { width: 16, height: 16, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
});

export { RadioGroup, RadioGroupItem };
