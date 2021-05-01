import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Navigation />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
