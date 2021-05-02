import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, View } from "react-native";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const client = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={client}>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Navigation />
          </View>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
