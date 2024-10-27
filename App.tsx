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
import { useCallback, useEffect, useState } from "react";
import GameScreen from "./screen/GameScreen";
import Colors from "./constant/Colors";
import GameOverScreen from "./screen/GameOverScreen";
import { loadAsync, useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import Entypo from "@expo/vector-icons/Entypo";

export default function App() {
  const [userNumber, setUserNumber] = useState<number | undefined>();
  const [gameOver, setGameOver] = useState(true);
  const [count, setCount] = useState(1);
  const [appIsReady, setAppIsReady] = useState(false);
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

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const handleCount = (data: number) => {
    setCount(data);
  };

  const handleRestart = () => {
    setUserNumber(undefined);
    setGameOver(false);
    setCount(1);
  };

  let screen = (
    <StartGameScreen
      onPickedNumber={pickedNumber}
      onlayoutRootView={onLayoutRootView}
    />
  );

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
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        style={styles.rootContainer}
        source={require("./assets/background.png")}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootContainer} onLayout={onLayoutRootView}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: { flex: 1 },
  backgroundImage: { opacity: 0.15 },
});
