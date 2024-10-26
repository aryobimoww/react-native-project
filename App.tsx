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
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState<number | undefined>();
  const [gameOver, setGameOver] = useState(true);
  const [count, setCount] = useState(0);
  const pickedNumber = (number: number) => {
    setUserNumber(number);
    setGameOver(false);
  };
  const [fontLoaded] = useFonts({
    "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "shadow-light": require("./assets/fonts/ShadowsIntoLight-Regular.ttf"),
    "exo-regular": require("./assets/fonts/Exo/static/Exo-Regular.ttf"),
    "exo-bold": require("./assets/fonts/Exo/static/Exo-Bold.ttf"),
  });

  // if (!fontLoaded) {
  //   return <AppLoading />;
  // }

  const handleCount = (data: number) => {
    setCount(data);
  };

  const handleRestart = () => {
    setUserNumber(undefined);
    setGameOver(false);
    setCount(0);
  };

  let screen = <StartGameScreen onPickedNumber={pickedNumber} />;

  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        setGameOver={setGameOver}
        setCount={handleCount}
        count={count}
      />
    );
  }
  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        handleRestart={handleRestart}
        count={count}
        userNumber={userNumber}
      />
    );
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
