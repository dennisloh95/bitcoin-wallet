import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigation />
      {/* https://api.coindesk.com/v1/bpi/historical/close.json
      https://api.coindesk.com/v1/bpi/currentprice.json */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
