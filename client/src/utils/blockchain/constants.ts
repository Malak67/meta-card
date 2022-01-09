import abi from './MetaCard.json';

export const contractABI = abi.abi;
export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
export const CURRENT_ACCOUNT = 'CURRENT_ACCOUNT';