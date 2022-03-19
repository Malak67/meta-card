import React, { createContext, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useMetamaskAdapter } from '../hooks/useMetamaskAdapter';
import { IMetaCardContext } from '../types';
import { setMetamaskListeners } from './setMetamaskListeners';

export const MetaCardContext = createContext<IMetaCardContext>({
  isConnectedToRightNetwork: false,
  provider: null,
});

export const MetaCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const { handleEvents } = setMetamaskListeners(setAccount, resetState);

  const context: IMetaCardContext = {
    isConnectedToRightNetwork,
    provider,
    account,
    web3: provider ? new Web3Provider(provider) : undefined,
    getAccount,
    connectWallet,
  };

  useEffect(() => {
    if (account !== undefined && account !== null && account !== '') {
      checkWalletConnection();
    }
    checkChainId();
  }, [account]);

  useEffect(() => {
    getProvider();
    handleEvents();
  }, []);

  return (
    <MetaCardContext.Provider value={context}>
      {children}
    </MetaCardContext.Provider>
  );
};
