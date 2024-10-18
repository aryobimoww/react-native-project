import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import StartGameScreen from "./screen/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screen/GameScreen";
import Colors from "./constant/Colors";
import GameOverScreen from "./screen/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState<number | undefined>();
  const [gameOver, setGameOver] = useState(true);
  const pickedNumber = (number: number) => {
    setUserNumber(number);
    setGameOver(false);
  };

  let screen = <StartGameScreen onPickedNumber={pickedNumber} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} setGameOver={setGameOver} />;
  }
  if (gameOver && userNumber) {
    screen = <GameOverScreen />;
  }
  return (
    <LinearGradient
      colors={[Colors.primary600, Colors.secondary500]}
      locations={[0.4, 0.7]}
      style={styles.rootContainer}
    >
      <ImageBackground
        style={styles.rootContainer}
        source={require("./assets/background.png")}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: { flex: 1 },
  backgroundImage: { opacity: 0.15 },
});
