import { View, StyleSheet } from "react-native";

function Progress({ value = 0, max = 100, style }: { value?: number; max?: number; style?: any }) {
  const pct = max === 0 ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <View style={[styles.track, style]}> 
      <View style={[styles.fill, { width: `${pct}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, backgroundColor: "#E5E7EB", borderRadius: 999, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: "#3B82F6" },
});

export { Progress };
