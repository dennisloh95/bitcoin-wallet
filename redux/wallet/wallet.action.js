import { WalletActionTypes } from "./wallet.types";

export const updateAmount = (amount) => ({
  type: WalletActionTypes.UPDATE_AMOUNT,
  payload: amount,
});
