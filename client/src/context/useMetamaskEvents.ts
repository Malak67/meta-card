import { BigNumber } from "@ethersproject/bignumber";
import { toast } from "react-toastify";

export const useMetamaskEvents = (
  updateHandler: (account: string) => void,
  closeHandler: () => void
) => {
  const handleAccountsChange = (accounts: string[]) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    }
    const account = accounts[0];
    window.location.reload();
    if (import.meta.env.NODE_ENV === "development") {
      console.log(`Account changed to ${account}`);
    }
    updateHandler(account);
  };

  const handleChainChange = (chainIdBN: BigNumber) => {
    try {
      const chainId = BigNumber.from(chainIdBN).toNumber();

      if (import.meta.env.NODE_ENV === "development") {
        console.log(`Chain ID changed to ${chainId}`);
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    if (import.meta.env.NODE_ENV === "development") {
      console.log(`Disconnected`);
    }
    closeHandler();
  };

  const handleConnect = () => {
    if (import.meta.env.NODE_ENV === "development") {
      console.log(`Connected`);
      // window.location.reload();
    }
  };

  const handleEvents = () => {
    try {
      if (!window.ethereum)
        toast.error("No Ethereum Provider found on window.ethereum");
      if (window.ethereum.on) {
        window.ethereum.on("accountsChanged", handleAccountsChange);
        window.ethereum.on("chainChanged", handleChainChange);
        window.ethereum.on("disconnect", handleDisconnect);
        window.ethereum.on("connect", handleConnect);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return {
    handleEvents,
  };
};
