import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Instruction from "../components/Instruction";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import GuessLog from "../components/GuessLogI";

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
  setCount,
  count,
}: {
  userNumber: number;
  setGameOver: (data: boolean) => void;
  setCount: (dtat: number) => void;
  count: number;
}) {
  const initialGuess = generateRandoNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number | undefined>(
    initialGuess
  );
  const [guessRound, setGuessRound] = useState<number[]>([initialGuess!]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) {
      setGameOver(true);
      setCount(guessRound.length);
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
    if (direction === "lower" && currentGuess) {
      maxBoundary = currentGuess;
    } else if (currentGuess) {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandoNumber(
      minBoundary,
      maxBoundary,
      currentGuess!
    );
    setCurrentGuess(newRandomNumber);
    setGuessRound((prev) => [newRandomNumber!, ...prev]);
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
              <Ionicons name="remove" size={16} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="add" size={16} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={{ flex: 1 }}>
        <FlatList
          data={guessRound}
          renderItem={({ item, index }) => (
            <GuessLog roundNumber={guessRound.length - index} guess={item} />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
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
