import { TouchableOpacity, View, StyleSheet } from "react-native";

interface CheckboxProps {
  value?: boolean;
  onValueChange?: (v: boolean) => void;
}

function Checkbox({ value = false, onValueChange }: CheckboxProps) {
  return (
    <TouchableOpacity onPress={() => onValueChange?.(!value)} style={[styles.box, { borderColor: value ? "#3B82F6" : "#E5E7EB", backgroundColor: value ? "#DBEAFE" : "#FFFFFF" }]}> 
      {value ? <View style={styles.check} /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: { width: 16, height: 16, borderWidth: 1, borderRadius: 4, alignItems: "center", justifyContent: "center" },
  check: { width: 8, height: 8, backgroundColor: "#3B82F6" },
});

export { Checkbox };
