import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { contractABI, contractAddress } from "../../utils/blockchain/constants";

export const getEthereumContract = (library: Web3Provider) => {
  const metacardContract = new Contract(contractAddress, contractABI, library);
  return metacardContract;
};
