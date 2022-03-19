import { CURRENT_ACCOUNT } from '../utils';
import { TSetAccount, TGetAccount, TRemoveAccount } from '../types';

export const setLocalStorageAccount: TSetAccount = (account) => {
  localStorage.setItem(CURRENT_ACCOUNT, account);
};

export const getLocalStorageAccount: TGetAccount = () => {
  return localStorage.getItem(CURRENT_ACCOUNT);
};

export const removeLocalStorageAccount: TRemoveAccount = () => {
  localStorage.removeItem(CURRENT_ACCOUNT);
};
