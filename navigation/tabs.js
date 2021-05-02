import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Home, Account } from "../screens";
import { COLORS, FONTS } from "../constants";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ title, name, focused }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <AntDesign
        name={name}
        size={30}
        color={focused ? COLORS.primary : COLORS.black}
      />
      <Text
        style={{
          color: focused ? COLORS.primary : COLORS.black,
          ...FONTS.body5,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const TabBarCustomButton = ({ children, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        top: -25,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={() => {
        navigation.navigate("TransactionBottomSheet");
      }}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        locations={[0.5, 0.8]}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
        }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title={"Home"} name={"home"} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={() => {}}
        options={{
          tabBarIcon: () => (
            <AntDesign name={"swap"} size={30} color={COLORS.white} />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title={"Account"} name={"wallet"} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,

    elevation: 5,
  },
});

export default Tabs;
