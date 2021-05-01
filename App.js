import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Button, View } from "react-native";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import BottomSheet from "reanimated-bottom-sheet";
import { Transaction } from "./screens";
export default function App() {
  const client = new QueryClient();
  const bottomSheetRef = useRef();

  const callTransactionScreen = () => {
    bottomSheetRef.current.snapTo(0);
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={client}>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Navigation callTransactionScreen={callTransactionScreen} />
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={[450, 300, 0]}
              borderRadius={10}
              renderContent={Transaction}
            />
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
