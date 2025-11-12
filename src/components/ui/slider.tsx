import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  onValueChange?: (v: number) => void;
}

function Slider({ value = 0, min = 0, max = 100, onValueChange }: SliderProps) {
  const clamped = Math.max(min, Math.min(max, value));
  const pct = max === min ? 0 : ((clamped - min) / (max - min)) * 100;
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onValueChange?.(Math.max(min, clamped - 1))} style={styles.btn}><Text style={styles.btnText}>-</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => onValueChange?.(Math.min(max, clamped + 1))} style={styles.btn}><Text style={styles.btnText}>+</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  track: { height: 16, backgroundColor: "#E5E7EB", borderRadius: 999, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: "#3B82F6" },
  actions: { flexDirection: "row", columnGap: 8, marginTop: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: "#F3F4F6" },
  btnText: { color: "#374151", fontWeight: "600" },
});

export { Slider };
