import { BigNumber } from '@ethersproject/bignumber';
import { toast } from 'react-toastify';

export const setMetamaskListeners = (
  updateHandler: (account: string) => void,
  closeHandler: () => void
) => {
  const handleAccountsChange = (accounts: string[]) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      toast.error('Please connect to MetaMask.');
      closeHandler();
    }
    const account = accounts[0];
    if (import.meta.env.NODE_ENV === 'development') {
      console.log(`Account changed to ${account}`);
    }
    updateHandler(account);
  };

  const handleChainChange = (chainIdBN: BigNumber) => {
    try {
      const chainId = BigNumber.from(chainIdBN).toNumber();

      if (import.meta.env.NODE_ENV === 'development') {
        console.log(`Chain ID changed to ${chainId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    if (import.meta.env.NODE_ENV === 'development') {
      console.log(`Disconnected`);
    }
    closeHandler();
  };

  const handleConnect = () => {
    if (import.meta.env.NODE_ENV === 'development') {
      console.log(`Connected`);
    }
    closeHandler();
  };

  const handleEvents = () => {
    try {
      if (window.ethereum.on) {
        window.ethereum.on('accountsChanged', handleAccountsChange);
        window.ethereum.on('chainChanged', handleChainChange);
        window.ethereum.on('disconnect', handleDisconnect);
        window.ethereum.on('connect', handleConnect);
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  };
  return {
    handleEvents,
  };
};
