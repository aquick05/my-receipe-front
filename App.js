import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import AuthScreen from "./src/screens/AuthScreen";
import { colors } from "./src/theme/colors";
const Drawer = createDrawerNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.card,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};
export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Drawer.Navigator
        initialRouteName="Accueil"
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerStyle: {
            width: "50%",
          },
        }}
      >
        <Drawer.Screen name="Accueil" component={HomeScreen} />
        <Drawer.Screen name="connexion/inscription" component={AuthScreen} />

        <Drawer.Screen name="Profil" component={ProfileScreen} />
        <Drawer.Screen name="Paramètres" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
