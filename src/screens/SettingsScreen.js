import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonDrawer from "../components/ButtonDrawer";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      <ButtonDrawer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22 },
});
