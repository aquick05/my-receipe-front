import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonDrawer from "../components/ButtonDrawer";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";

export default function HomeScreen() {
  console.log(colors.text);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil</Text>
      <ButtonDrawer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, color: colors.text },
});
