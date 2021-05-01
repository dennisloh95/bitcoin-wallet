import React from "react";
import Tabs from "./tabs";
import { Home } from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const index = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Home" component={() => Tabs(props)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
