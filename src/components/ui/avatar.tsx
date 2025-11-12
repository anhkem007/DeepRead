import { Image, View, Text, StyleSheet, ImageProps } from "react-native";

function Avatar({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <View style={[styles.root, style]}>{children}</View>;
}

function AvatarImage({ source, style }: { source: ImageProps["source"]; style?: any }) {
  return <Image source={source as any} style={[styles.image, style]} />;
}

function AvatarFallback({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <View style={[styles.fallback, style]}><Text>{children as any}</Text></View>;
}

const styles = StyleSheet.create({
  root: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  image: { width: "100%", height: "100%" },
  fallback: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#E5E7EB" },
});

export { Avatar, AvatarImage, AvatarFallback };
