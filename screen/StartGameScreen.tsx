import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import Colors from "../constant/Colors";
import Title from "../components/Title";
import Card from "../components/Card";
import Instruction from "../components/Instruction";

interface StartGameScreenProps {
  onPickedNumber: (data: number) => void;
  onlayoutRootView: () => Promise<void>;
}
export default function StartGameScreen({
  onPickedNumber,
  onlayoutRootView,
}: StartGameScreenProps) {
  const [enterNumber, setEnterNumber] = useState("");

  const numberInputHandler = (input: string) => {
    setEnterNumber(input);
  };
  const confirmHandler = () => {
    const choosenNumber = parseInt(enterNumber);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert("Invalid Number", "Number must contain between 1 ee- 99", [
        { text: "oke", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }
    onPickedNumber(choosenNumber);
  };

  const resetHandler = () => {
    setEnterNumber("");
  };
  return (
    <View style={styles.rootContainer} onLayout={onlayoutRootView}>
      <Title>Guess my number</Title>
      <Card>
        <Instruction>Enter Number</Instruction>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          value={enterNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 36,
    borderBottomColor: Colors.acsent500,
    borderBottomWidth: 2,
    color: "white",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
