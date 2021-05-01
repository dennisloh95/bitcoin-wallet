import { WalletActionTypes } from "./wallet.types";

const INITIAL_STATE = {
  wallet: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WalletActionTypes.ADD_AMOUNT:
    case WalletActionTypes.EDIT_AMOUNT:
    case WalletActionTypes.DELETE_AMOUNT:
      return {
        ...state,
        wallet: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
