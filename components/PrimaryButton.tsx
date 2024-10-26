import { ReactNode } from "react";
import { Pressable, Text, View, StyleSheet, StyleProp } from "react-native";
import Colors from "../constant/Colors";

interface PrimaryButtonProps {
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<any>;
}
export default function PrimaryButton({
  children,
  onPress,
  style,
}: PrimaryButtonProps) {
  const pressTest = () => {
    console.log("press");
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.innerContainer, style]}
        onPress={onPress}
        android_ripple={{ color: Colors.ptimary500 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  innerContainer: {
    backgroundColor: Colors.primary600,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "exo-regular",
  },
});
