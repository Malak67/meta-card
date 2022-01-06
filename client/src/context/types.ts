import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export interface IMetaCardContext {
  isConnectedToRightNetwork: boolean;
  provider: any;
  account?: string;
  web3?: Web3Provider;
  getEthereumContract?: () => ethers.Contract;
  getAccount?: () => Promise<string>;
  connectWallet?: () => Promise<void>;
  // new
  businessCard: IBusinessCard;
  createBusinessCard: (card: IBusinessCard) => Promise<void>;
  updateBusinessCard: (card: IBusinessCard) => Promise<void>;
  isLoading: boolean;
}

export type MetamaskAdapterValues = {
  getAccount: () => Promise<string>;
  setAccount: (account: string) => void;
  resetState: () => void;
  getProvider: () => any;
  checkWalletConnection: () => Promise<void>;
  connectWallet: () => Promise<void>;
  checkChainId: () => Promise<void>;
  isConnectedToRightNetwork: boolean;
  account?: string;
  provider?: any;
};

export type TSetAccount = (account: string) => void;
export type TGetAccount = () => string | null;
export type TRemoveAccount = () => void;

export interface IBusinessCard {
  id?: string;
  owner: string;
  fullName: string;
  title: string;
  email: string;
  phoneNumber: string;
}

export type BusinessCardData = Pick<
  IBusinessCard,
  "fullName" | "email" | "title" | "phoneNumber"
>;

export interface ISocialLink {
  id: number;
  name: string;
  link: string;
}
