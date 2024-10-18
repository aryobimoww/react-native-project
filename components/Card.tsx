import { View, StyleSheet } from "react-native";
import Colors from "../constant/Colors";
import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary400,
    borderRadius: 8,
    elevation: 4,
  },
});
