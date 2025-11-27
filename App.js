import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import Home from "./src/screens/Home";
import ProfileScreen from "./src/screens/ProfileScreen";
import PasswordResetScreen from "./src/screens/PasswordResetScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="login">
        <Screen name="login" component={LoginScreen} options={{ title: "" }} />
        <Screen name="signup" component={SignupScreen} />
        <Screen name="home" component={Home} />
        <Screen name="profile" component={ProfileScreen} />
        <Screen name="pwreset" component={PasswordResetScreen} />
      </Navigator>
    </NavigationContainer>
  );
}
