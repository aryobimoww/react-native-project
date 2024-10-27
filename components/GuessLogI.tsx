import { StyleSheet, Text, View } from "react-native";
import Colors from "../constant/Colors";

interface GuessLogProps {
  roundNumber: number;
  guess: number;
}
export default function GuessLog({ roundNumber, guess }: GuessLogProps) {
  return (
    <View style={styles.logContainer}>
      <Text style={styles.logText}>#{roundNumber}</Text>
      <Text style={styles.logText}>Opponent's Guess: {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logContainer: {
    borderColor: Colors.acsent500,
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: 8,
    padding: 12,
    backgroundColor: Colors.primary400,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
  },
  logText: {
    color: "white",
    fontFamily: "exo-regular",
  },
});
