import React, { createContext, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils";
import { useMetamaskAdapter } from "./useMetamaskAdapter";
import { IMetaCardContext } from "./types";
import { useMetamaskEvents } from "./useMetamaskEvents";

export const MetaCardContext = createContext<IMetaCardContext>({
  isConnectedToRightNetwork: false,
  provider: null,
});

export const MetaCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { ethereum } = window;

  const getEthereumContract = () => {
    const provider = new Web3Provider(ethereum);
    const signer = provider.getSigner();
    const metaCardContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return metaCardContract;
  };

  const {
    getAccount,
    setAccount,
    resetState,
    getProvider,
    checkWalletConnection,
    connectWallet,
    checkChainId,
    isConnectedToRightNetwork,
    provider,
    account,
  } = useMetamaskAdapter();

  const { handleEvents } = useMetamaskEvents(setAccount, resetState);

  const context: IMetaCardContext = {
    isConnectedToRightNetwork,
    provider,
    account,
    web3: provider ? new Web3Provider(provider) : undefined,
    getAccount,
    connectWallet,
    getEthereumContract,
  };

  useEffect(() => {
    checkWalletConnection();
    checkChainId();
    getProvider();
    handleEvents();
  }, []);

  return (
    <MetaCardContext.Provider value={context}>
      {children}
    </MetaCardContext.Provider>
  );
};
