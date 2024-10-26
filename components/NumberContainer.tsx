import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constant/Colors";

export default function NumberContainer({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.acsent500,
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.acsent500,
    fontSize: 36,
    fontFamily: "exo-bold",
  },
});
