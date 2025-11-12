import { ReactNode } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Dialog({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (o: boolean) => void; children?: ReactNode }) {
  return (
    <Modal visible={!!open} transparent onRequestClose={() => onOpenChange?.(false)}> 
      <View style={styles.overlay}> 
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

function DialogTrigger({ onPress, children }: { onPress?: () => void; children?: ReactNode }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

function DialogPortal({ children }: { children?: ReactNode }) {
  return <View>{children}</View>;
}

function DialogClose({ onPress, children }: { onPress?: () => void; children?: ReactNode }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

function DialogOverlay({ children }: { children?: ReactNode }) {
  return <View style={styles.overlay}>{children}</View>;
}

function DialogContent({ children }: { children?: ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

function DialogHeader({ children }: { children?: ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

function DialogFooter({ children }: { children?: ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

function DialogTitle({ children }: { children?: ReactNode }) {
  return <Text style={styles.title}>{children as any}</Text>;
}

function DialogDescription({ children }: { children?: ReactNode }) {
  return <Text style={styles.description}>{children as any}</Text>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  content: { width: "90%", maxWidth: 480, borderRadius: 12, backgroundColor: "#FFFFFF", padding: 16 },
  header: { marginBottom: 8 },
  footer: { marginTop: 8 },
  title: { fontSize: 16, fontWeight: "600" },
  description: { fontSize: 12, color: "#6B7280" },
});

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
