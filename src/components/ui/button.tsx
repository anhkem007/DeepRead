import { ReactNode } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onPress?: () => void;
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

function Button({ variant = "default", size = "default", disabled, onPress, children, style }: ButtonProps) {
  const stylesArray = [styles.base, styles[variant], styles[size], style as any].filter(Boolean);
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={stylesArray}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  default: { backgroundColor: "#3B82F6" },
  destructive: { backgroundColor: "#EF4444" },
  outline: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5E7EB" },
  secondary: { backgroundColor: "#F3F4F6" },
  ghost: { backgroundColor: "transparent" },
  link: { backgroundColor: "transparent" },
  sm: { paddingVertical: 8, paddingHorizontal: 12 },
  lg: { paddingVertical: 14, paddingHorizontal: 20 },
  icon: { width: 36, height: 36, paddingVertical: 0, paddingHorizontal: 0 },
});

const buttonVariants = styles;

export { Button, buttonVariants };
