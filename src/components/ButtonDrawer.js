import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ButtonDrawer() {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.fab}
      onPress={() => navigation.toggleDrawer()}
      hitSlop={10}
    >
      <Text style={styles.icon}>☰</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 18,
    bottom: 22,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6, // Android
    shadowOpacity: 0.2, // iOS
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  icon: {
    color: "#fff",
    fontSize: 22,
  },
});
