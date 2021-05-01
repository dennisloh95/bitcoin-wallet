import { WalletActionTypes } from "./wallet.types";

export const addAmount = (amount = {
  type: WalletActionTypes.ADD_AMOUNT,
  payload: amount,
});

export const editAmount = (amount = {
  type: WalletActionTypes.ADD_AMOUNT,
  payload: amount,
});

export const deleteAmount = (amount = {
  type: WalletActionTypes.DELETE_AMOUNT,
  payload: amount,
});
