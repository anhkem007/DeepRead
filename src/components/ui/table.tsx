import { View, Text, StyleSheet } from "react-native";

function Table({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={style}>{children}</View>; }
function TableHeader({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={style}>{children}</View>; }
function TableBody({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={style}>{children}</View>; }
function TableFooter({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={style}>{children}</View>; }
function TableRow({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={[styles.row, style]}>{children}</View>; }
function TableHead({ children, style }: { children?: React.ReactNode; style?: any }) { return <Text style={[styles.head, style]}>{children as any}</Text>; }
function TableCell({ children, style }: { children?: React.ReactNode; style?: any }) { return <Text style={[styles.cell, style]}>{children as any}</Text>; }
function TableCaption({ children, style }: { children?: React.ReactNode; style?: any }) { return <Text style={[styles.caption, style]}>{children as any}</Text>; }

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  head: { fontWeight: "700" },
  cell: { },
  caption: { color: "#6B7280", fontSize: 12, marginTop: 8 },
});

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
