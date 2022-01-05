import { useState } from "react";
import { toast } from "react-toastify";
import { BigNumber } from "@ethersproject/bignumber";
import { MetamaskAdapterValues } from "./types";
import {
  getLocalStorageAccount,
  removeLocalStorageAccount,
  setLocalStorageAccount,
} from "./localstorage";

export const useMetamaskAdapter = (): MetamaskAdapterValues => {
  const [currentAccount, setCurrentAccount] = useState(
    getLocalStorageAccount() || ""
  );
  const [provider, setProvider] = useState("");
  const [isConnectedToRightNetwork, setIsConnectedToRightNetwork] =
    useState(false);

  const supportedNetworkId =
    Number(import.meta.env.VITE_ROPSTEN_NETWORK_ID) || 3;

  const setAccount = (account: string) => {
    setCurrentAccount(account);
    setLocalStorageAccount(account);
  };

  const resetState = () => {
    removeLocalStorageAccount();
    setProvider("");
    setIsConnectedToRightNetwork(false);
    window.location.reload();
  };

  const getAccount = async (): Promise<string> => {
    let account: string = "";

    try {
      if (!window.ethereum)
        toast.error("No Ethereum Provider found on window.ethereum");

      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      account = accounts[0];

      setAccount(account);
    } catch (error) {
      console.error(error);
    }

    return account;
  };

  const getProvider = () => {
    setProvider(window.ethereum);
  };

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) toast.error("Please install MetaMask.");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        setAccount("");
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      toast.error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) toast.error("Please install MetaMask.");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      toast.error("No ethereum object");
      throw new Error("No ethereum object");
    }
  };

  const checkChainId = async (): Promise<void> => {
    try {
      if (!window.ethereum)
        toast.error("No Ethereum Provider found on window.ethereum");

      const receivedChainId = await window.ethereum
        .request({ method: "eth_chainId" })
        .then((chainIdBN: unknown) => BigNumber.from(chainIdBN).toNumber());
      const isConnectedChainId =
        supportedNetworkId?.toString() === receivedChainId.toString();
      if (!isConnectedChainId)
        toast.error("You are not connected to Ropsten network");
      setIsConnectedToRightNetwork(isConnectedChainId);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAccount,
    setAccount,
    resetState,
    getProvider,
    checkWalletConnection,
    connectWallet,
    checkChainId,
    isConnectedToRightNetwork,
    provider,
    account: currentAccount,
  };
};
