import { Image, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import Colors from "../constant/Colors";
import PrimaryButton from "../components/PrimaryButton";

interface GameOverScreenProps {
  handleRestart: () => void;
  count: number;
  userNumber: number;
}

export default function GameOverScreen({
  handleRestart,
  count,
  userNumber,
}: GameOverScreenProps) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={styles.image_container}>
        <Image style={styles.image} source={require("../assets/success.png")} />
      </View>
      <Text style={styles.summary_text}>
        Your phone needed <Text style={styles.hightlight_text}>{count}</Text>{" "}
        round to guess the number{" "}
        <Text style={styles.hightlight_text}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={handleRestart}>Start new game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  image_container: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.acsent500,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  summary_text: {
    fontFamily: "exo-regular",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
  },
  hightlight_text: {
    fontFamily: "exo-bold",
    color: Colors.ptimary500,
  },
});
