import { View } from "react-native";

function Separator({ orientation = "horizontal", style }: { orientation?: "horizontal" | "vertical"; style?: any }) {
  return <View style={[orientation === "horizontal" ? { height: 1, width: "100%" } : { width: 1, height: "100%" }, { backgroundColor: "#E5E7EB" }, style]} />;
}

export { Separator };
