import React, { createContext, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils";
import { useMetamaskAdapter } from "./useMetamaskAdapter";
import { IBusinessCard, IMetaCardContext } from "./types";
import { useMetamaskEvents } from "./useMetamaskEvents";

export const MetaCardContext = createContext<IMetaCardContext>({
  isConnectedToRightNetwork: false,
  provider: null,
  createBusinessCard: async ({}) => {},
  isLoading: true,
});

export const MetaCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { ethereum } = window;
  const [isLoading, setIsLoading] = useState(true);
  const [businessCard, setBusinessCard] = useState<IBusinessCard | null>(null);

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

  const getBusinessCard = async () => {
    try {
      if (window.ethereum && account !== '' && account !== null && account !== undefined) {
        const metaCardContract = getEthereumContract();
        const businessCard = await metaCardContract.getBusinessCard();
        setIsLoading(true);
        if (businessCard && businessCard.owner.slice(0, 3) !== "0x0") {
          const card: IBusinessCard = {
            owner: businessCard.owner,
            fullName: businessCard.fullName,
            title: businessCard.title,
            email: businessCard.email,
            phoneNumber: businessCard.phoneNumber,
          }
          setBusinessCard(card);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const createBusinessCard = async (newBusinessCard: IBusinessCard) => {
    try {
      if (window.ethereum) {
        const { fullName, title, email, phoneNumber } = newBusinessCard;
        const metaCardContract = getEthereumContract();
        const createBusinessCardTx = await metaCardContract.createBusinessCard(
          fullName,
          title,
          email,
          phoneNumber
        );
        setIsLoading(true);
        await createBusinessCardTx.wait();
        setIsLoading(false);
        const businessCard = await metaCardContract.getBusinessCard();
        if (businessCard && businessCard.owner.slice(0, 3) !== "0x0") {
          const card: IBusinessCard = {
            owner: businessCard.owner,
            fullName: businessCard.fullName,
            title: businessCard.title,
            email: businessCard.email,
            phoneNumber: businessCard.phoneNumber,
          }
          setBusinessCard(card);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateBusinessCard = async (currentBusinessCard: IBusinessCard) => {
    try {
      if (window.ethereum) {
        const { fullName, title, email, phoneNumber } = currentBusinessCard;
        const metaCardContract = getEthereumContract();
        const updateBusinessCardTx = await metaCardContract.updateBusinessCard(
          fullName,
          title,
          email,
          phoneNumber
        );
        setIsLoading(true);
        await updateBusinessCardTx.wait();
        setIsLoading(false);
        const businessCard = await metaCardContract.getBusinessCard();
        if (businessCard && businessCard.owner.slice(0, 3) !== "0x0") {
          const card: IBusinessCard = {
            owner: businessCard.owner,
            fullName: businessCard.fullName,
            title: businessCard.title,
            email: businessCard.email,
            phoneNumber: businessCard.phoneNumber,
          }
          setBusinessCard(card);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

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
    businessCard,
    createBusinessCard,
    updateBusinessCard,
    isLoading,
  };

  useEffect(() => {
    checkWalletConnection();
    checkChainId();
    getProvider();
    handleEvents();
    getBusinessCard();
  }, []);

  return (
    <MetaCardContext.Provider value={context}>
      {children}
    </MetaCardContext.Provider>
  );
};
