import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

export default function Instruction({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[styles.instruction, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instruction: {
    color: "white",
    fontSize: 24,
  },
});
