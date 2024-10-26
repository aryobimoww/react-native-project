import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../constant/Colors";

export default function Title({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontFamily: "exo-bold",
    fontSize: 24,
    borderWidth: 2,
    borderColor: "white",
    textAlign: "center",
    padding: 12,
  },
});
