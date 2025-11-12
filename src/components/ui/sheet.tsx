import { ReactNode } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Sheet({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (o: boolean) => void; children?: ReactNode }) {
  return (
    <Modal visible={!!open} transparent onRequestClose={() => onOpenChange?.(false)}> 
      <View style={styles.overlay}> 
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

function SheetTrigger({ onPress, children }: { onPress?: () => void; children?: ReactNode }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

function SheetClose({ onPress, children }: { onPress?: () => void; children?: ReactNode }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

function SheetContent({ children }: { children?: ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

function SheetHeader({ children }: { children?: ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

function SheetFooter({ children }: { children?: ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

function SheetTitle({ children }: { children?: ReactNode }) {
  return <Text style={styles.title}>{children as any}</Text>;
}

function SheetDescription({ children }: { children?: ReactNode }) {
  return <Text style={styles.description}>{children as any}</Text>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  content: { borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: "#FFFFFF", padding: 16 },
  header: { marginBottom: 8 },
  footer: { marginTop: 8 },
  title: { fontSize: 16, fontWeight: "600" },
  description: { fontSize: 12, color: "#6B7280" },
});

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
