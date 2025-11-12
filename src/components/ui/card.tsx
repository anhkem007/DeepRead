import { View, Text, StyleSheet } from "react-native";

function Card({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.card, style]}>{children}</View>; }
function CardHeader({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.header, style]}>{children}</View>; }
function CardTitle({ children, style }: { children?: React.ReactNode; style?: any }) { return <Text style={[styles.title, style]}>{children as any}</Text>; }
function CardDescription({ children, style }: { children?: React.ReactNode; style?: any }) { return <Text style={[styles.description, style]}>{children as any}</Text>; }
function CardAction({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.action, style]}>{children}</View>; }
function CardContent({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.content, style]}>{children}</View>; }
function CardFooter({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.footer, style]}>{children}</View>; }

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFFFFF", borderRadius: 16, borderWidth: 1, borderColor: "#E5E7EB" },
  header: { paddingHorizontal: 16, paddingTop: 16 },
  title: { fontWeight: "600", color: "#111827" },
  description: { color: "#6B7280", fontSize: 12 },
  action: { alignSelf: "flex-end" },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
  footer: { paddingHorizontal: 16, paddingBottom: 16, flexDirection: "row", columnGap: 8, alignItems: "center" },
});

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
