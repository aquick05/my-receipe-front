import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonDrawer from "../components/ButtonDrawer";
import { useResponsive } from "../responsive/useResponsive";
import { getTypography } from "../theme/typography";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";
import Screen from "../components/Screen";
//import Grid from "../Grid";
//import { Row, Column } from "../RowColumn";
export default function HomeScreen() {
  console.log(colors.text);
  return (
    <Screen scroll keyboard>
      <View style={styles.container}>
        <Text style={styles.title}>Accueil</Text>
        <ButtonDrawer />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, color: colors.text },
});
