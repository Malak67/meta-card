import React, { createContext, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useMetamaskAdapter } from "./useMetamaskAdapter";
import { IBusinessCard, IMetaCardContext, ISocialLink } from "./types";
import { useMetamaskEvents } from "./useMetamaskEvents";
import { useMetacardContract } from "./useMetacardContract";

export const MetaCardContext = createContext<IMetaCardContext>({
  isConnectedToRightNetwork: false,
  provider: null,
  createBusinessCard: async ({}) => {},
  updateBusinessCard: async ({}) => {},
  addSocialLink: async ({}) => {},
  getSocialLinks: async () => {},
  removeSocialLink: async () => {},
  updateSocialLink: async () => {},
  getContacts: async () => {},
  addContact: async () => {},
  removeContact: async () => {},
  isLoading: true,
  businessCard: null,
  socialLinks: [],
  contacts: [],
});

export const MetaCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [businessCard, setBusinessCard] = useState<IBusinessCard | null>(null);
  const [socialLinks, setSocialLinks] = useState<ISocialLink[] | []>([]);
  const [contacts, setContacts] = useState<string[] | []>([]);

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
  const {
    getBusinessCard,
    createBusinessCard,
    updateBusinessCard,
    addSocialLink,
    getSocialLinks,
    removeSocialLink,
    updateSocialLink,
    getContacts,
    addContact,
    removeContact,
  } = useMetacardContract(
    setIsLoading,
    setBusinessCard,
    setSocialLinks,
    setContacts,
    account
  );

  const context: IMetaCardContext = {
    isConnectedToRightNetwork,
    provider,
    account,
    web3: provider ? new Web3Provider(provider) : undefined,
    getAccount,
    connectWallet,
    businessCard,
    socialLinks,
    contacts,
    createBusinessCard,
    updateBusinessCard,
    addSocialLink,
    getSocialLinks,
    removeSocialLink,
    updateSocialLink,
    getContacts,
    addContact,
    removeContact,
    isLoading,
  };

  useEffect(() => {
    checkWalletConnection();
    checkChainId();
    getProvider();
    handleEvents();
    getBusinessCard();
    getSocialLinks();
    getContacts();
  }, []);

  return (
    <MetaCardContext.Provider value={context}>
      {children}
    </MetaCardContext.Provider>
  );
};
