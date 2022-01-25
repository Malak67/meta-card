import { BigNumber } from "@ethersproject/bignumber";
import { toast } from "react-toastify";

export const setMetamaskListeners = (
  updateHandler: (account: string) => void,
  closeHandler: () => void
) => {
  const handleAccountsChange = (accounts: string[]) => {
    console.log('Event 1 handleAccountsChange');
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      toast.error("Please connect to MetaMask.");
      closeHandler();
    }
    const account = accounts[0];
    if (import.meta.env.NODE_ENV === "development") {
      console.log(`Account changed to ${account}`);
    }
    updateHandler(account);
  };

  const handleChainChange = (chainIdBN: BigNumber) => {
    console.log('Event 2 handleChainChange');

    try {
      const chainId = BigNumber.from(chainIdBN).toNumber();

      if (import.meta.env.NODE_ENV === "development") {
        console.log(`Chain ID changed to ${chainId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    console.log('Event 3 handleDisconnect');
    if (import.meta.env.NODE_ENV === "development") {
      console.log(`Disconnected`);
    }
    closeHandler();
  };

  const handleConnect = () => {
    console.log('Event 4 handleConnect');

    if (import.meta.env.NODE_ENV === "development") {
      console.log(`Connected`);
    }
    closeHandler();
  };

  const handleEvents = () => {
    try {
      if (window.ethereum.on) {
        console.log('Handle events')
        window.ethereum.on("accountsChanged", handleAccountsChange);
        window.ethereum.on("chainChanged", handleChainChange);
        window.ethereum.on("disconnect", handleDisconnect);
        window.ethereum.on("connect", handleConnect);
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  };
  return {
    handleEvents,
  };
};
