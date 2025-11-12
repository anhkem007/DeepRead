import { TouchableOpacity, View, StyleSheet } from "react-native";

interface SwitchProps {
  value?: boolean;
  onValueChange?: (v: boolean) => void;
}

function Switch({ value = false, onValueChange }: SwitchProps) {
  return (
    <TouchableOpacity onPress={() => onValueChange?.(!value)} style={[styles.container, { backgroundColor: value ? "#3B82F6" : "#E5E7EB" }]}> 
      <View style={[styles.knob, { left: value ? 18 : 2 }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: 36, height: 20, borderRadius: 10, position: "relative" },
  knob: { position: "absolute", top: 2, width: 16, height: 16, borderRadius: 8, backgroundColor: "#FFFFFF" },
});

export { Switch };
