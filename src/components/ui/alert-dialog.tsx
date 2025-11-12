import { ReactNode } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

function AlertDialog({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (o: boolean) => void; children?: ReactNode }) {
  return (
    <Modal visible={!!open} transparent onRequestClose={() => onOpenChange?.(false)}> 
      <View style={styles.overlay}> 
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

function AlertDialogTrigger({ onPress, children }: { onPress?: () => void; children?: ReactNode }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

function AlertDialogPortal({ children }: { children?: ReactNode }) {
  return <View>{children}</View>;
}

function AlertDialogOverlay({ children }: { children?: ReactNode }) {
  return <View style={styles.overlay}>{children}</View>;
}

function AlertDialogContent({ children }: { children?: ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

function AlertDialogHeader({ children }: { children?: ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

function AlertDialogFooter({ children }: { children?: ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

function AlertDialogTitle({ children }: { children?: ReactNode }) {
  return <Text style={styles.title}>{children as any}</Text>;
}

function AlertDialogDescription({ children }: { children?: ReactNode }) {
  return <Text style={styles.description}>{children as any}</Text>;
}

function AlertDialogAction({ onPress, children }: { onPress?: () => void; children?: ReactNode }) {
  return <TouchableOpacity onPress={onPress} style={styles.action}><Text style={styles.actionText}>{children as any}</Text></TouchableOpacity>;
}

function AlertDialogCancel({ onPress, children }: { onPress?: () => void; children?: ReactNode }) {
  return <TouchableOpacity onPress={onPress} style={styles.cancel}><Text style={styles.cancelText}>{children as any}</Text></TouchableOpacity>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  content: { width: "90%", maxWidth: 480, borderRadius: 12, backgroundColor: "#FFFFFF", padding: 16 },
  header: { marginBottom: 8 },
  footer: { marginTop: 8 },
  title: { fontSize: 16, fontWeight: "600" },
  description: { fontSize: 12, color: "#6B7280" },
  action: { backgroundColor: "#3B82F6", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, alignItems: "center" },
  actionText: { color: "#FFFFFF", fontWeight: "600" },
  cancel: { backgroundColor: "#F3F4F6", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, alignItems: "center" },
  cancelText: { color: "#374151", fontWeight: "600" },
});

export { AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel };
