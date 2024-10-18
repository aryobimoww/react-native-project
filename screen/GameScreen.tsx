import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Instruction from "../components/Instruction";
import Card from "../components/Card";

const generateRandoNumber = (min: number, max: number, exclude: number) => {
  const randomNumb = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumb === exclude) {
    generateRandoNumber(min, max, exclude);
  } else {
    return randomNumb;
  }
};
let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({
  userNumber,
  setGameOver,
}: {
  userNumber: number;
  setGameOver: (data: boolean) => void;
}) {
  const initialGuess = generateRandoNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      setGameOver(true);
    }
  }, [currentGuess]);

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === "lower" && currentGuess! < userNumber) ||
      (direction === "greater" && currentGuess! > userNumber)
    ) {
      Alert.alert("Don't lie...!!!", "You know that number", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess!;
    } else {
      minBoundary = currentGuess! + 1;
    }
    const newRandomNumber = generateRandoNumber(
      minBoundary,
      maxBoundary,
      currentGuess!
    );
    setCurrentGuess(newRandomNumber);
  };
  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Instruction style={{ marginBottom: 10 }}>
          Higher or lower ?
        </Instruction>
        <View style={styles.actionContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              -
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("greater")}>
              +
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  actionContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
