import { ReactNode, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Accordion({ children }: { children?: ReactNode }) {
  return <View>{children}</View>;
}

function AccordionItem({ children }: { children?: ReactNode }) {
  return <View style={styles.item}>{children}</View>;
}

function AccordionTrigger({ title, onPress }: { title?: ReactNode; onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.trigger}> 
      <Text style={styles.triggerText}>{title as any}</Text>
    </TouchableOpacity>
  );
}

function AccordionContent({ children }: { children?: ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  item: { borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
  trigger: { paddingVertical: 16 },
  triggerText: { fontSize: 14, fontWeight: "600" },
  content: { paddingBottom: 16 },
});

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
