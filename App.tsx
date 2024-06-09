import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/navigations/BottomTabNavigation";
import { StatusBar } from "react-native";

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar />
    </NavigationContainer>
  );
}
