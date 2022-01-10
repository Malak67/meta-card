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
  getBusinessCardByAddr: async () => {},
  getPublicSocialLinks: async () => {},
  isLoading: true,
  businessCard: null,
  publicBusinessCard: null,
  socialLinks: [],
  publicSocialLinks: [],
  contacts: [],
});

export const MetaCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [businessCard, setBusinessCard] = useState<IBusinessCard | null>(null);
  const [publicBusinessCard, setPublicBusinessCard] =
    useState<IBusinessCard | null>(null);
  const [socialLinks, setSocialLinks] = useState<ISocialLink[] | []>([]);
  const [publicSocialLinks, setPublicSocialLinks] = useState<
    ISocialLink[] | []
  >([]);
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
    getBusinessCardByAddr,
    getPublicSocialLinks,
  } = useMetacardContract(
    setIsLoading,
    setBusinessCard,
    setSocialLinks,
    setContacts,
    setPublicBusinessCard,
    setPublicSocialLinks,
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
    getBusinessCardByAddr,
    publicBusinessCard,
    publicSocialLinks,
    getPublicSocialLinks,
    isLoading,
  };

  useEffect(() => {
    if (account) {
      checkWalletConnection();
      checkChainId();
      getProvider();
      handleEvents();
      getBusinessCard();
      getSocialLinks();
      getContacts();
    }
  }, [account]);

  return (
    <MetaCardContext.Provider value={context}>
      {children}
    </MetaCardContext.Provider>
  );
};
