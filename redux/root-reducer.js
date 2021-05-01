import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletReducer from "./wallet/wallet.reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["wallet"],
};

const rootReducer = combineReducers({
  wallet: WalletReducer,
});

export default persistReducer(persistConfig, rootReducer);
